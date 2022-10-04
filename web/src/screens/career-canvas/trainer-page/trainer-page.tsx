import React, { FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { ROUTES } from '@constants/routes';
import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import {
  downloadMessage,
  errorMessage,
  unAutorizedError,
} from '@constants/pop-up-messages';

import { getCareerCanvasCsv } from '@services/quiz.service';
import { COLORS } from '@styles/colors';
import { ContainerPage } from '@styles/components/common-assesment-page';
import { COMMON_ASSESSMENT_PAGE as CommonStyled } from '@styles/components/common-assesment-page/common.styles';

import { PAGE_CONTENT } from './trainer-page.constants';
import { canvasQuiz } from '../career-canvas.constants';

const ImgWrapper = styled.div`
  text-align: center;
  margin-bottom: 75px;
`;

export const CareerCanvasTrainerPage: FC = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
  const { push } = useHistory();

  const downloadCsv = async () => {
    try {
      const { data } = await trackPromise(
        getCareerCanvasCsv({
          quizId: canvasQuiz.id,
        }),
        PROMISES_AREA.getCareerCanvasCsv
      );

      downloadMessage(
        `data:application/csv;base64,${data.file}`,
        `${canvasQuiz.title}.csv`
      ).fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push(ROUTES.signIn));
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const handleButtonGame = () => {
    push(ROUTES.careerDesignCanvas);
  };
  return (
    <ContainerPage>
      <CommonStyled.Title>{PAGE_CONTENT.titleHeader}</CommonStyled.Title>
      <CommonStyled.Text style={{ marginBottom: '45px' }}>
        {PAGE_CONTENT.text}
      </CommonStyled.Text>
      <ImgWrapper>
        <img src={IMAGES.canvasMedium} />
      </ImgWrapper>
      <CommonStyled.BtnWrapper>
        <Button
          title={PAGE_CONTENT.btnTitle.csv}
          onClick={downloadCsv}
          iconType="uploadCsv"
          color={COLORS.lightBlue}
          isIconRight
        />

        <Button
          title={PAGE_CONTENT.btnTitle.game}
          onClick={handleButtonGame}
          iconType="nextBlack"
          isIconRight
          color={COLORS.yellow}
          textColor={COLORS.black}
        />
      </CommonStyled.BtnWrapper>
      <Loader area={PROMISES_AREA.getCareerCanvasCsv} />
    </ContainerPage>
  );
};
