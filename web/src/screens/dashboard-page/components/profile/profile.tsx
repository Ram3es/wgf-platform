import React, { useMemo } from 'react';
import countryList from 'react-select-country-list';

import { Icon } from '@components/icon';
import { ImagePicker } from '@components/image-picker';
import { COLORS } from '@styles/colors';
import { AccountForm } from './components/account-form';
import { ProfileForm } from './components/profile-form';

import { useProfileState } from './profile.state';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { ProfileStyles as Styled } from './profile.styles';

export const Profile: React.FC = () => {
  const {
    user,
    profileData,
    handleImageChange,
    profileChange,
    sendAvatar,
    isPhotoPicked,
    isProfileEdit,
    editProfileClick,
    cancelEditProfile,
    handleSubmitProfileForm,
    initialProfileData,
    cancelEditAccount,
    isAccountEdit,
    accountChange,
    accountData,
    handleSubmitAccountForm,
    editAccountClick,
    updateSelectedCountry,
  } = useProfileState();

  const countryOptions = useMemo(() => countryList().getLabels(), []);

  return (
    <Styled.Wrapper>
      <Styled.ContentWrapper>
        <Styled.AvatarColumn>
          <Styled.NameTitle>
            <TitleStyles.h2 textAlign="center" color={COLORS.grey}>
              {user?.firstName} {user?.lastName}
            </TitleStyles.h2>
          </Styled.NameTitle>
          <Styled.AvatarWrapper>
            <ImagePicker setValue={handleImageChange} />
            <Styled.Avatar>
              <img src={user?.avatar || IMAGES.userProfile} />
            </Styled.Avatar>
            <Styled.SubmitAvatar
              onClick={isPhotoPicked ? sendAvatar : undefined}
              isDisabled={!isPhotoPicked}
            >
              <Icon type="submitPhoto" />
            </Styled.SubmitAvatar>
          </Styled.AvatarWrapper>
        </Styled.AvatarColumn>
        <Styled.ProfileColumn>
          <Styled.SectionProfile>
            <Styled.ProfileTitle>
              <TitleStyles.h3 textAlign="left">
                {STRINGS.profile.profileTitle}
              </TitleStyles.h3>
              <Styled.EditButton onClick={editProfileClick}>
                {!isProfileEdit && <Icon type="edit" />}
              </Styled.EditButton>
            </Styled.ProfileTitle>
            <Styled.Line />
            <ProfileForm
              cancelEditProfile={cancelEditProfile}
              isProfileEdit={isProfileEdit}
              profileChange={profileChange}
              profileData={profileData!}
              initialProfileData={initialProfileData!}
              profileFormSubmit={handleSubmitProfileForm}
              selectedCountry={profileData?.country || 'Choise Country'}
              setSelectedCountry={updateSelectedCountry}
              countryList={countryOptions}
            />
          </Styled.SectionProfile>
          <Styled.ProfileTitle>
            <TitleStyles.h3 textAlign="left">
              {STRINGS.profile.accountTitle}
            </TitleStyles.h3>
            <Styled.EditButton onClick={editAccountClick}>
              {!isAccountEdit && <Icon type="edit" />}
            </Styled.EditButton>
          </Styled.ProfileTitle>
          <Styled.Line />
          {isAccountEdit && (
            <AccountForm
              cancelEditAccount={cancelEditAccount}
              accountChange={accountChange}
              accountData={accountData!}
              accountFormSubmit={handleSubmitAccountForm}
            />
          )}
        </Styled.ProfileColumn>
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  );
};
