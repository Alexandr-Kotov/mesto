export default class UserInfo{
  constructor({userName, userAboutMe}){
    this._userName = userName;
    this._userAboutMe = userAboutMe;
  }
  getUserInfo(){
    return{
      name: this._userName,
      aboutMe: this._userAboutMe,
    }
  }
  setUserInfo({inputName, inputDescription}){
    this._userName.textContent = inputName;
    this._userAboutMe.textContent = inputDescription;
  }
}