import FacebookLogin, {
    ReactFacebookFailureResponse, ReactFacebookLoginInfo
} from 'react-facebook-login';
import { trackPromise } from 'react-promise-tracker';
import styled from 'styled-components';

import { Icon } from '@components/icon';
import { loginUser } from '@store/reducers/user.slice';
import { Z_INDEX } from '@styles/z-indexes';

import { useAppDispatch } from '@services/hooks/redux';
import { storageService } from '@services/storage/storage';
import { facebookAuth } from '@services/user.service';

import { errorMessage } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

import { StyledIcon } from '@components/social-auth/social-auth.styles';

interface IFacebookErrorResponce extends Partial<ReactFacebookLoginInfo> {
  error: {
    code: string;
  };
}

const StyledIconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FacebookButton = () => {
  const appId = process.env.REACT_APP_FACEBOOK_AUTH_APP_ID;
  const dispatch = useAppDispatch();

  const responseFacebook = async (
    userInfo:
      | ReactFacebookLoginInfo
      | ReactFacebookFailureResponse
      | IFacebookErrorResponce
  ) => {
    if (
      (userInfo as IFacebookErrorResponce)?.error ||
      (userInfo as ReactFacebookFailureResponse).status === 'unknown'
    ) {
      return errorMessage('Try again, or sign in another way').fire();
    }
    const { email, name, picture, accessToken } =
      userInfo as ReactFacebookLoginInfo;
    const firstName: string = name?.split(' ')[0] || '';
    const lastName: string = name?.split(' ')[1] || '';

    if (!email) {
      return errorMessage(
        'No email was found in your facebook account, link your email address to facebook or sign in another way'
      ).fire();
    }

    const { data } = await trackPromise(
      facebookAuth({
        email,
        firstName,
        lastName,
        token: accessToken,
        avatar: picture?.data?.url || '',
      }),
      PROMISES_AREA.auth
    );

    dispatch(loginUser(data.user));
    return storageService.setToken(data.token, false);
  };
  return (
    <StyledIcon>
      <FacebookLogin
        appId={appId || ''}
        fields="name,email,picture"
        scope="public_profile, email"
        callback={responseFacebook}
        textButton=""
        buttonStyle={{
          position: 'relative',
          backgroundColor: 'transparent',
          border: 0,
          width: 33,
          height: 33,
          padding: 0,
          zIndex: Z_INDEX.medium,
        }}
        redirectUri={window.location.href}
      />
      <StyledIconWrapper>
        <Icon type="facebook" />
      </StyledIconWrapper>
    </StyledIcon>
  );
};
