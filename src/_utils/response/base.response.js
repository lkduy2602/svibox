class BaseResponse {
  constructor() {
    this.status = null;
    this.message = null;
    this.data = null;
  }

  send() {
    const res = {
      status: this.status || HTTP_STATUS.OK,
      message: this.message || 'OK',
      data: this.data || null,
    };

    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }
}
