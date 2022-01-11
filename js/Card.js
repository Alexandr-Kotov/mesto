import {popupImage, popupFigcaption, popupBig, openPopup} from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__card').cloneNode(true);

    return cardElement;
  }
  
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._enlargeCard();
    });
    
    this._card.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    
    this._card.querySelector('.elements__button').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
  }
  
  _enlargeCard() {
    popupFigcaption.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    openPopup(popupBig);
  }
  
  _deleteCard() {
    this._card.remove();
    this._card = null;
  }
  
  _likeCard(evt) {
    evt.target.classList.toggle('elements__button_active');
  }
  
  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.elements__img');
    this._cardTitle = this._card.querySelector('.elements__title');
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    
    this._setEventListeners();
    return this._card;
  }
  
}