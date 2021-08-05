import { Formik } from 'formik';
import React, { useEffect } from 'react';

import { Button } from '@components/button';
import { ProgressBar } from '@components/progress-bar';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';
import { PopUp } from '../pop-up';
import { QuestionList } from '../questionList';

import { useFormState } from './form.state';

import { STRINGS } from '@constants/strings';
import { UserFormSchema } from './form.constants';

import { TitleStyles } from '@styles/components/title-styles';
import { FormStyles } from './form.styles';

export const Form: React.FC = () => {
  const {
    updateState,
    currentPage,
    user,
    onChangeUser,
    questionList,
    onSubmit,
    percent,
    decrementPage,
    questionListForPage,
    errorRef,
    isShowModal,
    isLastPage,
  } = useFormState();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return (
    <div>
      {isShowModal ? (
        <PopUp user={user} setState={updateState} />
      ) : (
        <Formik
          initialValues={user}
          validateOnChange
          onSubmit={onSubmit}
          validationSchema={UserFormSchema}
        >
          {({
            errors,
            touched,
            handleBlur,
            handleChange,
            isValid,
            handleSubmit,
            isSubmitting,
          }) => {
            const handleUserChange = (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              handleChange(e);
              onChangeUser(e);
            };

            useEffect(() => {
              if (!isValid && isSubmitting) {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }
            }, [isValid, isSubmitting]);

            return (
              <>
                {currentPage > 1 ? (
                  <TitleStyles.h2>
                    {STRINGS.form.title} {user.firstName} {user.lastName}
                  </TitleStyles.h2>
                ) : (
                  <FormStyles.Form>
                    <FormStyles.Label>{STRINGS.form.label}</FormStyles.Label>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="firstName"
                        placeholder={'First Name'}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={user.firstName}
                        tabIndex={1}
                        error={
                          touched.firstName && errors.firstName
                            ? errors.firstName
                            : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="lastName"
                        placeholder={'Last Name'}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={user.lastName}
                        tabIndex={2}
                        error={
                          touched.lastName && errors.lastName
                            ? errors.lastName
                            : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="email"
                        placeholder={'Email'}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={user.email.trim()}
                        tabIndex={3}
                        autoCapitalize="none"
                        error={
                          touched.email && errors.email ? errors.email : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                  </FormStyles.Form>
                )}
                <ProgressBar percent={percent} />
                <QuestionList
                  list={questionList}
                  setState={updateState}
                  currentQuestionList={questionListForPage}
                  errorRef={errorRef}
                />
                <FormStyles.ControlPanel>
                  {currentPage === 1 ? (
                    <div />
                  ) : (
                    <Button
                      title={STRINGS.button.back}
                      onClick={decrementPage}
                      color={COLORS.greenLite}
                      image="back"
                      variant="secondary"
                    />
                  )}
                  <Button
                    title={
                      isLastPage ? STRINGS.button.submit : STRINGS.button.next
                    }
                    onClick={handleSubmit}
                    color={isLastPage ? COLORS.grey : COLORS.greenLite}
                    image="next"
                    type="submit"
                  />
                </FormStyles.ControlPanel>
              </>
            );
          }}
        </Formik>
      )}
    </div>
  );
};
