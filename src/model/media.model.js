const MEDIA_SHEET = SPREAD_SHEET.getSheetByName('media');
const MEDIA_SHEET_ID = MEDIA_SHEET.getSheetId();

class MediaModel extends CommonModel {
  constructor() {
    super();

    this.user_id = 'E';
    this.media_id = 'F';
    this.type = 'G';
    this.original = 'H';
    this.medium = 'I';
    this.thumb = 'J';
  }

  static format(data) {
    const commonFormat = CommonModel.format(data);

    return {
      ...commonFormat,
      user_id: data[4],
      media_id: data[5],
      type: data[6],
      original: data[7],
      medium: data[8],
      thumb: data[9],
    };
  }

  insert(data) {
    CommonModel.insert(MEDIA_SHEET, MEDIA_MODEL, data);
  }

  update(where, columnsUpdate) {
    CommonModel.update(MEDIA_SHEET_ID, MEDIA_SHEET, MEDIA_MODEL, where, columnsUpdate);
  }

  find({ where, groupBy, orderBy, offset, limit }) {
    const result = CommonModel.find(MEDIA_SHEET_ID, MEDIA_MODEL, { where, groupBy, orderBy, offset, limit });

    let list = [];
    result.forEach((item, index) => {
      if (index == 0) return;

      list.push(MediaModel.format(item));
    });

    return list;
  }
}
const MEDIA_MODEL = new MediaModel();
