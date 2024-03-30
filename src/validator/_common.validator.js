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

const limitConstraint = {
  presence: {
    allowEmpty: false,
  },
  type: 'integer',
  numericality: {
    greaterThanOrEqualTo: 1,
    lessThanOrEqualTo: 30,
  },
};

const positionConstraint = {
  type: 'string',
  numericality: {
    onlyInteger: true,
    strict: true,
    greaterThan: 0,
  },
};
