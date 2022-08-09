import { Media } from '@styles/media';
import styled from 'styled-components';

export const ManageTrainersStyles = {
  HeaderSectionWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Wrapper: styled.div`
    position: relative;
    width: 100%;
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(200vh - 95px);
    margin-left: 10px;

    ${Media.desktop1600`
padding: 70px 0;
`}

    ${Media.landscape`
padding: 20px 0;
`}

${Media.tablet`
width: 100%;
min-height: calc(100vh - 135px);
border-top-left-radius: 0;
margin-left: 0px;
`}
${Media.sMobile`
margin-left: 0px;
`}
  `,
};
