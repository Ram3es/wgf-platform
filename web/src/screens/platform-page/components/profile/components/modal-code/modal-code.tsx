import { Formik } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';

import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { ModalStyles as Styled } from './modal-code.styles';

interface IModalCodeProps {
  handleModalClose: () => void;
  handleSubmit: () => void;
  sendEmailWithCode: (email: string) => void;
  emailToChange: string;
  setShowEmailCodeModal: (showEmailCodeModal: boolean) => void;
  code: string;
  setCode: (code: string) => void;
}

export const ModalCode: FC<IModalCodeProps> = ({
  handleModalClose,
  handleSubmit,
  sendEmailWithCode,
  emailToChange,
  setShowEmailCodeModal,
  code,
  setCode,
}) => {
  const [seconds, setSeconds] = useState<number>(300);
  const codeModalRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  const onBackdropClick = (event: MouseEvent): void => {
    if (!codeModalRef.current?.contains(event.target as HTMLDivElement)) {
      setShowEmailCodeModal(false);
    }
  };

  useEffect(() => {
    if (seconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSecs) => {
          if (prevSecs === 0) {
            return 0;
          } else return prevSecs - 1;
        });
      }, 1000);
    }
    return () => window.clearInterval(intervalRef.current || 0);
  }, [seconds]);
  useEffect(() => {
    setSeconds(300);
  }, []);

  const resendEmailCode = () => {
    setSeconds(300);
    sendEmailWithCode(emailToChange);
  };

  return (
    <>
      {seconds > 0 ? (
        <Styled.Modal ref={codeModalRef}>
          <div onClick={handleModalClose}>
            <Icon type="imagesPicker" />
          </div>
          <Styled.ModalText>
            Please enter the code you received at new email address {''}
            <b>{emailToChange}</b>
          </Styled.ModalText>
          <div>
            <Styled.Timer>
              Code expires in {Math.trunc(seconds / 60)}:
              {seconds - Math.trunc(seconds / 60) * 60 < 10
                ? `0${seconds - Math.trunc(seconds / 60) * 60}`
                : seconds - Math.trunc(seconds / 60) * 60}
            </Styled.Timer>
          </div>
          <Formik
            initialValues={{ initialCode: code }}
            validateOnChange
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isValid,
              handleSubmit,
            }) => {
              const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event);
                setCode(event.target.value);
              };
              return (
                <>
                  <TextField
                    type="text"
                    name="code"
                    value={code}
                    isFullWidth
                    withBorder
                    height="38px"
                    onChange={onChange}
                    onBlur={handleBlur}
                    error={
                      touched.initialCode && errors.initialCode
                        ? errors.initialCode
                        : ''
                    }
                  />
                  <Styled.FormControl>
                    <Button
                      isDisabled={!isValid}
                      onClick={handleSubmit}
                      title="Confirm"
                      color={COLORS.lightBlue}
                      type="submit"
                    />
                  </Styled.FormControl>
                </>
              );
            }}
          </Formik>
        </Styled.Modal>
      ) : (
        <Styled.ButtonWrapper>
          <div onClick={handleModalClose}>
            <Icon type="imagesPicker" />
          </div>
          <Button
            isDisabled={!!seconds}
            onClick={resendEmailCode}
            title="Send new code"
            color={COLORS.lightBlue}
            type="submit"
          />
        </Styled.ButtonWrapper>
      )}
    </>
  );
};
