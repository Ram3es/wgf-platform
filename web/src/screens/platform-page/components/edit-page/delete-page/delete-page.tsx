import { Backdrop } from '@components/backdrop';
import { BreadCrumb } from '@components/bread-crumb';
import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { IMAGES } from '@constants/images';
import { CommonStylesForPages } from '@screens/platform-page/platform-page.styles';
import { COLORS } from '@styles/colors';
import { FC } from 'react';
import { EditPageStyles } from '../edit-page.styles';
import { useDeletePages } from './delete-page.state';
import { DeletePageStyles as Styled } from './delete-page.styles';

export interface IUserIdProps {
  userId: string;
}
export const DeletePage: FC = () => {
  const {
    isActive,
    handleClick,
    userState,
    breadCrumbTitle,
    handleDelete,
    handleCancel,
  } = useDeletePages();

  return (
    <EditPageStyles.Wrapper>
      <Backdrop />
      <CommonStylesForPages.Content>
        {userState && (
          <>
            <BreadCrumb props={breadCrumbTitle} />
            <Styled.TabsContainer>
              <Styled.Tabs
                onClick={() => {
                  handleClick('archive');
                }}
                isActive={isActive.archive}
              >
                Archive Account
              </Styled.Tabs>
              <Styled.Tabs
                onClick={() => {
                  handleClick('delete');
                }}
                isActive={isActive.delete}
              >
                Delete Account
              </Styled.Tabs>
            </Styled.TabsContainer>
            <Styled.InfoField>
              {isActive.archive && <Styled.Mock>SOON</Styled.Mock>}
              {isActive.delete && (
                <>
                  <Styled.WrapText>
                    <Styled.TextBold>
                      By deleting this user, the user will no longer be
                      available in your list of users.
                    </Styled.TextBold>
                    <Styled.Text>
                      The database is retrievable upon request from the super
                      admin.
                    </Styled.Text>
                  </Styled.WrapText>
                  <Styled.CardContainer>
                    <Styled.Card>
                      <Styled.IconWrap>
                        <Icon type="deleteAccount" />
                      </Styled.IconWrap>
                      <Styled.UserInfoContainer>
                        <Styled.AvatarWrapper>
                          <img src={userState?.avatar || IMAGES.userProfile} />
                        </Styled.AvatarWrapper>
                        <Styled.UserDataWrap>
                          <Styled.TextBold
                            medium
                          >{`${userState?.firstName} ${userState?.lastName}`}</Styled.TextBold>
                          <Styled.Text medium>{userState?.email}</Styled.Text>
                        </Styled.UserDataWrap>
                      </Styled.UserInfoContainer>
                    </Styled.Card>
                    <Styled.ButtonWrapper>
                      <Button
                        onClick={handleDelete}
                        title="Delete"
                        color={COLORS.lightBlue}
                      />
                      <Button
                        onClick={handleCancel}
                        title="Cancel"
                        variant="cancel"
                      />
                    </Styled.ButtonWrapper>
                  </Styled.CardContainer>
                </>
              )}
            </Styled.InfoField>
          </>
        )}
      </CommonStylesForPages.Content>
    </EditPageStyles.Wrapper>
  );
};
