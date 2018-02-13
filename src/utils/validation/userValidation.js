import {
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from './constants';
import { validationErrors } from './validationErrors';
import ValidationResult from './validationResult';

function isEmpty(str) {
  return str.length === 0;
}

function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const validateName = (name) => {
  let errors = [];

  if (isEmpty(name)) {
    errors.push(validationErrors.UserNameRequired);
  }

  if (name.length < USER_NAME_MIN_LENGTH) {
    errors.push(validationErrors.UserNameMinLength);
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validateEmail = (email) => {
  const errors = [];

  if (isEmpty(email)) {
    errors.push(validationErrors.UserEmailRequired);
  }

  if (isEmail(email) === false) {
    errors.push(validationErrors.UserEmailIncorrect);
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validatePassword = (password) => {
  const errors = [];

  if (isEmpty(password)) {
    errors.push(validationErrors.UserPasswordRequired);
  }

  if (password.length < USER_PASSWORD_MIN_LENGTH) {
    errors.push(validationErrors.UserPasswordMinLength);
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validateConfirmationPassword = (password, confirmationPassword) => {
  const errors = [];

  if (password.toUpperCase() !== confirmationPassword.toUpperCase()) {
    errors.push(validationErrors.UserConfirmationPasswordMustMatch);
  }

  return new ValidationResult(errors.length === 0, errors);
};
