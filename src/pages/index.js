import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import {
  buttonAdd,
  buttonEdit,
  formEdit,
  initialCards,
  listCard,
  inputName,
  inputDescription,
  userName,
  userAboutMe,
  formAdd,
  validation
} from '../utils/constants.js';

const userInfo = new UserInfo({userName, userAboutMe});
const handleProfileFormSubmit = (values) => userInfo.setUserInfo(values);
const popupFormEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit);

buttonEdit.addEventListener('click', () =>{
  editFormValidator.resetValidation() 
  const currentUser = userInfo.getUserInfo();
  inputName.value = currentUser.profileName;
  inputDescription.value = currentUser.profileAboutme;
  editFormValidator.setSubmitButtonState();
  popupFormEdit.open();
});



const popupBig = new PopupWithImage('.popup_big');

function createNewCard(card){
  const newCard = new Card(card, '.template',{
    handleCardClick: (name, link)=>{
      popupBig.open(name, link)
    }
  });
  const cardElement = newCard.createCard();
  return cardElement
};


const section = new Section({
  items: initialCards,
  renderer: createNewCard
}, listCard);

section.renderItems();




const handleCardFormSubmit = ({ cardName, cardLink }) => {
  const card = createNewCard({ name: cardName, link: cardLink });
  section.addItem(card);
};
const popupFormAdd = new PopupWithForm('.popup_add', handleCardFormSubmit);


buttonAdd.addEventListener('click', function (){
  addFormValidator.resetValidation();
  addFormValidator.setSubmitButtonState()
  popupFormAdd.open();
});




const addFormValidator = new FormValidator(validation, formAdd);
const editFormValidator = new FormValidator(validation, formEdit);

addFormValidator.enableValidation();
editFormValidator.enableValidation();