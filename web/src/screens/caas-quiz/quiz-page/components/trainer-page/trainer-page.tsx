import React, { FC } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import { Loader } from '@components/loader';
import { Button } from '@components/button';
import { ROUTES } from '@constants/routes';
import { PROMISES_AREA } from '@constants/promises-area';
import {
  downloadMessage,
  errorMessage,
  unAutorizedError,
} from '@constants/pop-up-messages';

import { getCaasCsv } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { COLORS } from '@styles/colors';
import { ContainerPage } from '@styles/components/common-assesment-page';
import { COMMON_ASSESSMENT_PAGE as CommonStyled } from '@styles/components/common-assesment-page/common.styles';
import { getPageParameters } from './trainer-page.const';

export const CareerFlexTrainerPage: FC = () => {
  window.scroll({ top: 0, behavior: 'smooth' });

  const {
    push,
    location: { pathname },
  } = useHistory();

  const { id, title, titleHeader, text, btnTitle } =
    getPageParameters(pathname);

  const downloadCsv = async () => {
    try {
      const { data } = await trackPromise(
        getCaasCsv({
          quizId: id,
        }),
        PROMISES_AREA.getCaasCsv
      );

      downloadMessage(
        `data:application/csv;base64,${data.file}`,
        `${title}.csv`
      ).fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push('/sign-in'));
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const handleBtnGame = () => {
    storageService.setQuiz({ id, title });
    push(ROUTES.careerFlex);
  };

  return (
    <ContainerPage>
      <CommonStyled.Title>{titleHeader}</CommonStyled.Title>
      <CommonStyled.Text>{text}</CommonStyled.Text>
      <CommonStyled.BtnWrapper>
        <Button
          title={btnTitle.csv}
          onClick={downloadCsv}
          color={COLORS.lightBlue}
          iconType="uploadCsv"
          isIconRight
        />

        <Button
          title={btnTitle.game}
          color={COLORS.greenLight}
          onClick={handleBtnGame}
          iconType="next"
          isIconRight
        />
      </CommonStyled.BtnWrapper>
      <Loader area={PROMISES_AREA.getCaasCsv} />
    </ContainerPage>
  );
};
