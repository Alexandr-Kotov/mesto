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
const popupOpen = document.querySelector('.popup_opened');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupBig = document.querySelector('.popup_big');
const formEdit = document.querySelector('.popup__form_edit');
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
const buttonSave = document.querySelector('.popup__save_add');

//LIST CARD

function createCard(card){
    const element = template.querySelector('.elements__card').cloneNode(true);
    element.querySelector('.elements__title').innerText = card.name;
    element.querySelector('.elements__img').src = card.link;
    element.querySelector('.elements__button').addEventListener('click', like);
    element.querySelector('.elements__delete').addEventListener('click', cardDelete);
    element.querySelector('.elements__img').addEventListener('click', fullScreen);
    
    return element;
};

function renderCard(card){
    const element = createCard(card);
    listCard.append(element);
};

//BUTTON LIKE

function like(evt) {
    evt.target.classList.toggle('elements__button_active');
};

//BUTTON DELETE

function cardDelete(evt){
    const element = evt.target.closest('.elements__card');
    element.remove();
};

//POPUP OFF/ON

function openPopup(popup){
    popup.classList.add('popup_opened');
};

function closePopup(popup){
    popup.classList.remove('popup_opened');
};


//PROFILE INFO SAVE

function profileInfo(evt){
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileText.textContent = inputDescription.value;
    closePopup(popupEdit);
};


//NEW CARD

function cardNew(event){
  event.preventDefault();
  const name = inputHrefName.value ;
  const href = inputHref.value;
  const card = createCard({
    name : name,
    link : href
  })
  listCard.prepend(card);
if (cardNew) {
  closePopup(popupAdd);
}};

// FULLSCREEN

function fullScreen(evt){
  popupFigcaption.textContent = evt.target.nextElementSibling.querySelector('.elements__title').textContent;
  popupImage.src = evt.target.src;
  openPopup(popupBig);
};

//LISTENERS

buttonSave.addEventListener('click', cardNew);
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));
buttonCloseBig.addEventListener('click', () => closePopup(popupBig));
buttonEdit.addEventListener('click', () => openPopup(popupEdit));
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
formEdit.addEventListener('submit', profileInfo);
initialCards.forEach(renderCard);