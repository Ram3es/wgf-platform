import { CommonStylesForPages as CommonStyled } from '@screens/platform-page/platform-page.styles';
import { ManageGroupStyles as Styled } from './manage-group.styles';
import { Backdrop } from '@components/backdrop';
import { BreadCrumb } from '@components/bread-crumb';
import { TitleStyles } from '@styles/components/title-styles';
import { COLORS } from '@styles/colors';
import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { useManageGroupState } from './manage-group.state';

export const ManageGroup = () => {
  const { groups, events, refGroups, handleScrollBtn, isShowScrollBtn } =
    useManageGroupState();

  return (
    <CommonStyled.Wrapper>
      <Backdrop />
      <CommonStyled.Content>
        <BreadCrumb />
        <CommonStyled.InnerWrapper>
          <TitleStyles.h2 textAlign="left" color={COLORS.grey} mb={5}>
            Group Users
          </TitleStyles.h2>
          <Styled.HeaderDescription>
            Disconect group by changing the name at the user`s Group Name menu.
          </Styled.HeaderDescription>
        </CommonStyled.InnerWrapper>
        <Styled.ButtonWrap>
          <Button
            title={`Create New Group`}
            color={COLORS.lightBlue}
            iconType="plus"
          />
        </Styled.ButtonWrap>
        <Styled.ContainerButton>
          <Styled.IconWrap>
            <Icon type="manageUsersSmall" />
          </Styled.IconWrap>
          <Styled.GroupButtonWrap {...events} ref={refGroups}>
            {groups?.map(({ name }) => {
              return <Styled.GroupButton key={name}>{name}</Styled.GroupButton>;
            })}
          </Styled.GroupButtonWrap>
          <Styled.ArrowWrap isHide={isShowScrollBtn} onClick={handleScrollBtn}>
            <Icon type="triangleBracketRight" />
          </Styled.ArrowWrap>
        </Styled.ContainerButton>
      </CommonStyled.Content>
    </CommonStyled.Wrapper>
  );
};
