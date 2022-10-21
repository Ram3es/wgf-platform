import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

import { PROMISES_AREA } from '@constants/promises-area';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';

import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

interface IModalProps {
  createTrainerGroup: (name: string) => void;
}
const initialValue: Record<'groupName', string> = { groupName: '' };
const BtnCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const ModalCreate: FC<IModalProps> = (props) => {
  const { createTrainerGroup } = props;

  const [fieldValue, setFieldValue] = useState(initialValue);

  const fieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue((state) => ({ ...state, groupName: event.target.value }));
  };
  return (
    <>
      <TitleStyles.h2 mb={30} color={COLORS.grey}>
        Create New Group
      </TitleStyles.h2>
      <Formik
        initialValues={fieldValue}
        onSubmit={(values) => {
          createTrainerGroup(values.groupName);
        }}
      >
        {({ handleChange, handleSubmit }) => {
          const onChangeHandler = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            handleChange(event);
            fieldChange(event);
          };
          return (
            <>
              <TextField
                value={fieldValue.groupName}
                type="text"
                name="groupName"
                onChange={onChangeHandler}
                placeholder="Enter group name ..."
                maxLength={30}
              />
              <Loader area={PROMISES_AREA.createGroup}>
                <BtnCenter>
                  <Button
                    type="submit"
                    title="+ Add"
                    onClick={handleSubmit}
                    color={COLORS.lightBlue}
                  />
                </BtnCenter>
              </Loader>
            </>
          );
        }}
      </Formik>
    </>
  );
};
