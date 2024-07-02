export default class Card{

    //принимает в конструктор её данные и селектор её template-элемента;
    constructor(name, link, templateSelector, handleCardClick){
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;

    _createCard(){
        this._card = document.querySelector(this._templateSelector).content.cloneNode(true);
        this._likeButton =  this._card.querySelector('.card__like-button');
        this._trashButton = this._card.querySelector('.card__trash-button');
        this._image = this._card.querySelector('.card__picture');
        this._title = this._card.querySelector('.card__title');
    }

    _setEventListeners(){
        this._likeButton.addEventListener('click', this._toggleLikeButton);
        this._trashButton.addEventListener('click', this._handleCardDelete);
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));  
    };

    _fillData(){
        this._image.src = this._link;
        this._image.alt = this._name;
        this._title.textContent = this._name;
    };

    //содержит приватные методы для каждого обработчика;
    _toggleLikeButton(evt){
        evt.target.classList.toggle('card__like-button_active');
    };

    _handleCardDelete(evt){
        evt.target.closest('.card').remove();
    };

    //содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
    generateCard(){
        this._createCard();
        this._fillData();
        this._setEventListeners();
        return this._card;
    };
}
