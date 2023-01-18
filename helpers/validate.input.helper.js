class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('No property: ' + property);
    this.property = property;
    this.statusCode = 412; //Precondition Failed
  }
}

validateInput = (input) => {
  if (Object.keys(input).length !== 5) throw new PropertyRequiredError('not 5 input in total');
  if (!input.userNo) throw new PropertyRequiredError('userNo');
  if (!input.image) throw new PropertyRequiredError('image');
  if (!input.difficult) throw new PropertyRequiredError('difficult');
  if (!input.inputAnswer) throw new PropertyRequiredError('inputAnswer');
  if (!input.inputHint) throw new PropertyRequiredError('inputHint');

  return true;
};

module.exports = validateInput;
