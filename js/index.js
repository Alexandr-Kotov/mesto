const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__close');
const popupButtonEdit = document.querySelector('.profile__button-edit');

const popupForm = document.querySelector('.popup__form');

const popupInputTypeName = document.querySelector('.popup__input_type_name');
const profileTitle = document.querySelector('.profile__title');

const popupInpuTypeDescription = document.querySelector('.popup__input_type_description');
const profileText  = document.querySelector('.profile__subtitle');

function openPopup(){
    popup.classList.add('popup_opened')
    popupInputTypeName.value = profileTitle.textContent
    popupInpuTypeDescription.value = profileText.textContent
};

function closePopup(){
    popup.classList.remove('popup_opened')
};

popupButtonEdit.addEventListener('click', openPopup);

popupButtonClose.addEventListener('click', closePopup);

function sumitForm(event){
    event.preventDefault()
    profileTitle.textContent = popupInputTypeName.value
    profileText.textContent = popupInpuTypeDescription.value
    closePopup()
};

popupForm.addEventListener('submit', sumitForm);

 


