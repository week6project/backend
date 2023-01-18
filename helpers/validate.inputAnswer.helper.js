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

validateInputAnswer = (answerdInput) => {
  console.log('검증 컨트롤', answerdInput);
  if (!answerdInput.userNo) throw new PropertyRequiredError('userNo');
  if (!answerdInput.postId) throw new PropertyRequiredError('postId');

  return true;
};

module.exports = validateInputAnswer;
