'use strict';

(function () {

  var enlargedPicture = document.querySelector('.big-picture');
  var commentsWrapper = enlargedPicture.querySelector('.social__comments');
  var enlargedPictureClose = enlargedPicture.querySelector('#picture-cancel');
  var pictureIndex = null;

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
    var commentCount = enlargedPicture.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');

    var commentsLoad = enlargedPicture.querySelector('.social__loadmore');
    commentsLoad.classList.add('visually-hidden');
  };


  // открытие окна фотографии в увеличенном виде
  picturesBlockElement.addEventListener('click', function (evt) {
    var targetPicture = evt.target;
    if (targetPicture && targetPicture.className == 'picture__img') {
      var targetSource = targetPicture.src;
      for (var i = 0; i < pictureObjects.length; i++) {
        if (targetSource.includes(pictureObjects[i].url)) {
          pictureIndex = pictureObjects.indexOf(pictureObjects[i]);

        }
      }
    }
    getBigPicture();
    getBigPictureData(pictureIndex);
    removeBigPictureComments();
    getCommentBlock(pictureIndex);
    getPictureDescription(pictureIndex);
    hideCommentRelatedItems();

    // закрытие окна фотографии в увеличенном виде с помощью кнопки esc
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        enlargedPicture.classList.add('hidden');
      }
    });
  })


  // закрытие окна фотографии в увеличенном виде с помощью кнопки закрытия

  enlargedPictureClose.addEventListener('click', function() {
    enlargedPicture.classList.add('hidden')
  });


})();
