const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  

const template = document.querySelector('.template').content;
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
const buttonCloseEdit = document.querySelector('.popup__close_edit');
const buttonCloseAdd = document.querySelector('.popup__close_add');
const buttonCloseBig = document.querySelector('.popup__close_big');
const buttonSaveForm = document.querySelector('.popup__save_add')

//LIST CARD

function createCard(card){
    const element = template.querySelector('.elements__card').cloneNode(true);
    const cardTitle = element.querySelector('.elements__title');
    const cardImg = element.querySelector('.elements__img');
    cardTitle.innerText = card.name;
    cardImg.src = card.link;
    cardImg.alt = card.name;
    element.querySelector('.elements__button').addEventListener('click', likeCardButton);
    element.querySelector('.elements__delete').addEventListener('click', deleteCardButton);

    //OPEN FULL SCREEN 

    cardImg.addEventListener('click', function () {
      popupImage.src = cardImg.src;
      popupImage.alt = cardImg.name;
      popupFigcaption.textContent = cardTitle.textContent;
      openPopup(popupBig);
    })
    
    return element;
};

function renderCard(card){
    listCard.prepend(card);
};

//LIKE CARD BUTTON 

function likeCardButton(evt) {
    evt.target.classList.toggle('elements__button_active');
};

//DELETE CARD BUTTON

function deleteCardButton(evt){
    const element = evt.target.closest('.elements__card');
    element.remove();
};

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
  renderCard(createCard(card))
  closePopup();
  inputHrefName.value = "";
  inputHref.value = "";
  buttonSaveForm.setAttribute('disabled', true);
};

initialCards.forEach(function (item){
  renderCard(createCard(item))
});
//LISTENERS

buttonEdit.addEventListener('click', function(){
  renderProfileInfo();
  openPopup(popupEdit);
})

buttonAdd.addEventListener('click', function(){
  buttonSaveForm.classList.add('popup__save_disabled');
  openPopup(popupAdd);
})


popups.forEach(popup => {
  popup.addEventListener('mouseup', closeByClickHandler);
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
});

formEdit.addEventListener('submit', saveProfileInfo);
formAdd.addEventListener('submit', addNewCard);
