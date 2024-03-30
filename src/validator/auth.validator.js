const deviceConstraint = {
  presence: {
    allowEmpty: false,
  },
  type: 'string',
  format: {
    pattern: /^.*_.*$/,
  },
  length: {
    minimum: 10,
  },
};

const passwordConstraint = {
  presence: {
    allowEmpty: false,
  },
  type: 'string',
  format: {
    pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
  },
  length: {
    minimum: 6,
  },
};

const validateRegister = (body) => {
  const constraints = {
    name: nameConstraint,
    email: {
      email: true,
    },
    password: passwordConstraint,
  };

  handleValidate(constraints, body);

  return {
    name: body.name,
    email: body.email,
    password: body.password,
  };
};

const validateLogin = (body) => {
  const constraints = {
    device: deviceConstraint,
    email: {
      email: true,
    },
    password: passwordConstraint,
  };

  handleValidate(constraints, body);

  return {
    device: body.device,
    email: body.email,
    password: body.password,
  };
};

const validateChangePassword = (body) => {
  const constraints = {
    device: deviceConstraint,
    password: passwordConstraint,
    new_password: passwordConstraint,
  };

  handleValidate(constraints, body);

  return {
    device: body.device,
    password: body.password,
    new_password: body.new_password,
  };
};

const tokenConstraint = {
  presence: {
    allowEmpty: false,
  },
  type: 'string',
  length: {
    minimum: 116,
  },
};

const validateTokenExp = (body) => {
  const constraints = {
    access_token: tokenConstraint,
    refresh_token: tokenConstraint,
  };

  handleValidate(constraints, body);

  return {
    access_token: body.access_token,
    refresh_token: body.refresh_token,
  };
};

const validateTokenRefresh = (body) => {
  const constraints = {
    device: deviceConstraint,
    refresh_token: tokenConstraint,
  };

  handleValidate(constraints, body);

  return {
    device: body.device,
    refresh_token: body.refresh_token,
  };
};
