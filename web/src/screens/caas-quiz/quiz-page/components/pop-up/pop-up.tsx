import parse from 'html-react-parser';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { RadioButtonGroup } from '@components/radio-button-group';
import { updateUserJobStatus, updateUserSubscribing } from '@store/reducers/user.slice';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { useAppDispatch } from '@services/hooks/redux';
import { updateUser } from '@services/user.service';

import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { userRadioGroup } from './pop-up.constants';

import { IPopUpProps } from './pop-up.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { PopUpStyles as Styled } from './pop-up.styles';

export const PopUp: React.FC<IPopUpProps> = (props) => {
  const { user, setState } = props;
  const [jobStatus, setJobStatus] = useState('');
  const history = useHistory();

  const dispatch = useAppDispatch();

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
    dispatch(updateUserJobStatus({ jobStatus }));
    history.push(ROUTES.results);
  };

  const closeModal = () => setState({ isShowModal: false });

  const handleChangeJobStatus = (value: string) => {
    setJobStatus(value);
  };

  return (
    <Container>
      <Styled.BackDrop onClick={closeModal} />
      <Styled.Wrapper>
        {!user.jobStatus && (
          <>
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
          </>
        )}
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
            iconType="next"
            iconLocation="right"
          />
        </Styled.ButtonWrapper>
      </Styled.Wrapper>
    </Container>
  );
};
