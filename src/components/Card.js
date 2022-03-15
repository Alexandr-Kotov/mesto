
export default class Card {
  constructor(data, cardSelector, {handleCardClick}, handleDeleteClick, handleLikeClick) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data.id;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__card').cloneNode(true);
    return cardElement;
  };
  
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    
    this._card.querySelector('.elements__delete').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    
    this._card.querySelector('.elements__button').addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
  };

  deleteCard() {
    this._card.remove();
    this._card = null;
  };
  
  _addLikeCard() {
    this._card.querySelector('.elements__button').classList.add('elements__button_active');
  };

   _removeLikeCard() {
    this._card.querySelector('.elements__button').classList.remove('elements__button_active');
  };

  isLiked(){
    const userHasLikeCard = this._likes.find(user => user._id === this._userId)
    return userHasLikeCard
  }

  setLikes(newLikes){
    this._likes = newLikes
    const likeCountElement = this._card.querySelector('.elements__button-count')
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()){
      this._addLikeCard()
    }else{
      this. _removeLikeCard()
    }
  }

  createCard() {

    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.elements__img');
    this._cardTitle = this._card.querySelector('.elements__title');
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    
    this.setLikes(this._likes)
    
    if(this._ownerId !== this._userId){
      this._card.querySelector('.elements__delete').style.display = 'none'
    }

    return this._card;
  };
};