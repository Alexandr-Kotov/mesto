import Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._form.querySelector('.popup__save');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
  }

  // Собирает данные всех полей формы.
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues
  };

  _timeout (){
    this._button.textContent =  "Сохранение..."
    setTimeout(() =>{
      this.close()
      this._button.textContent = "Выполнено"
    }, 1000)
  }


  _submitForm = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this._timeout()
  };

// Обработчик сабмита формы set.
  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  };
// Обработчик сабмита формы remove.
  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  };

  changeSubmitHandler(newSubmitHandler){
    this._submitHandler = newSubmitHandler;
  }
  

// Сбрасываться форрма.
  close() {
    super.close();
    this._form.reset();
  };
};