import { api } from '../components/Api.js';
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
  validation,
  buttonAvatar,
  formAvatar,
  userAvatar
} from '../utils/constants.js';
let userId


const userInfo = new UserInfo({userName, userAboutMe, userAvatar});
const handleProfileFormSubmit = (values) => {
  const {profileName, profileAboutme} =values
  api.patchProfile(profileName, profileAboutme)
  userInfo.setUserInfo({profileName, profileAboutme});
}
const submitAvatarHandler = ({ avatarLink }) =>
  api
    .patchAvatar(avatarLink)
    .then((user) => userInfo.setUserInfo({profileName: user.name, profileAboutme: user.about, avatarLink: user.avatar}))
    .catch((err) => console.log(err));

const popupFormEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
const popupFormDelete = new PopupWithForm('.popup_delete')
const popupFormAvatar = new PopupWithForm('.popup_avatar', submitAvatarHandler)



api.getProfile()
.then(res => {
  userInfo.setUserInfo({profileName: res.name, profileAboutme: res.about, avatarLink: res.avatar})
  userId = res._id
})

api.getCardSever()
.then(cardlist =>{
  console.log('cardlist', cardlist)
  cardlist.forEach(data => {
    const card = createNewCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    })
    section.addItem(card)
  });
})


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
  },
  (id) =>{
    popupFormDelete.open()
    popupFormDelete.changeSubmitHandler(() =>{
      api.deleteCard(id)
      .then(res =>{
        newCard.deleteCard()
      })
    })
  },
  (id) =>{
    if(newCard.isLiked()){
    api.deleteLike(id)
    .then(res =>{
      newCard.setLikes(res.likes)
    })
    } else{
    api.addLike(id)
    .then(res =>{
      newCard.setLikes(res.likes)
    })
    }
  }
  );
  const cardElement = newCard.createCard();
  return cardElement
};


const section = new Section({
  items: [],
  renderer: createNewCard
}, listCard);

section.renderItems();




const handleCardFormSubmit = ({ cardName, cardLink }) => {
  api.postCardSever(cardName, cardLink)
  .then(res => {
    const  card  = createNewCard({ 
      name: res.name, 
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id
    });
    section.addItem(card);
  })
};
const popupFormAdd = new PopupWithForm('.popup_add', handleCardFormSubmit);


buttonAdd.addEventListener('click', function (){
  addFormValidator.resetValidation();
  addFormValidator.setSubmitButtonState();
  popupFormAdd.open();
});

buttonAvatar.addEventListener('click', function (){
  avatarFormValidator.resetValidation();
  avatarFormValidator.setSubmitButtonState()
  popupFormAvatar.open()
})


const addFormValidator = new FormValidator(validation, formAdd);
const editFormValidator = new FormValidator(validation, formEdit);
const avatarFormValidator = new FormValidator(validation, formAvatar);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();