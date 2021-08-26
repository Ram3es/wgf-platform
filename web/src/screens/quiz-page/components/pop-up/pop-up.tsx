import parse from 'html-react-parser';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { RadioButtonGroup } from '@components/radio-button-group';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { updateUser } from '@services/user.service';

import { ROUTES } from '@constants/routes';
import { SESSION_STORAGE } from '@constants/storage';
import { STRINGS } from '@constants/strings';

import { IPopUpProps, IUserRadioList } from './pop-up.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { PopUpStyles } from './pop-up.styles';

export const PopUp: React.FC<IPopUpProps> = ({ user, setState }) => {
  const history = useHistory();

  const checboxHandler = () => {
    setState({
      user: { ...user, isSubscriber: !user.isSubscriber },
    });
  };

  const onClick = () => {
    updateUser(sessionStorage.getItem(SESSION_STORAGE.userId)!, {
      role: user.role || 'Student',
      isSubscriber: user.isSubscriber,
    });
    setState({ isShowModal: false });
    history.push(ROUTES.results);
  };

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

  const handleChangeRole = (value: string) => {
    setState({
      user: { ...user, role: value },
    });
  };

  return (
    <Container>
      <PopUpStyles.BackDrop />
      <PopUpStyles.Wrapper>
        <p>{STRINGS.popUp.radioWrapperLabel}</p>
        <PopUpStyles.RadioGroupWrapper>
          <RadioButtonGroup
            initValue="Student"
            isImage
            onChange={handleChangeRole}
            radioGroup={userRadioGroup}
            radioWidth="24px"
            radioHeight="24px"
          />
        </PopUpStyles.RadioGroupWrapper>
        <PopUpStyles.Title>
          <TitleStyles.h2
            paddingY="15px"
            color={COLORS.greenLite}
            textAlign="left"
          >
            {STRINGS.popUp.title}
          </TitleStyles.h2>
        </PopUpStyles.Title>
        <Checkbox
          isChecked={user.isSubscriber}
          onChange={checboxHandler}
          label={STRINGS.popUp.checkbox}
        />
        <PopUpStyles.Text>{parse(STRINGS.popUp.text)}</PopUpStyles.Text>
        <PopUpStyles.ButtonWrapper>
          <Button
            title={STRINGS.button.result}
            onClick={onClick}
            color={COLORS.grey}
            image="next"
          />
        </PopUpStyles.ButtonWrapper>
      </PopUpStyles.Wrapper>
    </Container>
  );
};
