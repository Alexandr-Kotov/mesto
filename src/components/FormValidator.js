export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._inputs = [...this._formElement.querySelectorAll(this._config.inputSelector)];
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }
  
  _handleSubmit(evt) {
    evt.preventDefault();
  };
  
  _isInputValid(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  };
  
  _hideInputError(input) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  };
  
  _showInputError(input) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  };
  
  _resetInputsErrors() {
    this._inputs.forEach(input => {
      this._hideInputError(input);
    })
  };
  
  _setFormListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      this._handleSubmit(evt);
    });
  
    this._formElement.addEventListener('input', () => {
      this.setSubmitButtonState();
    });
  
    this._inputs.forEach(input => {
      input.addEventListener('input', () => this._isInputValid(input));
    });
  
    this.setSubmitButtonState();
  };
  
  setSubmitButtonState() {
    this._submitButton.disabled = !this._formElement.checkValidity();
    this._submitButton.classList.toggle(this._config.inactiveButtonClass, !this._formElement.checkValidity());
  };
  
  resetValidation() {
    this._formElement.reset();
    this._resetInputsErrors();
  };
  
  enableValidation() {
    this._setFormListeners();
  }; 
};