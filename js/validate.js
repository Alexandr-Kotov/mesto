const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) =>{
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(errorMessageClass);
    input.classList.add(inputErrorClass);
};

const hideError = (form, input, errorMessageClass, inputErrorClass) =>{
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(errorMessageClass);
    input.classList.remove(inputErrorClass);
};

const hasInvalidInput = (inputs) =>{
    return Array.from(inputs).some((el) => !el.validity.valid);
};

const toogleButtonError = (inputs, button, inactiveButtonClass) =>{
    if (hasInvalidInput(inputs)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
}

const checkIfInputValid = (form, input, { inputErrorClass, errorClass }) => {
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, errorClass, inputErrorClass)
    } else{
        hideError(form, input,  errorClass, inputErrorClass);
    };
};


const setInputListerners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) =>{
    const inputs = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector)

    inputs.forEach((input) =>{
        input.addEventListener('input', () =>{
            checkIfInputValid(form, input, rest);
            toogleButtonError(inputs, submitButton, inactiveButtonClass,)
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
        form.addEventListener('submit', (event) =>{
            event.preventDefault();
        });

        setInputListerners(form, rest);

    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}); 