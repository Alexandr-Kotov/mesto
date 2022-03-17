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
  listCard,
  inputName,
  inputDescription,
  userName,
  userAboutMe,
  formAdd,
  validation,
  buttonAvatar,
  formAvatar,
  userAvatar,
  buttonFormSaveEdit,
  buttonFormSaveAvatar,
  buttonFormSaveAdd
} from '../utils/constants.js';
let userId

const userInfo = new UserInfo({userName, userAboutMe, userAvatar});
const handleProfileFormSubmit = (values) => {
  const {profileName, profileAboutme} =values
  buttonFormSaveEdit.textContent = "Сохранение..."
  api.patchProfile(profileName, profileAboutme)
  .then(()=>{
    userInfo.setUserInfo({profileName, profileAboutme});
    popupFormEdit.close();
  })
  .catch((err) => console.log(err))
  .finally(() =>{
    buttonFormSaveEdit.textContent = "Сохранить"
  })
}


const handlerAvatarFormSubmit = ({ avatarLink }) =>{
  buttonFormSaveAvatar.textContent = "Сохранение..."
  api.patchAvatar(avatarLink)
    .then(user => {userInfo.setUserInfo({
      profileName: user.name,
      profileAboutme: user.about,
      avatarLink: user.avatar
    });
    popupFormAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() =>{
      buttonFormSaveAvatar.textContent = "Сохранить"
    })
}
const popupFormEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
const popupFormDelete = new PopupWithForm('.popup_delete')
const popupFormAvatar = new PopupWithForm('.popup_avatar', handlerAvatarFormSubmit)



api.getProfile()
.then(res => {
  userInfo.setUserInfo({profileName: res.name, profileAboutme: res.about, avatarLink: res.avatar})
  userId = res._id
})
.catch((err) => console.log(err));

api.getCardSever()
.then(cardlist =>{
  cardlist.reverse()
  cardlist.forEach(data => {
    const card = createNewCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    })
    cardsContainer.addItem(card)
  });
})
.catch((err) => console.log(err));

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
        popupFormDelete.close()
      })
      .catch((err) => console.log(err));
    })
  },
  (id) =>{
    if(newCard.isLiked()){
    api.deleteLike(id)
    .then(res =>{
      newCard.setLikes(res.likes)
    })
    .catch((err) => console.log(err));
    } else{
    api.addLike(id)
    .then(res =>{
      newCard.setLikes(res.likes)
    })
    .catch((err) => console.log(err));
    }
  }
  );
  const cardElement = newCard.createCard();
  return cardElement
};


const cardsContainer = new Section({
  items: [],
  renderer: createNewCard
}, listCard);

cardsContainer.renderItems();

const handleCardFormSubmit = ({ cardName, cardLink }) => {
  buttonFormSaveAdd.textContent = "Сохранение..."
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
    cardsContainer.addItem(card);
    popupFormAdd.close()
  })
  .catch((err) => console.log(err))
  .finally(() =>{
    buttonFormSaveAdd.textContent = "Создать"
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