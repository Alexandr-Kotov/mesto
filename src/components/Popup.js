export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

// Содержит логику закрыте popup.
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
    if (evt.target.classList.contains('popup__close')) {
      this.close();
    }
  };

// Открытие popup.
  open(){
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  };

//Закрыте popup.
  close(){
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  };

// Слушатель клика set. 
  _setEventListeners(){
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  };

// Слушатель клика remove.  
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  };
};