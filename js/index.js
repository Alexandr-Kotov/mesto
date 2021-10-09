const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__close');
const popupButtonEdit = document.querySelector('.profile__button-edit');

const popupButtonSave = document.querySelector('.popup__save');
const popupForm = document.querySelector('.popup__form');

const popupInputTitle = document.querySelector('.popup__input-title');
const profileTitle = document.querySelector('.profile__title');

const popupInputText = document.querySelector('.popup__input-text');
const profileText  = document.querySelector('.profile__subtitle');


popupButtonEdit.addEventListener('click', function() {
    popup.classList.add('popup_opened')
});

popupButtonClose.addEventListener('click', function() {
    popup.classList.remove('popup_opened')
});

popupForm.addEventListener('submit', function(event){
    event.preventDefault()
    popup.classList.remove('popup_opened')
    profileTitle.textContent = popupInputTitle.value
    profileText.textContent = popupInputText.value
});
 


