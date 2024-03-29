const handleValidate = (constraints, body) => {
  const validationResult = validate(body, constraints);
  if (validationResult) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, Object.values(validationResult)[0][0]);
};
