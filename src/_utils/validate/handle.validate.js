const handleValidate = (constraints, body) => {
  const validationResult = validate(body, constraints, { format: "flat" });
  if (validationResult) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, validationResult[0]);
};
