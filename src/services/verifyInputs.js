import validator from 'email-validator';

const hasLength = (input) => {
  const minLength = 0;
  return input.length > minLength;
};

const isValidEmail = (input) => validator.validate(input);

const verifyInputs = (name, description, email) => {
  const isValid = isValidEmail(email) && hasLength(name) && hasLength(description);
  return !isValid;
};

export default verifyInputs;
