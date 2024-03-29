const USER_SHEET = SPREAD_SHEET.getSheetByName('user');
const USER_SHEET_ID = USER_SHEET.getSheetId();

class UserModel extends CommonModel {
  constructor() {
    super();

    this.name = 'E';
    this.email = 'F';
    this.password = 'G';
  }

  static format(data) {
    const commonFormat = CommonModel.format(data);

    return {
      ...commonFormat,
      name: data[4],
      email: data[5],
      password: data[6],
    };
  }

  insert(data) {
    CommonModel.insert(USER_SHEET, USER_MODEL, data);
  }

  update(where, columnsUpdate) {
    CommonModel.update(USER_SHEET_ID, USER_SHEET, USER_MODEL, where, columnsUpdate);
  }

  find({ where, groupBy, orderBy, offset, limit }) {
    const result = CommonModel.find(USER_SHEET_ID, USER_MODEL, { where, groupBy, orderBy, offset, limit });

    let users = [];
    result.forEach((item, index) => {
      if (index == 0) return;

      users.push(UserModel.format(item));
    });

    return users;
  }
}
const USER_MODEL = new UserModel();
