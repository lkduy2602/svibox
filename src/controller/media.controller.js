const handleMedia = (actionPart, accessToken, body) => {
  const routeMap = new Map();
  routeMap.set(
    'create',
    routeDecorator({
      handler: handleCreateMedia,
    })
  );
  routeMap.set(
    'delete',
    routeDecorator({
      handler: handleDeleteMedia,
    })
  );
  routeMap.set(
    'list',
    routeDecorator({
      handler: handleListMedia,
    })
  );

  const route = routeMap.get(actionPart);
  if (!route) throw new ExceptionResponse(HTTP_STATUS.NOT_FOUND, `${actionPart} NOT FOUND`);

  const { isBypassLogin, accessPermissions, handler } = route;

  const { user_id } = auth(accessToken, isBypassLogin, accessPermissions);

  return handler(body, user_id);
};
