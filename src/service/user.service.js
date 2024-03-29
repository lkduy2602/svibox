const handleUpdateUser = (body, userId) => {
  const { name, email } = validateUpdateUser(body);

  const emailExist = USER_MODEL.find({
    where: {
      id: `<> '${userId}'`,
      email: `CONTAINS '${email}'`,
    },
  })[0];
  if (emailExist) throw new ExceptionResponse(HTTP_STATUS.CONFLICT, 'email already exist');

  USER_MODEL.update(
    {
      id: `CONTAINS '${userId}'`,
    },
    {
      name,
      email,
    }
  );
};
