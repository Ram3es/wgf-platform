import { FC } from 'react';

import {
  CommonStylesAuthPages as CommonStyled,
  LogoHeader,
} from '@styles/components/login-pages';

import { SignInForm } from './form';

export const SignInPage: FC = () => {
  return (
    <CommonStyled.Section>
      <LogoHeader />
      <CommonStyled.WrapContent>
        <SignInForm />
      </CommonStyled.WrapContent>
    </CommonStyled.Section>
  );
};
