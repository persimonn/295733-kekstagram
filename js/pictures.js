'use strict';

// массивы с вводными данными
var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var totalPictureObjects = 25;

// поиск шаблона
var pictureTemplate = document.querySelector('#picture').content;

// поиск блока для вставления фотографий
var picturesBlockElement = document.querySelector('.pictures');

// поиск увеличенной картинки
var enlargedPicture = document.querySelector('.big-picture');

// поиск блока комментариев
var commentsWrapper = enlargedPicture.querySelector('.social__comments');

// функция для поиска случайного значения в массиве
var getRandomArrayValue = function (arr) {
  var randomArrayValue = arr[Math.floor(Math.random() * arr.length)];
  return randomArrayValue;
};

// функция для поиска случайного значения в интервале min - max
var getRandomArbitraryValue = function (min, max) {
  var randomArbitraryValue = Math.round(Math.random() * (max - min) + min);
  return randomArbitraryValue;
};

// функция для поиска последовательных значений в интервале min - max
var getPhotosArray = function (min, max) {
  var photosArray = [];
  for (var i = min; i <= max; i++) {
    photosArray.push(i);
  }
  return photosArray;
};

// функция, возвращающая массив комментариев
var getComments = function (num) {
  var commentsArray = [];
  for (var n = 1; n <= num; n++) {

    // случайное число - кол-во предложений в комментарии
    var sentenceCount = getRandomArbitraryValue(1, 2);

    // cслучайные неповторяющиеся числа - индексы предложений в массиве предложений
    var sentenceIndexes = [];
    while (sentenceIndexes.length < sentenceCount) {
      var sentenceIndex = getRandomArbitraryValue(0, 5);

      if (!sentenceIndexes.includes(sentenceIndex)) {
        sentenceIndexes.push(sentenceIndex);
      }
    }

    // вытаскиеваем из массива предложений нужные предложения
    var commentContent = [];
    for (var j = 0; j < sentenceIndexes.length; j++) {
      var fragmentIndex = sentenceIndexes[j];
      var commentFragment = photoComments[fragmentIndex];
      commentContent.push(commentFragment);
    }

    commentContent = commentContent.join(' ');
    commentsArray.push(commentContent);
  }
  return commentsArray;
};

// функция для создания массива с объектами
var getPictureArray = function () {
  getComments();
  var photosArray = getPhotosArray(1, 25);
  var pictureObjects = [];

  for (var i = 0; i < totalPictureObjects; i++) {
    var pictureObject = {
      url: 'photos/' + photosArray[i] + '.jpg',
      likes: getRandomArbitraryValue(15, 200),
      commentsCount: getRandomArbitraryValue(1, 6),
      description: getRandomArrayValue(photoDescriptions)
    };
    pictureObjects.push(pictureObject);
  }

  // добавляем к объектам свойства - массивы с комментариями
  for (var t = 0; t < pictureObjects.length; t++) {
    pictureObjects[t].commentsArray = getComments(pictureObjects[t].commentsCount);
  }

  return pictureObjects;
};

// функция для отрисовки шаблона
var getPicture = function (pictureObject) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').setAttribute('src', pictureObject.url);
  pictureElement.querySelector('.picture__stat--comments').textContent = pictureObject.commentsCount;
  pictureElement.querySelector('.picture__stat--likes').textContent = pictureObject.likes;

  return pictureElement;
};

// заполнение шаблонов
var renderPictures = function () {
  // var picturesBlockElement = findPicturesBlockElement();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureObjects.length; i++) {
    fragment.appendChild(getPicture(pictureObjects[i]));
  }
  picturesBlockElement.appendChild(fragment);
};

// отрисовка увеличенной картинки
var getBigPicture = function () {
  enlargedPicture.classList.remove('hidden');
};

// замена url, кол-ва лайков и кол-ва комментариев большой картинки
var getBigPictureData = function (pictureIndex) {
  enlargedPicture.querySelector('.big-picture__img > img').setAttribute('src', pictureObjects[pictureIndex].url);
  enlargedPicture.querySelector('.likes-count').textContent = pictureObjects[pictureIndex].likes;
  enlargedPicture.querySelector('.comments-count').textContent = pictureObjects[pictureIndex].comments;
};

// удаление текущих комментов и аватарок
var removeBigPictureComments = function () {
  var removedCommentItem;
  while (commentsWrapper.children.length > 0) {
    removedCommentItem = commentsWrapper.querySelector('.social__comment');
    commentsWrapper.removeChild(removedCommentItem);
  }
};

// создание новых комментов и аватарок
var getCommentBlock = function (pictureIndex) {
  for (var c = 0; c < pictureObjects[pictureIndex].commentsArray.length; c++) {
    var commentBlock = document.createElement('li');
    commentBlock.classList.add('social__comment', 'social__comment--text');
    commentsWrapper.appendChild(commentBlock);

    var commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.setAttribute('src', 'img/avatar-' + getRandomArbitraryValue(1, 6) + '.svg');
    commentAvatar.setAttribute('alt', 'Аватар комментатора фотографии');
    commentAvatar.setAttribute('width', '35');
    commentAvatar.setAttribute('height', '35');
    commentBlock.appendChild(commentAvatar);

    var commentText = document.createTextNode(pictureObjects[pictureIndex].commentsArray[c]);
    commentBlock.appendChild(commentText);
  }
  return commentBlock;
};

// добавление описания фотографии
var getPictureDescription = function () {
  enlargedPicture.querySelector('.social__caption').textContent = pictureObjects[pictureIndex].description;
};

