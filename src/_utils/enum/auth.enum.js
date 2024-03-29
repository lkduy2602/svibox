const TOKEN_TYPE = {
  ACCESS: 'ACCESS_TOKEN',
  REFRESH: 'REFRESH_TOKEN',
};

const TOKEN_DATA = (userId, exp) => {
  return {
    user_id: userId,
    exp,
  };
};
