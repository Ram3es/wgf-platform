export const REGEXPS = {
  name: /^[aA-zZ\s]*$/,
  email:
    /^(([^<>()\]\\.!#$%&’*+=?^{|}~,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  onlyNumbers: /^(^[1-9][0-9]*|(unlimited))+$/,
  dateFormat: /^\d{2}[./-]\d{2}[./-]\d{4}$/,
  time: /(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
};
