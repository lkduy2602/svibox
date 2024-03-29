const auth = (accessToken, isBypassLogin) => {
  if (isBypassLogin) return {};
  if (!accessToken) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, 'accessToken Not Found');

  const { user_id, exp } = extractToken(accessToken);
  const timestamp = +moment();
  if (timestamp > exp) throw new ExceptionResponse(HTTP_STATUS.UNAUTHORIZED, 'UNAUTHORIZED');

  const auth = AUTH_MODEL.find({
    where: {
      user_id: `CONTAINS '${user_id}'`,
      access_token: `CONTAINS '${accessToken}'`,
    },
  })[0];
  if (!auth) throw new ExceptionResponse(HTTP_STATUS.UNAUTHORIZED, 'UNAUTHORIZED');

  return {
    user_id,
  };
};
