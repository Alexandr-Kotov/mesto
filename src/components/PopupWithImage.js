import Popup from "./Popup.js";

 export default  class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

// Перезаписываем метод open для popupBig.
  open(name, link){
    this._popupFigcaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  };
};