const generateToken = (userId, tokenType) => {
  const expiresIn = TOKEN_EXPIRATION_TIMES[tokenType];
  if (!expiresIn) throw new Error('tokenType Not Found');

  const tokenData = JSON.stringify(TOKEN_DATA(userId, +moment() + expiresIn));
  const token = CIPHER.encrypt(tokenData);

  return token;
};

const extractToken = (token) => {
  try {
    const decrypted = CIPHER.decrypt(token);

    const { user_id, exp } = JSON.parse(decrypted);

    return TOKEN_DATA(user_id, exp);
  } catch {
    throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, `token is invalid`);
  }
};
