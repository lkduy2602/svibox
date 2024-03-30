const handleRegister = (body) => {
  const { name, email, password } = validateRegister(body);

  const user = userRepository.find({
    where: {
      email: `CONTAINS '${email}'`,
    },
  })[0];
  if (user) throw new ExceptionResponse(HTTP_STATUS.CONFLICT, 'email already exist');

  const hashPassword = hashAndEncodePassword(password);
  userRepository.insert({
    name,
    email,
    password: hashPassword,
  });
};

const handleLogin = (body) => {
  const { device, email, password } = validateLogin(body);

  const hashPassword = hashAndEncodePassword(password);
  const user = userRepository.find({
    where: {
      email: `CONTAINS '${email}'`,
      password: `CONTAINS '${hashPassword}'`,
    },
  })[0];
  if (!user) throw new ExceptionResponse(HTTP_STATUS.NOT_FOUND, 'user not found');

  const accessToken = generateToken(user.id, TOKEN_TYPE.ACCESS);
  const refreshToken = generateToken(user.id, TOKEN_TYPE.REFRESH);

  const auth = authRepository.find({
    where: {
      user_id: `CONTAINS '${user.id}'`,
      device: `CONTAINS '${device}'`,
    },
  })[0];

  if (!auth) {
    authRepository.insert({
      user_id: user.id,
      device: device,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } else {
    authRepository.update(
      {
        row_number: auth.row_number,
      },
      {
        access_token: accessToken,
        refresh_token: refreshToken,
      }
    );
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

const handleChangePassword = (body, userId) => {
  const { device, password, new_password } = validateChangePassword(body);

  const hashPassword = hashAndEncodePassword(password);
  const user = userRepository.find({
    where: {
      id: `CONTAINS '${userId}'`,
      password: `CONTAINS '${hashPassword}'`,
    },
  })[0];
  if (!user) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, 'incorrect old password');

  const hashNewPassword = hashAndEncodePassword(new_password);
  userRepository.update(
    {
      row_number: user.row_number,
    },
    {
      password: hashNewPassword,
    }
  );

  const accessToken = generateToken(user.id, TOKEN_TYPE.ACCESS);
  const refreshToken = generateToken(user.id, TOKEN_TYPE.REFRESH);
  authRepository.update(
    {
      user_id: `CONTAINS '${user.id}'`,
      device: `CONTAINS '${device}'`,
    },
    {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

const handleTokenExp = (body) => {
  const { access_token, refresh_token } = validateTokenExp(body);

  const accessTokenData = extractToken(access_token);
  const refreshTokenData = extractToken(refresh_token);

  return {
    access_token_exp: accessTokenData.exp,
    refresh_token_exp: refreshTokenData.exp,
  };
};

const handleTokenRefresh = (body) => {
  const { device, refresh_token } = validateTokenRefresh(body);

  const { user_id, exp } = extractToken(refresh_token);
  const timestamp = +moment();
  if (timestamp > exp) throw new ExceptionResponse(HTTP_STATUS.UNAUTHORIZED, 'UNAUTHORIZED');

  const auth = authRepository.find({
    where: {
      user_id: `CONTAINS '${user_id}'`,
      device: `CONTAINS '${device}'`,
      refresh_token: `CONTAINS '${refresh_token}'`,
    },
  })[0];
  console.log('a', auth)
  if (!auth) throw new ExceptionResponse(HTTP_STATUS.UNAUTHORIZED, 'UNAUTHORIZED');

  const accessToken = generateToken(user_id, TOKEN_TYPE.ACCESS);
  const refreshToken = generateToken(user_id, TOKEN_TYPE.REFRESH);

  authRepository.update(
    {
      row_number: auth.row_number,
    },
    {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};
