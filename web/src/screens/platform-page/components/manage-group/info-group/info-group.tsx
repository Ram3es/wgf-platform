import React, { useState } from 'react';

import { DATE_TIME_OPTIONS } from '@constants/date';
import { PROMISES_AREA } from '@constants/promises-area';

import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';

import { ModalSelect } from '../../edit-page/modal-select';
import { IRenameGroup } from '../manage-group';
import { InfoGroupStyles as Styled } from './info-group.styles';

interface IInfoGroupProps extends IGroup {
  isEditMode?: boolean;
  toggleMode: () => void;
  submitHandler: (params: IRenameGroup) => void;
  handleModalDelete: () => void;
}

export const InfoGroup = (props: IInfoGroupProps) => {
  const {
    id,
    name,
    created,
    users,
    isEditMode,
    toggleMode,
    submitHandler,
    handleModalDelete,
  } = props;
  const [inputValue, setInputValue] = useState(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const date = new Date(created).toLocaleString('en-US', DATE_TIME_OPTIONS);
  return (
    <Loader area={PROMISES_AREA.renameGroup}>
      <Styled.Wrapper>
        <Styled.InfoContainer>
          <Styled.Content>
            <Styled.Field>
              <Styled.Flex>
                <Styled.Rectangle>
                  Group Name: <Styled.Arrow />
                </Styled.Rectangle>
                {isEditMode ? (
                  <>
                    <Styled.InputWrapper>
                      <TextField
                        type="text"
                        value={inputValue}
                        name={name}
                        onChange={handleChange}
                        height="35px"
                        withBorder
                        maxLength={30}
                      />
                      <Styled.ServisBtn>
                        <Icon
                          type="tick"
                          onClick={() => {
                            toggleMode();
                            submitHandler({ name: inputValue, groupId: id });
                          }}
                        />
                        <Icon type="close" onClick={toggleMode} />
                      </Styled.ServisBtn>
                    </Styled.InputWrapper>
                  </>
                ) : (
                  <Styled.GroupName>{name}</Styled.GroupName>
                )}

                <Styled.Space>
                  {!isEditMode && name !== 'Unassigned' && (
                    <Styled.ControlWrapper>
                      <Icon type="edit" onClick={toggleMode} />
                    </Styled.ControlWrapper>
                  )}
                </Styled.Space>
              </Styled.Flex>
            </Styled.Field>
            <Styled.Field>
              <Styled.Flex>
                <Styled.Rectangle>
                  Created: <Styled.Arrow />
                </Styled.Rectangle>
                <Styled.GroupName>{date}</Styled.GroupName>
              </Styled.Flex>
            </Styled.Field>
            <Styled.Field>
              <Styled.Flex>
                <Styled.Rectangle>
                  No. of Users: <Styled.Arrow />
                </Styled.Rectangle>
                <Styled.GroupName>{users?.length}</Styled.GroupName>
              </Styled.Flex>
            </Styled.Field>
          </Styled.Content>
          {name !== 'Unassigned' && (
            <Styled.DotsWrapper>
              <ModalSelect
                selectOption={[
                  {
                    'Delete Group': handleModalDelete,
                  },
                ]}
              >
                <Styled.Dots>
                  <Icon type="options" />
                </Styled.Dots>
              </ModalSelect>
            </Styled.DotsWrapper>
          )}
        </Styled.InfoContainer>
      </Styled.Wrapper>
    </Loader>
  );
};
