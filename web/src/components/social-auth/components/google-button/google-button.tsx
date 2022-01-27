import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { trackPromise } from 'react-promise-tracker';

import { Icon } from '@components/icon';
import { loginUser } from '@store/reducers/user.slice';

import { useAppDispatch } from '@services/hooks/redux';
import { storageService } from '@services/storage/storage';
import { googleAuth } from '@services/user.service';

import { errorMessage } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

import { StyledIcon } from '@components/social-auth/social-auth.styles';

export const GoogleButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useAppDispatch();

  const handleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const accessToken = (response as GoogleLoginResponse)?.accessToken;

    if (!accessToken) {
      return errorMessage('Try again, or sign in another way').fire();
    }

    const { data } = await trackPromise(
      googleAuth({ token: accessToken }),
      PROMISES_AREA.auth
    );
    dispatch(loginUser(data.user));
    return storageService.setToken(data.token, false);
  };

  return (
    <GoogleLogin
      clientId={clientId || ''}
      onSuccess={handleSuccess}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <StyledIcon {...renderProps}>
          <Icon type="google" />
        </StyledIcon>
      )}
    />
  );
};
