const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__close');
const popupButtonEdit = document.querySelector('.profile__button-edit');

const popupForm = document.querySelector('.popup__form');

const popupInputTitle = document.querySelector('.popup__input_title');
const profileTitle = document.querySelector('.profile__title');

const popupInputText = document.querySelector('.popup__input_text');
const profileText  = document.querySelector('.profile__subtitle');

function openPopup(){
    popup.classList.add('popup_opened')
    popupInputTitle.value = profileTitle.textContent
    popupInputText.value = profileText.textContent
};

function closePopup(){
    popup.classList.remove('popup_opened')
};

popupButtonEdit.addEventListener('click', openPopup);

popupButtonClose.addEventListener('click', closePopup);

function sumitForm(event){
    event.preventDefault()
    profileTitle.textContent = popupInputTitle.value
    profileText.textContent = popupInputText.value
    closePopup()
};

popupForm.addEventListener('submit', sumitForm);

 


