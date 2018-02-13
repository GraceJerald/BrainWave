export default class ValidationResult {
  constructor(isValid, errors) {
    this.isValid = isValid;
    this.errors = errors;
  }

  get firstErrorMessageIfAny() {
    return this.isValid ? null : this.errors[0].message;
  }
}
