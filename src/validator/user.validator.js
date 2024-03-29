const validateUpdateUser = (body) => {
  const constraints = {
    name: nameConstraint,
    email: {
      email: true,
    },
  };

  handleValidate(constraints, body);

  return {
    name: body.name,
    email: body.email,
  };
};
