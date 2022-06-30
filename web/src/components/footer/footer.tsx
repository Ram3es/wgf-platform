import { Icon } from '@components/icon';
import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { NavLinks } from './footer.constants';
import { FooterStyles as Styled } from './footer.styles';

export const Footer = () => {
  return (
    <Styled.Container>
      <Styled.WrapImages>
        <Styled.Logo>
          <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
        </Styled.Logo>
        <Styled.Social>
          <a href={NavLinks.facebook} target="_blank" rel="noreferrer">
            <Icon type="facebookFooter" />
          </a>
          <a href={NavLinks.linkedin} target="_blank" rel="noreferrer">
            <Icon type="linkedinFooter" />
          </a>
          <a href={NavLinks.mail} target="_blank" rel="noreferrer">
            <Styled.MailIconWrapper>
              <img src={IMAGES.emailFooter} />
            </Styled.MailIconWrapper>
          </a>
        </Styled.Social>
      </Styled.WrapImages>
      <Styled.WrapText>
        <Styled.TextTitle>2021 © Avid Adventures Pte Ltd</Styled.TextTitle>
        {NavLinks.text.map((link: Record<string, string | undefined>, idx) => {
          const title = Object.keys(link).join('');
          return (
            <Styled.LinkTextWrap key={idx}>
              <Styled.LinkText
                href={link[title]}
                target="_blank"
                rel="noreferrer"
              >
                {title}
              </Styled.LinkText>
            </Styled.LinkTextWrap>
          );
        })}
      </Styled.WrapText>
    </Styled.Container>
  );
};
