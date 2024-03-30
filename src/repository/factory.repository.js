class RepositoryFactory {
  constructor(sheet, entity) {
    this.sheet = sheet;
    this.sheetId = sheet.getSheetId();

    this.entity = entity;
  }

  insert(data) {
    const insert = {};

    const defaultValue = RepositoryFactory.generateCommon();
    for (const key in this.entity) {
      if (data[key]) {
        insert[key] = data[key];
      } else {
        insert[key] = defaultValue[key] || '';
      }
    }

    this.sheet.appendRow(Object.values(insert));
  }

  update(where, columnsUpdate) {
    const rowsNumber = RepositoryFactory.getRowsNumber(this.entity, where);

    rowsNumber.forEach((row) => {
      for (const column in columnsUpdate) {
        const value = columnsUpdate[column];

        this.sheet.getRange(`${this.entity[column]}${row}`).setValue(value);
      }

      this.sheet.getRange(`${CommonEntity.updated_at}${row}`).setValue(+moment());
    });
  }

  delete(where) {
    const rowsNumber = RepositoryFactory.getRowsNumber(this.entity, where);

    rowsNumber.forEach((row) => {
      this.sheet.deleteRow(row);
    });
  }

  find({ where, groupBy = {}, orderBy = {}, offset = 0, limit = 1 }) {
    const whereClause = RepositoryFactory.generateWhereClause(this.entity, where);
    const orderByClause = RepositoryFactory.generateOrderByClause(this.entity, orderBy);
    const offsetClause = RepositoryFactory.generateOffsetClause(offset);

    const query = `SELECT * ${whereClause} ${orderByClause} LIMIT ${limit} ${offsetClause}`;

    return queryGoogleSheet(this.sheetId, query);
  }

  static generateCommon() {
    const timestamp = +moment();

    const rowNumber = '=ROW()';
    const createdAt = timestamp;
    const updatedAt = timestamp;
    const id = Utilities.getUuid();

    const commonEntity = CommonEntity;
    commonEntity.row_number = rowNumber;
    commonEntity.created_at = createdAt;
    commonEntity.updated_at = updatedAt;
    commonEntity.id = id;

    return commonEntity;
  }

  static generateWhereClause(entity, where) {
    let whereClause = '';
    let isFirstWhere = true;
    for (const key in where) {
      const value = where[key];

      if (isFirstWhere) {
        whereClause += `WHERE ${entity[key]} ${value}`;
        isFirstWhere = false;
      } else {
        whereClause += `AND ${entity[key]} ${value}`;
      }
    }

    return whereClause;
  }

  static generateOrderByClause(entity, orderBy) {
    let orderByClause = '';
    let isFirstOrderBy = true;
    for (const key in orderBy) {
      const value = orderBy[key] || 'ASC';

      if (isFirstOrderBy) {
        orderByClause += `ORDER BY ${entity[key]} ${value}`;
      } else {
        orderByClause += `, ${entity[key]} ${value}`;
      }
    }

    return orderByClause;
  }

  static generateOffsetClause(offset) {
    return offset ? `OFFSET ${offset}` : '';
  }

  static getRowsNumber(entity, where) {
    if (where.row_number) return [where.row_number];

    const whereClause = RepositoryFactory.generateWhereClause(entity, where);

    const query = `SELECT * ${whereClause}`;
    const result = queryGoogleSheet(this.sheetId, query);

    return result.map((item) => item.row_number);
  }
}

const authRepository = new RepositoryFactory(AuthSheet, AuthEntity);
const userRepository = new RepositoryFactory(UserSheet, UserEntity);
const mediaRepository = new RepositoryFactory(MediaSheet, MediaEntity);
