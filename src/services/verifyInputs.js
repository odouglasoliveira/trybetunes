const hasLength = (input) => {
  const minLength = 0;
  return input.length > minLength;
};

const isValidEmail = (input) => {
  const hasAt = input.includes('@');
  const hasDotCom = input.includes('.com');
  const verifyLength = hasLength(input);
  const validations = [hasAt, hasDotCom, verifyLength];
  return validations.every((validation) => validation === true);
};

const verifyText = (input) => hasLength(input);

const verifyInputs = (name, description, email) => {
  const isValid = isValidEmail(email) && verifyText(name) && verifyText(description);
  return !isValid;
};

export default verifyInputs;
