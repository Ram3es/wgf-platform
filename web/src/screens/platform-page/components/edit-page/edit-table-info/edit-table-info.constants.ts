interface IEditTableInfoRow {
  [key: string]: Record<string, string>[];
}

export const EditTableInfoRow: IEditTableInfoRow = {
  user: [
    { firstName: '* First Name' },
    { lastName: '* Last Name' },
    { groups: 'Group Name' },
    { created: 'Registered on' },
    { email: 'Email' },
    { organisationName: 'School / Organisation' },
    { payment: 'Payment' },
  ],
  trainerAdmin: [
    { firstName: '* First Name' },
    { lastName: '* Last Name' },
    { organisationName: 'School / Organisation' },
    { created: 'Registered on' },
    { email: 'Email' },
  ],
  editRow: [
    { payment: 'Payment' },
    { accreditation: 'Accreditation' },
    { subscription: 'Subscription' },
  ],
};
