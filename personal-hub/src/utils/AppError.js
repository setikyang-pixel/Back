export default class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "Error";
    this.oper = true;
    this.status = status;
  }
}
