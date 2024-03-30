const SPREAD_SHEET = SpreadsheetApp.getActiveSpreadsheet();
const SHEET_URL = SPREAD_SHEET.getUrl().split('/edit')[0];

class CommonModel {
  constructor() {
    this.row_number = 'A';
    this.created_at = 'B';
    this.updated_at = 'C';
    this.id = 'D';
  }

  static format(data) {
    return {
      row_number: data[0],
      created_at: data[1],
      updated_at: data[2],
      id: data[3],
    };
  }

  static generateCommon() {
    const timestamp = +moment();

    const rowNumber = '=ROW()';
    const createdAt = timestamp;
    const updatedAt = timestamp;
    const id = Utilities.getUuid();

    return {
      row_number: rowNumber,
      created_at: createdAt,
      updated_at: updatedAt,
      id: id,
    };
  }

  static insert(sheet, model, data) {
    const insert = {};
    const defaultValue = CommonModel.generateCommon();
    for (const key in model) {
      if (data[key]) {
        insert[key] = data[key];
      } else {
        insert[key] = defaultValue[key] || '';
      }
    }

    sheet.appendRow(Object.values(insert));
  }

  static update(sheetId, sheet, model, where, columnsUpdate) {
    let rowsNumber = [];
    if (where.row_number) {
      rowsNumber = [where.row_number];
    } else {
      let whereClause = '';
      let isFirstWhere = true;
      for (const key in where) {
        const value = where[key];

        if (isFirstWhere) {
          whereClause += `WHERE ${model[key]} ${value}`;

          isFirstWhere = false;
        } else {
          whereClause += `AND ${model[key]} ${value}`;
        }
      }
      const query = `SELECT * ${whereClause}`;
      const result = queryGoogleSheet(sheetId, query);

      result.forEach((item, index) => {
        if (index == 0) return;

        rowsNumber.push(item[0]);
      });
    }

    for (const row of rowsNumber) {
      for (const column in columnsUpdate) {
        const value = columnsUpdate[column];

        sheet.getRange(`${model[column]}${row}`).setValue(value);
      }

      sheet.getRange(`${COMMON_MODEL.updated_at}${row}`).setValue(+moment());
    }
  }

  static find(sheetId, model, { where, groupBy = {}, orderBy = {}, offset = 0, limit = 1 }) {
    let whereClause = '';
    let isFirstWhere = true;
    for (const key in where) {
      const value = where[key];

      if (isFirstWhere) {
        whereClause += `WHERE ${model[key]} ${value}`;

        isFirstWhere = false;
      } else {
        whereClause += `AND ${model[key]} ${value}`;
      }
    }

    let orderByClause = '';
    let isFirstOrderBy = true;
    for (const key in orderBy) {
      const value = orderBy[key] || 'ASC';

      if (isFirstOrderBy) {
        orderByClause += `ORDER BY ${model[key]} ${value}`;
      } else {
        orderByClause += `, ${model[key]} ${value}`;
      }
    }

    let offsetClause = '';
    if (offset) {
      offsetClause = `OFFSET ${offset}`;
    }

    const query = `SELECT * ${whereClause} ${orderByClause} LIMIT ${limit} ${offsetClause}`;

    return queryGoogleSheet(sheetId, query);
  }
}
const COMMON_MODEL = new CommonModel();
