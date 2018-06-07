'use strict';

// массивы с вводными данными
var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var totalPictureObjects = 25;

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

// функция для поиска случайного неповторяющегося значения в интервале min - max
var getRandomNonRepetitiveValue = function(shuffleMin, shuffleMax) {
  var shuffledArray = [];
  for (var i = shuffleMin; i <= shuffleMax; i++) {
    shuffledArray.push(i);
  }

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }
return shuffledArray[i];
};

// функция для создания массива с объектами
var getPictureArray = function () {
  var pictureObjects = [];
  for (var i = 0; i < totalPictureObjects; i++) {
    var pictureObject = {};
    pictureObject.url = 'photos/' + getRandomNonRepetitiveValue(1, 25) + '.jpg';
    pictureObject.likes = getRandomArbitraryValue(15, 200);
    pictureObject.comments = getRandomArrayValue(photoComments);
    pictureObject.description = getRandomArrayValue(photoDescriptions);
    pictureObjects.push(pictureObject);
  }
  return pictureObjects;
};

var pictureObjects = getPictureArray();


//поиск блока для вставления фотографий
var picturesBlockElement = document.querySelector('.pictures');

// поиск шаблона
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link'); // правильно??

// функция для отрисовки шаблона
var renderPicture = function (pictureObject) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').setAttribute('src', pictureObject.url); // как засунуть в src???
  pictureElement.querySelector('.picture__stat--comments').textContent = pictureObject.comments;
  pictureElement.querySelector('.picture__stat--likes').textContent = pictureObject.likes;

  return pictureElement;
};

// заполнение шаблонов
var fragment = document.createDocumentFragment();
for (var i = 0; i < pictureObjects.length; i++) {
  fragment.appendChild(renderPicture(pictureObjects[i]));
}
picturesBlockElement.appendChild(fragment);

// поиск и отрисовка увеличенной картики
//   var enlargedImage = document.querySelector('.big-picture');
//   enlargedImage.classList.remove('hidden');

