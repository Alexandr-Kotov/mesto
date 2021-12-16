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

//LIST CARD

function createCard(card){
    const element = template.querySelector('.elements__card').cloneNode(true);
    element.querySelector('.elements__title').innerText = card.name;
    element.querySelector('.elements__img').src = card.link;
    element.querySelector('.elements__img').alt = card.name;
    element.querySelector('.elements__button').addEventListener('click', likeCardButton);
    element.querySelector('.elements__delete').addEventListener('click', deleteCardButton);
    element.querySelector('.elements__img').addEventListener('click', openFullScreen);
    
    return element;
};

function renderCard(card){
    const element = createCard(card);
    listCard.append(element);
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
  const card = createCard({
    name : name,
    link : href
  })
  listCard.prepend(card);
  closePopup();
  inputHrefName.value = "";
  inputHref.value = "";
};

//OPEN FULL SCREEN 

function openFullScreen(evt){
  const cardTitle = evt.target.nextElementSibling.querySelector('.elements__title').textContent;
  popupFigcaption.textContent = cardTitle;
  popupImage.src = evt.target.src;
  popupImage.alt = cardTitle;
  openPopup(popupBig);
};

//LISTENERS

buttonEdit.addEventListener('click', function(){
  renderProfileInfo();
  openPopup(popupEdit);
})

popups.forEach(popup => {
  popup.addEventListener('mouseup', closeByClickHandler);
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
});

buttonAdd.addEventListener('click', () => openPopup(popupAdd));
formEdit.addEventListener('submit', saveProfileInfo);
formAdd.addEventListener('submit', addNewCard);
initialCards.forEach(renderCard);