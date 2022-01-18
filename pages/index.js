import {
  initialCards,
  validation, 
  listCard, 
  popups, 
  popupEdit, 
  popupAdd, 
  popupBig, 
  formEdit, 
  formAdd, 
  inputName, 
  inputDescription, 
  inputHrefName, 
  inputHref, 
  profileName, 
  profileText, 
  popupImage, 
  popupFigcaption, 
  buttonEdit, 
  buttonAdd} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'

export {popupImage, popupFigcaption, popupBig, openPopup};




const userInfo = new UserInfo ({profileName, profileText});



const section = new Section({
  items: initialCards,
  renderer: createCard
}, listCard)

section.renderItems()

//POPUP OFF/ON

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscapeHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscapeHandler);
}

function closeByEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => { 
  popup.addEventListener('click', (evt) => { 
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        closePopup(popup); 
    } 
  })
}) 

//PROFILE INFO SAVE

//function saveProfileInfo(evt){
//  profileName.textContent = inputName.value;
//  profileText.textContent = inputDescription.value;
//  closePopup(popupEdit);
//};

function renderProfileInfo(){
  inputName.value = profileName.textContent;
  inputDescription.value = profileText.textContent;
};   

//ADD NEW CARD

function addNewCard(event){
  const name = inputHrefName.value ;
  const href = inputHref.value;
  const card = {
    name : name,
    link : href
  }
  renderNewCard(card)
  addFormValidator.resetValidation()
  addFormValidator.setSubmitButtonState()
  closePopup(popupAdd);
};

//initialCards.forEach(function (card){
//  renderNewCard(card)
//});
//LISTENERS

buttonEdit.addEventListener('click',() =>{
  const currentUser = userInfo.getUserInfo();

  inputName.value = currentUser.name;
  inputDescription.value = currentUser.aboutMe;
  editFormValidator.resetValidation();
  renderProfileInfo();
  editFormValidator.setSubmitButtonState();
  openPopup(popupEdit);
})

buttonAdd.addEventListener('click', function(){
  openPopup(popupAdd);
})


formAdd.addEventListener('submit', addNewCard);

function createCard(card){
  const newCard = new Card(card, '.template');
  const cardElement = newCard.createCard();
  return (cardElement)
}

//function renderNewCard(card) {
// const cardElementList = createCard(card)
// listCard.prepend(cardElementList);
//}

const addFormValidator = new FormValidator(validation, formAdd);
const editFormValidator = new FormValidator(validation, formEdit);

addFormValidator.enableValidation();
editFormValidator.enableValidation();