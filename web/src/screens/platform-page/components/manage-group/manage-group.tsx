import { FC } from 'react';
import { PROMISES_AREA } from '@constants/promises-area';

import { Icon } from '@components/icon';
import { Modal } from '@components/modal';
import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { Backdrop } from '@components/backdrop';
import { BreadCrumb } from '@components/bread-crumb';

import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

import { CommonStylesForPages as CommonStyled } from '@screens/platform-page/platform-page.styles';

import { useManageGroupState } from './manage-group.state';
import { ManageGroupStyles as Styled } from './manage-group.styles';
import { InfoGroup } from './info-group';
import { ModalCreate } from './modal-create';
import { ModalDelete } from './modal-delete';

export interface IRenameGroup {
  name: string;
  groupId: string;
}

export const ManageGroup: FC = () => {
  const {
    groups,
    events,
    refGroups,
    handleScrollBtn,
    handleScrollBtnBack,
    isShowScrollBtn,
    handleModalCreate,
    isShowModalCreate,
    createTrainerGroup,
    handleButtonActive,
    isEditMode,
    toggleEditMode,
    renameGroup,
    isShowModalDelete,
    handleModalDelete,
    deleteTrainerGroup,
  } = useManageGroupState();

  const submitHandler = (params: IRenameGroup) => renameGroup(params);
  const handleDelete = () => {
    const groupId = groups?.filter((group) => group.isActive === true)[0]?.id;
    deleteTrainerGroup({ groupId });
  };

  return (
    <>
      {isShowModalCreate && (
        <Modal onClose={handleModalCreate} withBackdrop width={420}>
          <ModalCreate createTrainerGroup={createTrainerGroup} />
        </Modal>
      )}
      {isShowModalDelete && (
        <Modal onClose={handleModalDelete} withBackdrop width={420}>
          <ModalDelete
            deleteTrainerGroup={handleModalDelete}
            handleDelete={handleDelete}
          />
        </Modal>
      )}
      <CommonStyled.Wrapper>
        <Backdrop />
        <CommonStyled.Content>
          <BreadCrumb />
          <CommonStyled.InnerWrapper>
            <TitleStyles.h2 textAlign="left" color={COLORS.grey} mb={5}>
              Group Users
            </TitleStyles.h2>
            <Styled.HeaderDescription>
              Disconect group by changing the name at the user`s Group Name
              menu.
            </Styled.HeaderDescription>
          </CommonStyled.InnerWrapper>
          <Styled.ButtonWrap>
            <Button
              title={`Create New Group`}
              color={COLORS.lightBlue}
              iconType="plus"
              onClick={handleModalCreate}
            />
          </Styled.ButtonWrap>
          <Loader area={PROMISES_AREA.createGroup}>
            <Styled.ContainerButton>
              <Styled.IconWrap>
                <Icon type="manageUsersSmall" />
              </Styled.IconWrap>
              <Styled.ArrowWrap
                isHide={isShowScrollBtn}
                onClick={handleScrollBtnBack}
                left
              >
                <Icon type="triangleBracketRight" />
              </Styled.ArrowWrap>
              <Styled.GroupButtonWrap {...events} ref={refGroups}>
                {groups?.map(({ name, isActive, id }) => {
                  return (
                    <Styled.GroupButton
                      onClick={() => handleButtonActive(id)}
                      key={name}
                      isActive={isActive as boolean}
                    >
                      {name.length > 12 ? name.substring(0, 12) + '...' : name}
                    </Styled.GroupButton>
                  );
                })}
              </Styled.GroupButtonWrap>
              <Styled.ArrowWrap
                isHide={isShowScrollBtn}
                onClick={handleScrollBtn}
              >
                <Icon type="triangleBracketRight" />
              </Styled.ArrowWrap>
            </Styled.ContainerButton>
            {groups?.map((group) => {
              return (
                group.isActive && (
                  <InfoGroup
                    key={group.id}
                    {...group}
                    isEditMode={isEditMode}
                    toggleMode={toggleEditMode}
                    submitHandler={submitHandler}
                    handleModalDelete={handleModalDelete}
                  />
                )
              );
            })}
          </Loader>
        </CommonStyled.Content>
      </CommonStyled.Wrapper>
    </>
  );
};
