import parse from 'html-react-parser';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { RadioButtonGroup } from '@components/radio-button-group';
import { updateUserJobStatus, updateUserSubscribing } from '@store/reducers/user.slice';
import { AppDispatch } from '@store/store';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { updateUser } from '@services/user.service';

import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { IPopUpProps, IUserRadioList } from './pop-up.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { PopUpStyles as Styled } from './pop-up.styles';

export const PopUp: React.FC<IPopUpProps> = ({ user, setState }) => {
  const history = useHistory();

  const dispatch = useDispatch<AppDispatch>();

  const checkboxHandler = () => {
    dispatch(updateUserSubscribing({ isSubscriber: !user.isSubscriber }));
  };

  const onClick = async () => {
    updateUser({
      id: user.id,
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
    dispatch(updateUserJobStatus({ jobStatus: value }));
  };

  return (
    <Container>
      <Styled.BackDrop onClick={closeModal} />
      <Styled.Wrapper>
        <p>{STRINGS.popUp.radioWrapperLabel}</p>
        <Styled.RadioGroupWrapper>
          <RadioButtonGroup
            initValue={user.jobStatus || 'Student'}
            isImage
            onChange={handleChangeJobStatus}
            radioGroup={userRadioGroup}
            radioWidth="24px"
            radioHeight="24px"
          />
        </Styled.RadioGroupWrapper>
        <Styled.Title>
          <TitleStyles.h2 color={COLORS.greenLite} textAlign="left">
            {STRINGS.popUp.title}
          </TitleStyles.h2>
        </Styled.Title>
        <Checkbox
          isChecked={user.isSubscriber}
          onChange={checkboxHandler}
          label={STRINGS.popUp.checkbox}
        />
        <Styled.Text>{parse(STRINGS.popUp.text)}</Styled.Text>
        <Styled.ButtonWrapper>
          <Button
            title={STRINGS.button.result}
            onClick={onClick}
            color={COLORS.greenLite}
            image="next"
          />
        </Styled.ButtonWrapper>
      </Styled.Wrapper>
    </Container>
  );
};
