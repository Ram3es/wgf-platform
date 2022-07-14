import { FC } from 'react';
import { EditPageStyles as Styled } from './edit-page.styles';
import { Backdrop } from '@components/backdrop';
import { IMAGES } from '@constants/images';
import { CommonStylesForPages } from '@screens/platform-page/platform-page.styles';
import { Icon } from '@components/icon';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';
import { ModalSelect } from '@screens/platform-page/components/edit-page/modal-select';
import { EditTableInfo } from './edit-table-info/edit-table-info';
import { GameInfo } from './game-info';
import { BreadCrumb } from '@components/bread-crumb';
import { UserProgresGames } from './user-progres-games';
import { useEditUserState } from './edit-page.state';
import { useServiceEditInfo } from './edit-page.service';
import { ISelectionOption } from './edit-page.types';

export const EditUser: FC = () => {
  const { userState, breadCrumbTitle, pathname } = useEditUserState();
  const selectOption: ISelectionOption = useServiceEditInfo();

  return (
    <Styled.Wrapper>
      <Backdrop />
      <CommonStylesForPages.Content>
        <BreadCrumb props={breadCrumbTitle} />
        {userState && (
          <CommonStylesForPages.InnerWrapper>
            <Styled.HeaderWrapper>
              <Styled.Flex>
                <Styled.AvatarWrapper>
                  <img src={userState.avatar || IMAGES.userProfile} />
                </Styled.AvatarWrapper>
                <TitleStyles.h2 color={COLORS.grey}>
                  {userState.lastName}
                </TitleStyles.h2>
              </Styled.Flex>
              <ModalSelect selectOption={selectOption[userState.role]}>
                <Styled.IconWrapper>
                  <Icon type="options" />
                </Styled.IconWrapper>
              </ModalSelect>
            </Styled.HeaderWrapper>
            <EditTableInfo user={userState} />
            {pathname.includes('manage-trainers') && <GameInfo />}
            {pathname.includes('manage-user') && (
              <UserProgresGames user={userState} />
            )}
          </CommonStylesForPages.InnerWrapper>
        )}
      </CommonStylesForPages.Content>
    </Styled.Wrapper>
  );
};
