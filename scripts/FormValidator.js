export default class FormValidator{
    constructor(params, formElement){
        this._params = params;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
        this._submitButton = this._formElement.querySelector(this._params.submitButtonSelector);
    }

    _isValid(inputElement){
        return inputElement.validity.valid;
    };

    _isAllValid(){
        return this._inputList.every(this._isValid);
    };

    _toggleButtonState(){
        if(this._isAllValid()){
            this._submitButton.classList.remove(this._params.inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        } else {
            this._submitButton.classList.add(this._params.inactiveButtonClass);
            this._submitButton.setAttribute('disabled', true);
        }
    };

    _setEventListeners(){   
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
          inputElement.addEventListener('input', () => this._handleInput(inputElement));
        });
    };

    _handleInput(formInput){
        if (this._isValid(formInput)){
            this._hideInputError(formInput);
        } else {
            this._showInputError(formInput, formInput.validationMessage);
        }
        this._toggleButtonState();
    };

    _showInputError(formInput, errorMessage){
        const formError = this._formElement.querySelector(`.${formInput.id}-error`);
        formInput.classList.add(this._params.inputErrorClass);
        formError.textContent = errorMessage;
    };
    
    _hideInputError(formInput){
        const formError = this._formElement.querySelector(`.${formInput.id}-error`);
        formInput.classList.remove(this._params.inputErrorClass);
        formError.textContent = '';
    };

    resetValidation (){
        this._inputList.forEach(inputElement => this._hideInputError(inputElement));
        this._toggleButtonState();
    };

    enableValidation(){
        this._setEventListeners();
    };
}