const nameConstraint = {
  presence: {
    allowEmpty: false,
  },
  type: 'string',
  format: {
    pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
  },
  length: {
    minimum: 3,
    maximum: 30,
  },
};
