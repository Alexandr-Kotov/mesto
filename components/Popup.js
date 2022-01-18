class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }
  _handleEscClose(){
    if (evt.key === 'Escape'){
      this._close();
    }
  }
  open(){
    this._popup.classList.add('popup_opened');
  }
  close(){
    this._popup.classList.remove('popup_opened');
  }
  setEventListeners(){

  }
}