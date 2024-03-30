const testAPI = () => {
  const route = 'media/list';
  const body = {
    Authorization: 'U2FsdGVkX188/dwoDvI1e+1GEJMggapHnXKUPrROTYejPUjbr9Eb+37DP77ILloY2h6ynjITwMPgHi00AcgNvBwpjry3S+GZmw3aClCLvnzqddPC67s=',
    device: 'web_1711592631',
    name: 'Lê Khánh Duy',
    email: 'lkduy@gmail.com',
    password: 'duympt123',
    new_password: 'duympt123456',
    access_token: 'U2FsdGVkX1/PGG75oQMswUhOM5ux1n10RAfzAZpbITy6TKX6nMLAzb+FfZCcaMSP253rmwQPwsBIm69HTWZldIDE/XeOvNQR/G+CV5oInuufj+rpgZE=',
    refresh_token: 'U2FsdGVkX1/URf90xUR1YH3WOWT/v4ubmF7NP7ps8iid11mcfE5KCI5V+qXRpf5Xw0e9KQ12AhqaG/+NihpJU9FiGHKBivXsY+bgbhoPZ7jlupDFn9U=',
    media_id: '33859',
    limit: 10,
    position: '37137',
    medias: [
      {
        media_id: '37134',
        type: 0,
        content: '',
        created_at: '2024-03-29 23:23:32',
        original: {
          url: 'k1seJGqDJCRl2JYRFbxq_',
          name: '_956a7ac0-4d1c-4cfb-8150-fefe08647d6b.jpg',
          size: 300600,
          width: 1024,
          height: 1024,
          link_full: '',
        },
        medium: {
          url: 'yaltMYgZ0NWLeBf21_Mxk',
          name: '_956a7ac0-4d1c-4cfb-8150-fefe08647d6b.jpg',
          size: 300600,
          width: 1024,
          height: 1024,
        },
        thumb: {
          url: '4AqOpVA_I0MwGULJ48QzM',
          name: '_956a7ac0-4d1c-4cfb-8150-fefe08647d6b.jpg',
          size: 300600,
          width: 1024,
          height: 1024,
        },
      },
      {
        media_id: '37135',
        type: 0,
        content: '',
        created_at: '2024-03-29 23:23:32',
        original: {
          url: 'sqBzcd0iK1IN5trzzUemX',
          name: '_d2ad75c2-8386-4196-b332-dc9265ce8e1c.jpg',
          size: 173589,
          width: 1024,
          height: 1024,
          link_full: '',
        },
        medium: {
          url: 'qJfrs7_lSiXeW2v11nukV',
          name: '_d2ad75c2-8386-4196-b332-dc9265ce8e1c.jpg',
          size: 173589,
          width: 1024,
          height: 1024,
        },
        thumb: {
          url: '3BjczPNPsWdDu_AKc_JIB',
          name: '_d2ad75c2-8386-4196-b332-dc9265ce8e1c.jpg',
          size: 173589,
          width: 1024,
          height: 1024,
        },
      },
      {
        media_id: '37136',
        type: 0,
        content: '',
        created_at: '2024-03-29 23:23:32',
        original: {
          url: 'qjf8FMikBFSJnwNaVpTl-',
          name: '_6b329591-cd66-4f0f-b2b5-dc99ec03343d.jpg',
          size: 205467,
          width: 1024,
          height: 1024,
          link_full: '',
        },
        medium: {
          url: 'OktkCzF-v8eJ6i7L-v3lU',
          name: '_6b329591-cd66-4f0f-b2b5-dc99ec03343d.jpg',
          size: 205467,
          width: 1024,
          height: 1024,
        },
        thumb: {
          url: 'GQlAXVJ2rDDd4bFVn3WFQ',
          name: '_6b329591-cd66-4f0f-b2b5-dc99ec03343d.jpg',
          size: 205467,
          width: 1024,
          height: 1024,
        },
      },
      {
        media_id: '37137',
        type: 0,
        content: '',
        created_at: '2024-03-29 23:23:32',
        original: {
          url: 'xAGyn3FdUsfpeWTUNzmB4',
          name: '_4cad5721-2e81-4981-b227-ab06d074c523.jpg',
          size: 216586,
          width: 1024,
          height: 1024,
          link_full: '',
        },
        medium: {
          url: 'DOAsODT7_N_AouOVQJmbl',
          name: '_4cad5721-2e81-4981-b227-ab06d074c523.jpg',
          size: 216586,
          width: 1024,
          height: 1024,
        },
        thumb: {
          url: 'TDoQx3ck_XIA7FqMlRAkB',
          name: '_4cad5721-2e81-4981-b227-ab06d074c523.jpg',
          size: 216586,
          width: 1024,
          height: 1024,
        },
      },
    ],
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
      case 'media':
        res.data = handleMedia(actionPart, accessToken, body);
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
