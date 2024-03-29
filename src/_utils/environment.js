const TOKEN_SECRET_KEY = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKBLhqyoq3F2EdcqlVIUPCIRFcCOSxUUbBAq69JwBTtGQgIedGb5+QT/axEN3GG7jfxyxspnWCnDEW6wrvM9HvcCAwEAAQ==`;
const ACCESS_TOKEN_EXPIRES_IN = 48 * 60 * 60 * 1000; // HOUR IN MILLISECONDS
const REFRESH_TOKEN_EXPIRES_IN = 365 * 24 * 60 * 60 * 1000; // DAY IN MILLISECONDS

const TOKEN_EXPIRATION_TIMES = {
  [TOKEN_TYPE.ACCESS]: ACCESS_TOKEN_EXPIRES_IN,
  [TOKEN_TYPE.REFRESH]: REFRESH_TOKEN_EXPIRES_IN,
};

const CIPHER = new cCryptoGS.Cipher(TOKEN_SECRET_KEY, 'Rabbit');
