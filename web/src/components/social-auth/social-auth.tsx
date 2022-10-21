import { FacebookButton } from './components/facebook-button';
import { GoogleButton } from './components/google-button';

import { StyledSocialAuth as Styled } from './social-auth.styles';

export const SocialAuth = () => {
  return (
    <Styled.Wrapper>
      <Styled.WrapperButtons>
        <FacebookButton />
        <GoogleButton />
      </Styled.WrapperButtons>
      <Styled.Title>
        <span>or</span>
      </Styled.Title>
    </Styled.Wrapper>
  );
};
