export const initialCards = [
  {
    name: 'Ёлка',
    link: 'https://images.unsplash.com/photo-1609009755337-df397a1aa480?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1639562427517-593c20c356b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Собака',
    link: 'https://images.unsplash.com/photo-1611253550249-a1fc4e0b90e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Печенье',
    link: 'https://images.unsplash.com/photo-1639610806386-661d00972b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Кофе',
    link: 'https://images.unsplash.com/photo-1632588417408-2ae5f733e4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1493&q=80'
  },
  {
    name: 'Автомобиль',
    link: 'https://images.unsplash.com/photo-1639696307229-0c944a9126e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  }
]; 

export const validation ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

export const listCard = ('.elements');
export const popupEdit = document.querySelector('.popup_edit');
export const popupAdd = document.querySelector('.popup_add');
export const formEdit = document.querySelector('.popup__form_edit');
export const formAdd = document.querySelector('.popup__form_add')
export const inputName = popupEdit.querySelector('.popup__input_type_name');
export const inputDescription = popupEdit.querySelector('.popup__input_type_description');
export const userName = document.querySelector('.profile__title');
export const userAvatar = document.querySelector('.profile__avatar');
export const userAboutMe = document.querySelector('.profile__subtitle');
export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');
export const buttonAvatar = document.querySelector('.profile__avatar-owner');
export const formAvatar = document.querySelector('.popup__form_avatar');
export const avatar = document.querySelector('.profile__avatar');