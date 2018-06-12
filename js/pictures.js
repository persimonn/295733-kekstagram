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

// функция для поиска последовательных значений в интервале min - max
var getPhotosArray = function (min, max) {
  var photosArray = [];
  for (var i = min; i <= max; i++) {
    photosArray.push(i);
  }
  return photosArray;
}


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

var commentsArray = getComments();


// функция для создания массива с объектами
var getPictureArray = function () {
  var photosArray = getPhotosArray(1, 25);
  var pictureObjects = [];

  for (var i = 0; i < totalPictureObjects; i++) {
    var pictureObject = {
      url: 'photos/' + photosArray[i] + '.jpg',
      likes: getRandomArbitraryValue(15, 200),
      commentsCount: getRandomArbitraryValue(1, 6),
      commentsText: getComments(num),
      description: getRandomArrayValue(photoDescriptions)
    };
    var num = pictureObject.commentsCount;  // ПРОБЛЕМА - СДВИГ НА 1 ЦИКЛ!
    pictureObjects.push(pictureObject);
  }
  return pictureObjects;
};

var pictureObjects = getPictureArray();
console.log(pictureObjects);

// поиск блока для вставления фотографий
var picturesBlockElement = document.querySelector('.pictures');

// поиск шаблона
var pictureTemplate = document.querySelector('#picture')
    .content;

// функция для отрисовки шаблона
var getPicture = function (pictureObject) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').setAttribute('src', pictureObject.url);
  pictureElement.querySelector('.picture__stat--comments').textContent = pictureObject.commentsCount;
  pictureElement.querySelector('.picture__stat--likes').textContent = pictureObject.likes;

  return pictureElement;
};

// заполнение шаблонов
var fragment = document.createDocumentFragment();
for (var i = 0; i < pictureObjects.length; i++) {
  fragment.appendChild(getPicture(pictureObjects[i]));
}
picturesBlockElement.appendChild(fragment);


// поиск и отрисовка увеличенной картинки
var enlargedPicture = document.querySelector('.big-picture');
enlargedPicture.classList.remove('hidden');

// замена url, кол-ва лайков и кол-ва комментариев большой картинки
enlargedPicture.querySelector('.big-picture__img > img').setAttribute('src', pictureObjects[0].url);
enlargedPicture.querySelector('.likes-count').textContent = pictureObjects[0].likes;
enlargedPicture.querySelector('.comments-count').textContent = pictureObjects[0].comments;


// удаление текущих комментов и аватарок
var commentsWrapper = enlargedPicture.querySelector('.social__comments');
var removedCommentItem;

while (commentsWrapper.children.length > 0) {
  removedCommentItem = commentsWrapper.querySelector('.social__comment');
  commentsWrapper.removeChild(removedCommentItem);
}


/*
// создание новых комментов и аватарок

for (var m = 1; m <= 6; m++) {
  var commentItem = document.createElement('li');
  commentItem.classList.add('social__comment', 'social__comment--text');
  commentsWrapper.appendChild(commentItem);

  var commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.setAttribute('src', 'img/avatar-' + getRandomArbitraryValue(1, 6) + '.svg');
  commentAvatar.setAttribute('alt', 'Аватар комментатора фотографии');
  commentAvatar.setAttribute('width', '35');
  commentAvatar.setAttribute('height', '35');
  commentItem.appendChild(commentAvatar);

  var commentText = document.createTextNode(pictureObjects[0].commentsText[m]);
  commentItem.appendChild(commentText);
}

// добавление описания фотографии
enlargedPicture.querySelector('.social__caption').textContent = pictureObjects[0].description;

*/


// НОВЫЙ ВАРИАНТ

var getCommentBlockTemplate = function () {
  var commentBlockTemplate = document.createElement('li');
    commentBlockTemplate.classList.add('social__comment', 'social__comment--text');
    commentsWrapper.appendChild(commentBlockTemplate);

    var commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.setAttribute('src', 'img/avatar-' + getRandomArbitraryValue(1, 6) + '.svg');
    commentAvatar.setAttribute('alt', 'Аватар комментатора фотографии');
    commentAvatar.setAttribute('width', '35');
    commentAvatar.setAttribute('height', '35');
    commentBlockTemplate.appendChild(commentAvatar);

    var commentText = document.createTextNode(pictureObjects[0].commentsText[0]);
    commentBlockTemplate.appendChild(commentText);

    return commentBlockTemplate;
}

var commentBlockTemplate = getCommentBlockTemplate();
console.log(commentBlockTemplate);

var getCommentBlock = function (pictureObject) {
  var commentBlock = commentBlockTemplate.cloneNode(true);


  return commentBlock;
};

// заполнение шаблонов
var fragment = document.createDocumentFragment();
for (var i = 0; i < 6; i++) {
  fragment.appendChild(getCommentBlock(pictureObjects[i]));
}
commentsWrapper.appendChild(fragment);

///////////////////////////////////////////



// прячем блоки счётчика комментариев и загрузки новых комментариев
var commentCount = enlargedPicture.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');

var commentsLoad = enlargedPicture.querySelector('.social__loadmore');
commentsLoad.classList.add('visually-hidden');

