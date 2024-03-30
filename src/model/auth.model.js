const AUTH_SHEET = SPREAD_SHEET.getSheetByName('auth');
const AUTH_SHEET_ID = AUTH_SHEET.getSheetId();

class AuthModel extends CommonModel {
  constructor() {
    super();

    this.user_id = 'E';
    this.device = 'F';
    this.access_token = 'G';
    this.refresh_token = 'H';
  }

  static format(data) {
    const commonFormat = CommonModel.format(data);

    return {
      ...commonFormat,
      user_id: data[4],
      device: data[5],
      access_token: data[6],
      refresh_token: data[7],
    };
  }

  insert(data) {
    CommonModel.insert(AUTH_SHEET, AUTH_MODEL, data);
  }

  update(where, columnsUpdate) {
    CommonModel.update(AUTH_SHEET_ID, AUTH_SHEET, AUTH_MODEL, where, columnsUpdate);
  }

  delete(where) {
    CommonModel.delete(AUTH_SHEET_ID, AUTH_SHEET, AUTH_MODEL, where);
  }

  find({ where, groupBy, orderBy, offset, limit }) {
    const result = CommonModel.find(AUTH_SHEET_ID, AUTH_MODEL, { where, groupBy, orderBy, offset, limit });

    let authList = [];
    result.forEach((item, index) => {
      if (index == 0) return;

      authList.push(AuthModel.format(item));
    });

    return authList;
  }
}
const AUTH_MODEL = new AuthModel();
