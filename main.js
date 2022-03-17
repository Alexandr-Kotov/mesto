(()=>{"use strict";var e=new class{constructor(e){var t=e.baseUrl,s=e.headers;this._baseUrl=t,this._headers=s,this._resHandler=e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}getProfile(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((e=>this._resHandler(e)))}patchProfile(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((e=>this._resHandler(e)))}getCardSever(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((e=>this._resHandler(e)))}postCardSever(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((e=>this._resHandler(e)))}deleteCard(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((e=>this._resHandler(e)))}addLike(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((e=>this._resHandler(e)))}deleteLike(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((e=>this._resHandler(e)))}patchAvatar(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._resHandler(e)))}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-37",headers:{authorization:"4681c571-88f6-4ca4-b1b2-2741f41c35d8","Content-Type":"application/json"}});class t{constructor(e,t,s,r,i){var n=s.handleCardClick;this._name=e.name,this._link=e.link,this._likes=e.likes,this._id=e.id,this._userId=e.userId,this._ownerId=e.ownerId,this._cardSelector=t,this._handleCardClick=n,this._handleDeleteClick=r,this._handleLikeClick=i}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".elements__card").cloneNode(!0)}_setEventListeners(){this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._name,this._link)})),this._card.querySelector(".elements__delete").addEventListener("click",(()=>{this._handleDeleteClick(this._id)})),this._card.querySelector(".elements__button").addEventListener("click",(()=>{this._handleLikeClick(this._id)}))}deleteCard(){this._card.remove(),this._card=null}_addLikeCard(){this._card.querySelector(".elements__button").classList.add("elements__button_active")}_removeLikeCard(){this._card.querySelector(".elements__button").classList.remove("elements__button_active")}isLiked(){return this._likes.find((e=>e._id===this._userId))}setLikes(e){this._likes=e,this._card.querySelector(".elements__button-count").textContent=this._likes.length,this.isLiked()?this._addLikeCard():this._removeLikeCard()}createCard(){return this._card=this._getTemplate(),this._cardImage=this._card.querySelector(".elements__img"),this._cardTitle=this._card.querySelector(".elements__title"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardTitle.textContent=this._name,this._setEventListeners(),this.setLikes(this._likes),this._ownerId!==this._userId&&(this._card.querySelector(".elements__delete").style.display="none"),this._card}}class s{constructor(e,t){this._formElement=t,this._config=e,this._inputs=[...this._formElement.querySelectorAll(this._config.inputSelector)],this._submitButton=this._formElement.querySelector(this._config.submitButtonSelector)}_handleSubmit(e){e.preventDefault()}_isInputValid(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_hideInputError(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));t.textContent="",t.classList.remove(this._config.errorClass),e.classList.remove(this._config.inputErrorClass)}_showInputError(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));t.textContent=e.validationMessage,t.classList.add(this._config.errorClass),e.classList.add(this._config.inputErrorClass)}_resetInputsErrors(){this._inputs.forEach((e=>{this._hideInputError(e)}))}_setFormListeners(){this._formElement.addEventListener("submit",(e=>{this._handleSubmit(e)})),this._formElement.addEventListener("input",(()=>{this.setSubmitButtonState()})),this._inputs.forEach((e=>{e.addEventListener("input",(()=>this._isInputValid(e)))})),this.setSubmitButtonState()}setSubmitButtonState(){this._submitButton.disabled=!this._formElement.checkValidity(),this._submitButton.classList.toggle(this._config.inactiveButtonClass,!this._formElement.checkValidity())}resetValidation(){this._formElement.reset(),this._resetInputsErrors()}enableValidation(){this._setFormListeners()}}function r(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class i{constructor(e){r(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),r(this,"_handleClickClose",(e=>{e.target.classList.contains("popup_opened")&&this.close(),e.target.classList.contains("popup__close")&&this.close()})),this._popup=document.querySelector(e)}open(){this._popup.classList.add("popup_opened"),this._setEventListeners()}close(){this._popup.classList.remove("popup_opened"),this._removeEventListeners()}_setEventListeners(){document.addEventListener("keydown",this._handleEscClose),this._popup.addEventListener("click",this._handleClickClose)}_removeEventListeners(){document.removeEventListener("keydown",this._handleEscClose),this._popup.removeEventListener("click",this._handleClickClose)}}class n extends i{constructor(e,t){var s,r;super(e),r=e=>{e.preventDefault(),this._submitHandler(this._getInputValues())},(s="_submitForm")in this?Object.defineProperty(this,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[s]=r,this._submitHandler=t,this._form=this._popup.querySelector(".popup__form"),this._inputList=this._form.querySelectorAll(".popup__input"),this._formValues={}}_getInputValues(){return this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}_setEventListeners(){super._setEventListeners(),this._form.addEventListener("submit",this._submitForm)}_removeEventListeners(){super._removeEventListeners(),this._form.removeEventListener("submit",this._submitForm)}changeSubmitHandler(e){this._submitHandler=e}close(){super.close(),this._form.reset()}}var o,a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},l=document.querySelector(".popup_edit"),c=(document.querySelector(".popup_add"),document.querySelector(".popup__form_edit")),_=document.querySelector(".popup__form_add"),d=l.querySelector(".popup__input_type_name"),u=l.querySelector(".popup__input_type_description"),h=document.querySelector(".profile__title"),p=document.querySelector(".profile__avatar"),m=document.querySelector(".profile__subtitle"),v=document.querySelector(".profile__button-edit"),f=document.querySelector(".profile__button-add"),b=document.querySelector(".profile__avatar-owner"),k=document.querySelector(".popup__form_avatar"),S=(document.querySelector(".profile__avatar"),document.querySelector(".popup__save_edit")),L=document.querySelector(".popup__save_avatar"),C=document.querySelector(".popup__save_add"),y=new class{constructor(e){var t=e.userName,s=e.userAboutMe,r=e.userAvatar;this._userName=t,this._userAboutMe=s,this._userAvatar=r}getUserInfo(){return{profileName:this._userName.textContent,profileAboutme:this._userAboutMe.textContent}}setUserInfo(e){var t=e.profileName,s=e.profileAboutme,r=e.avatarLink;this._userName.textContent=t,this._userAboutMe.textContent=s,r&&(this._userAvatar.src=r)}}({userName:h,userAboutMe:m,userAvatar:p}),E=new n(".popup_edit",(t=>{var s=t.profileName,r=t.profileAboutme;S.textContent="Сохранение...",e.patchProfile(s,r).then((()=>{y.setUserInfo({profileName:s,profileAboutme:r}),E.close()})).catch((e=>console.log(e))).finally((()=>{S.textContent="Сохранить"}))})),g=new n(".popup_delete"),I=new n(".popup_avatar",(t=>{var s=t.avatarLink;L.textContent="Сохранение...",e.patchAvatar(s).then((e=>{y.setUserInfo({profileName:e.name,profileAboutme:e.about,avatarLink:e.avatar}),I.close()})).catch((e=>console.log(e))).finally((()=>{L.textContent="Сохранить"}))}));e.getProfile().then((e=>{y.setUserInfo({profileName:e.name,profileAboutme:e.about,avatarLink:e.avatar}),o=e._id})).catch((e=>console.log(e))),e.getCardSever().then((e=>{e.reverse(),e.forEach((e=>{var t=w({name:e.name,link:e.link,likes:e.likes,id:e._id,userId:o,ownerId:e.owner._id});A.addItem(t)}))})).catch((e=>console.log(e))),v.addEventListener("click",(()=>{N.resetValidation();var e=y.getUserInfo();d.value=e.profileName,u.value=e.profileAboutme,N.setSubmitButtonState(),E.open()}));var q=new class extends i{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__image"),this._popupFigcaption=this._popup.querySelector(".popup__figcaption")}open(e,t){this._popupFigcaption.textContent=e,this._popupImage.src=t,this._popupImage.alt=e,super.open()}}(".popup_big");function w(s){var r=new t(s,".template",{handleCardClick:(e,t)=>{q.open(e,t)}},(t=>{g.open(),g.changeSubmitHandler((()=>{e.deleteCard(t).then((e=>{r.deleteCard(),g.close()})).catch((e=>console.log(e)))}))}),(t=>{r.isLiked()?e.deleteLike(t).then((e=>{r.setLikes(e.likes)})).catch((e=>console.log(e))):e.addLike(t).then((e=>{r.setLikes(e.likes)})).catch((e=>console.log(e)))}));return r.createCard()}var A=new class{constructor(e,t){var s=e.items,r=e.renderer;this._items=s,this._renderer=r,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(){this._items.forEach((e=>{var t=this._renderer(e);this.addItem(t)}))}}({items:[],renderer:w},".elements");A.renderItems();var U=new n(".popup_add",(t=>{var s=t.cardName,r=t.cardLink;C.textContent="Сохранение...",e.postCardSever(s,r).then((e=>{var t=w({name:e.name,link:e.link,likes:e.likes,id:e._id,userId:o,ownerId:e.owner._id});A.addItem(t),U.close()})).catch((e=>console.log(e))).finally((()=>{C.textContent="Создать"}))}));f.addEventListener("click",(function(){x.resetValidation(),x.setSubmitButtonState(),U.open()})),b.addEventListener("click",(function(){V.resetValidation(),V.setSubmitButtonState(),I.open()}));var x=new s(a,_),N=new s(a,c),V=new s(a,k);x.enableValidation(),N.enableValidation(),V.enableValidation()})();