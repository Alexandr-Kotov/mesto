import {initialCards} from './initialCards.js';
import {validation} from './validation.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export {popupImage, popupFigcaption, popupBig, openPopup};

const listCard = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupBig = document.querySelector('.popup_big');
const formEdit = document.querySelector('.popup__form_edit');
const formAdd = document.querySelector('.popup__form_add')
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputHrefName = document.querySelector('.popup__input_type_name-href');
const inputHref = document.querySelector('.popup__input_type_href');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonSaveForm = document.querySelector('.popup__save_add');


//POPUP OFF/ON

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscapeHandler);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscapeHandler);
}

function closeByClickHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

function closeByEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}


//PROFILE INFO SAVE

function saveProfileInfo(evt){
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileText.textContent = inputDescription.value;
    closePopup();
};

function renderProfileInfo(){
    inputName.value = profileName.textContent;
    inputDescription.value = profileText.textContent;
};   

//ADD NEW CARD

function addNewCard(event){
  event.preventDefault();
  const name = inputHrefName.value ;
  const href = inputHref.value;
  const card = {
    name : name,
    link : href
  }
  renderNewCard(card)
  closePopup();
  inputHrefName.value = "";
  inputHref.value = "";
  buttonSaveForm.setAttribute('disabled', true);
};

initialCards.forEach(function (card){
  renderNewCard(card)
});
//LISTENERS

buttonEdit.addEventListener('click', function(){
  editFormValidator.resetValidation();
  renderProfileInfo();
  editFormValidator.setSubmitButtonState();
  openPopup(popupEdit);
})

buttonAdd.addEventListener('click', function(){
  addFormValidator.resetValidation();
  openPopup(popupAdd);
})


popups.forEach(popup => {
  popup.addEventListener('mouseup', closeByClickHandler);
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
});

formEdit.addEventListener('submit', saveProfileInfo);
formAdd.addEventListener('submit', addNewCard);


function renderNewCard(card) {
  const newCard = new Card(card, '.template');
  const cardElement = newCard.createCard();

  listCard.prepend(cardElement);
}

const addFormValidator = new FormValidator(validation, formAdd);
const editFormValidator = new FormValidator(validation, formEdit);

addFormValidator.enableValidation();
editFormValidator.enableValidation();