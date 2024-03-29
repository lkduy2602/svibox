const testAPI = () => {
  const route = 'auth/change-password';
  const body = {
    Authorization: 'U2FsdGVkX19P84uZLb/8JITJHk4yXnOc9xilGkWp3/uB2FDx6WDJW/qUI7541ffkXIGZI6ZTX5jZlujpHGkPU8M8Dmijm+mQeVhSkBcK9ki7roL/Slk=',
    device: 'web_1711592631',
    name: 'Lê Khánh Duy',
    email: 'lkduy@gmail.com',
    password: 'duympt123',
    new_password: 'duympt123456',
    access_token: 'U2FsdGVkX1/PGG75oQMswUhOM5ux1n10RAfzAZpbITy6TKX6nMLAzb+FfZCcaMSP253rmwQPwsBIm69HTWZldIDE/XeOvNQR/G+CV5oInuufj+rpgZE=',
    refresh_token: 'U2FsdGVkX1/URf90xUR1YH3WOWT/v4ubmF7NP7ps8iid11mcfE5KCI5V+qXRpf5Xw0e9KQ12AhqaG/+NihpJU9FiGHKBivXsY+bgbhoPZ7jlupDFn9U=',
  };

  const req = {
    parameter: {
      route: route,
    },
    postData: {
      contents: JSON.stringify(body),
    },
  };

  const res = doPost(req);
  console.log(JSON.parse(res.getContent()));
};

const doPost = (req) => {
  const res = new BaseResponse();

  try {
    const { route } = req.parameter;
    let body;
    try {
      body = JSON.parse(req?.postData?.contents || null);
    } catch {}
    body = body || {};
    const accessToken = body.Authorization;

    const [resourcePart, actionPart] = typeof route == 'string' ? route.split('/') : [];

    switch (resourcePart) {
      case 'auth':
        res.data = handleAuth(actionPart, accessToken, body);
        break;
      case 'user':
        res.data = handleUser(actionPart, accessToken, body);
        break;
      default:
        throw new ExceptionResponse(HTTP_STATUS.NOT_FOUND, `${resourcePart} NOT FOUND`);
    }
  } catch (error) {
    let status;
    let message;
    let data;

    if (error.exception) {
      const { exception } = error;
      status = exception.status;
      message = exception.message;
      data = exception.data;
    } else {
      console.error(error.stack);

      sendErrorEmail(error);

      message = error.stack || error.message;
    }

    res.status = status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.message = message || 'INTERNAL SERVER ERROR';
    res.data = data;
  }

  return res.send();
};
