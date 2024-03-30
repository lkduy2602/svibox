const SPREAD_SHEET = SpreadsheetApp.getActiveSpreadsheet();
const SHEET_URL = SPREAD_SHEET.getUrl().split('/edit')[0];

const CommonEntity = {
  row_number: 'A',
  created_at: 'B',
  updated_at: 'C',
  id: 'D',
};
