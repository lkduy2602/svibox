class ExceptionResponse extends Error {
  constructor(status, message, data) {
    super(message);

    this.exception = {
      status: status,
      message: message,
      data: data,
    };
  }
}
