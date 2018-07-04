'use strict';

(function () {

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
window.getRandomArbitraryValue = function (min, max) {
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

 window.pictureObjects = getPictureArray();

})();
