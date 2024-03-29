const handleAuth = (actionPart, accessToken, body) => {
  const routeMap = new Map();
  routeMap.set(
    'register',
    routeDecorator({
      isBypassLogin: true,
      handler: handleRegister,
    })
  );
  routeMap.set(
    'login',
    routeDecorator({
      isBypassLogin: true,
      handler: handleLogin,
    })
  );
  routeMap.set(
    'change-password',
    routeDecorator({
      handler: handleChangePassword,
    })
  );
  routeMap.set(
    'token-exp',
    routeDecorator({
      isBypassLogin: true,
      handler: handleTokenExp,
    })
  );
  routeMap.set(
    'token-refresh',
    routeDecorator({
      isBypassLogin: true,
      handler: handleTokenRefresh,
    })
  );

  const route = routeMap.get(actionPart);
  if (!route) throw new ExceptionResponse(HTTP_STATUS.NOT_FOUND, `${actionPart} NOT FOUND`);

  const { isBypassLogin, accessPermissions, handler } = route;

  const { user_id } = auth(accessToken, isBypassLogin, accessPermissions);

  return handler(body, user_id);
};
