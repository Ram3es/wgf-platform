import * as yup from 'yup';

export const updatePasswordInitial = {
  email: '',
  newPassword: '',
  confirmPassword: '',
};

export const UpdatePasswordFormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('This field cannot be empty')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters,Upper & Lower case,Number and special case Character'
    ),
  confirmPassword: yup
    .string()
    .required('This field cannot be empty')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
