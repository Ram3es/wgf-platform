import parse from 'html-react-parser';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { RadioButtonGroup } from '@components/radio-button-group';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { getResults } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';
import { updateUser } from '@services/user.service';

import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { IPopUpProps, IUserRadioList } from './pop-up.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { PopUpStyles } from './pop-up.styles';

export const PopUp: React.FC<IPopUpProps> = ({ user, setState }) => {
  const history = useHistory();

  const checkboxHandler = () => {
    setState({
      user: { ...user, isSubscriber: !user.isSubscriber },
    });
  };

  const onClick = async () => {
    const { data } = await getResults({
      quizId: storageService.getQuiz()!.id,
      userId: user.id,
    });

    storageService.setResults(data, storageService.getQuiz()?.title || '');

    updateUser({
      id: storageService.getUser()?.id || '',
      jobStatus: user.jobStatus || 'Student',
      isSubscriber: user.isSubscriber,
    });
    setState({ isShowModal: false });
    history.push(ROUTES.results);
  };

  const closeModal = () => setState({ isShowModal: false });

  const userRadioGroup: IUserRadioList[] = [
    {
      label: 'Student',
      value: 'Student',
    },
    {
      label: 'Working Professional',
      value: 'Working Professional',
    },
  ];

  const handleChangeJobStatus = (value: string) => {
    setState({
      user: { ...user, jobStatus: value },
    });
  };

  return (
    <Container>
      <PopUpStyles.BackDrop onClick={closeModal} />
      <PopUpStyles.Wrapper>
        <p>{STRINGS.popUp.radioWrapperLabel}</p>
        <PopUpStyles.RadioGroupWrapper>
          <RadioButtonGroup
            initValue="Student"
            isImage
            onChange={handleChangeJobStatus}
            radioGroup={userRadioGroup}
            radioWidth="24px"
            radioHeight="24px"
          />
        </PopUpStyles.RadioGroupWrapper>
        <PopUpStyles.Title>
          <TitleStyles.h2 color={COLORS.greenLite} textAlign="left">
            {STRINGS.popUp.title}
          </TitleStyles.h2>
        </PopUpStyles.Title>
        <Checkbox
          isChecked={user.isSubscriber}
          onChange={checkboxHandler}
          label={STRINGS.popUp.checkbox}
        />
        <PopUpStyles.Text>{parse(STRINGS.popUp.text)}</PopUpStyles.Text>
        <PopUpStyles.ButtonWrapper>
          <Button
            title={STRINGS.button.result}
            onClick={onClick}
            color={COLORS.greenLite}
            image="next"
          />
        </PopUpStyles.ButtonWrapper>
      </PopUpStyles.Wrapper>
    </Container>
  );
};
