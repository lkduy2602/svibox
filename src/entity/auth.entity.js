const AuthSheet = SPREAD_SHEET.getSheetByName('auth');

const AuthEntity = {
  ...CommonEntity,
  user_id: 'E',
  device: 'F',
  access_token: 'G',
  refresh_token: 'H',
};
