import { FC } from 'react';

import { SignUpForm } from '@screens/home-page/components/form';

import {
  CommonStylesAuthPages as CommonStyled,
  LogoHeader,
} from '@styles/components/login-pages';

export const SignUpPage: FC = () => {
  return (
    <>
      <CommonStyled.Section>
        <LogoHeader />
        <CommonStyled.WrapContent>
          <SignUpForm />
        </CommonStyled.WrapContent>
      </CommonStyled.Section>
    </>
  );
};
