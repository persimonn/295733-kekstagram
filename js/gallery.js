'use strict';

(function () {

  // функция для отрисовки шаблона
  var getPicture = function (pictureObject) {
    var pictureTemplate = document.querySelector('#picture').content;

    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').setAttribute('src', pictureObject.url);
    pictureElement.querySelector('.picture__stat--comments').textContent = pictureObject.commentsCount;
    pictureElement.querySelector('.picture__stat--likes').textContent = pictureObject.likes;

    return pictureElement;
  };

  // заполнение шаблонов
  var renderPictures = function () {
    window.picturesBlockElement = document.querySelector('.pictures');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictureObjects.length; i++) {
      fragment.appendChild(getPicture(pictureObjects[i]));
    }
    picturesBlockElement.appendChild(fragment);
  };

  renderPictures();
})();