// прячем блоки счётчика комментариев и загрузки новых комментариев
var hideCommentRelatedItems = function () {
  // var enlargedPicture = findEnlargedPicture();
  var commentCount = enlargedPicture.querySelector('.social__comment-count');
  commentCount.classList.add('visually-hidden');

  var commentsLoad = enlargedPicture.querySelector('.social__loadmore');
  commentsLoad.classList.add('visually-hidden');
};

var pictureIndex = 24;

var pictureObjects = getPictureArray();
renderPictures();
/*
getBigPicture();
getBigPictureData(pictureIndex);
removeBigPictureComments();
getCommentBlock(pictureIndex);
getPictureDescription(pictureIndex);
hideCommentRelatedItems();
*/


// 1. загрузка нового изображения
var uploadOpen = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadBlock =document.querySelector('.img-upload__overlay');

uploadOpen.addEventListener('change', function(evt) {
  uploadBlock.classList.remove('hidden');



  document.addEventListener('keydown', function(evt) {
    if (evt. keyCode === 27) {
      uploadBlock.classList.add('hidden');
      uploadOpen.value = '';
    }
  })
});

uploadClose.addEventListener('click', function() {
  uploadBlock.classList.add('hidden');
  uploadOpen.value = '';

});

// 2. редактирование изображения

// 2.1 масштаб

var resizePlus = document.querySelector('.resize__control--plus');
var resizeMinus = document.querySelector('.resize__control--minus');
var resizeValue = document.querySelector('.resize__control--value');
var uploadPreview = document.querySelector('.img-upload__preview img');

var imageSizeValue = 100;
resizeValue.value = imageSizeValue + '%';

var calculateTransform = function() {
  var imageSizeScale = imageSizeValue * 0.01;
  return 'transform: scale(' + imageSizeScale + ')';
};

uploadPreview.setAttribute('style', calculateTransform());

resizeMinus.addEventListener('click', function () {
  if (imageSizeValue >= 50) {
    imageSizeValue = imageSizeValue - 25;
    resizeValue.value = imageSizeValue + '%';
    uploadPreview.style = calculateTransform();
  };
});

resizePlus.addEventListener('click', function () {
  if (imageSizeValue <= 75) {
    imageSizeValue = imageSizeValue + 25;
    resizeValue.value = imageSizeValue + '%';
    uploadPreview.style = calculateTransform();
  };
});


// 2.2 наложение эффекта

document.querySelector('#effect-heat').removeAttribute('checked');
var activeClass;

document.addEventListener('click', function() {
  var effectButtons = document.querySelectorAll('.effects__radio');
  var activeEffectButton = null;

  var getEffectClassName = function() {
    return 'effects__preview--' + document.activeElement.value;
  };

  for (var k = 0; k < effectButtons.length; k++) {
    if (effectButtons[k].checked) {
      activeEffectButton = effectButtons[k];
    }
  }

  if (activeEffectButton) {
    uploadPreview.className = ' ';
    uploadPreview.classList.add(getEffectClassName());
    activeClass = uploadPreview.className;
  }
});

console.log(activeClass);

// слайдер - передвигание ползунка

var scalePin = document.querySelector('.scale__pin');
var scale = document.querySelector('.scale');
var scaleLevel = document.querySelector('.scale__level');
var scaleValue = document.querySelector('.scale__value');
var MAX_LEFT = parseFloat(window.getComputedStyle(scale).width) - 20 * 2;

scalePin.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var distance = moveEvt.clientX - startCoordsX;

    startCoordsX = moveEvt.clientX;

    if (scalePin.offsetLeft < 0) {
      scalePin.style.left = 0;
    } else if (scalePin.offsetLeft > MAX_LEFT) {
      scalePin.style.left = MAX_LEFT + 'px';
    } else {
      scalePin.style.left = (scalePin.offsetLeft + distance) + 'px';
    };

    scaleLevel.style.width = scalePin.style.left;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    console.log(scalePin.style.left);

    scaleValue.value = 100;

    // изменение интенсивности эффекта
    var calculateScaleValue = function () {
      scaleValue.value = Math.round(parseInt(scalePin.style.left.replace('px', '')) * 100 / 455);
      return scaleValue.value;
      console.log (scaleValue.value);
    }
    calculateScaleValue();

    var calculateGrayscaleIntensity = function () {
      var grayscaleIntensityLevel = (scaleValue.value * 0.01).toFixed(1);
      return grayscaleIntensityLevel;
    }

    var grayscaleIntensityLevel = calculateGrayscaleIntensity();
    console.log(grayscaleIntensityLevel);
/*
    var changeEffectIntensity = function () {                          // НЕ РАБОТАЕТ
      if (activeClass == 'effect-chrome') {
        console.log('chrome is active');
      }
    };
    changeEffectIntensity()
*/

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


/*
Интенсивность эффекта регулируется перемещением ползунка в слайдере .scale__pin.
Уровень эффекта записывается в поле .scale__value. При изменении уровня интенсивности
эффекта, CSS-стили элемента .img-upload__preview обновляются следующим образом:

Для эффекта «Хром» — filter: grayscale(0..1);
Для эффекта «Сепия» — filter: sepia(0..1);
Для эффекта «Марвин» — filter: invert(0..100%);
Для эффекта «Фобос» — filter: blur(0..3px);
Для эффекта «Зной» — filter: brightness(1..3).
При выборе эффекта «Оригинал» слайдер скрывается.
При переключении эффектов, уровень насыщенности сбрасывается
до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны
обновляться.
*/
