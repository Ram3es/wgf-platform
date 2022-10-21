import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { CommonStylesAuthPages } from './common.styles';

export const LogoHeader = () => {
  const logoHandler = () => {
    window.location.replace('https://witgritfit.com/');
  };
  return (
    <CommonStylesAuthPages.Logo>
      <img
        src={IMAGES.companyLogo}
        alt={STRINGS.altLogo}
        onClick={logoHandler}
      />
    </CommonStylesAuthPages.Logo>
  );
};
