import { FacebookButton } from './components/facebook-button';
import { GoogleButton } from './components/google-button';

import { StyledSocialAuth as Styled } from './social-auth.styles';

export const SocialAuth = () => {
  return (
    <Styled.Wrapper>
      <Styled.Title>
        <span>or sign in with</span>
      </Styled.Title>
      <Styled.WrapperButtons>
        <GoogleButton />
        <FacebookButton />
      </Styled.WrapperButtons>
    </Styled.Wrapper>
  );
};
