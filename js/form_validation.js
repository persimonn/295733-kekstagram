'use strict';

(function () {

  // 2.3 хэш-тэги

  var hashtagInput = document.querySelector('.text__hashtags');
  var imageUploadButton = document.querySelector('.img-upload__submit');

  imageUploadButton.addEventListener('click', function () {

    var hashtagsString = hashtagInput.value;
    var checkHashtags = function () {
      var hashtagsArray = hashtagsString.toLowerCase().split(' ');

      var hashtagPattern = new RegExp('^#[A-Za-zА-Яа-я0-9_]{1,19}$');

      var checkedHashtagsArray = [];

      if (hashtagsArray.length > 5) {
        hashtagInput.setCustomValidity('Максимум 5 хэш-тегов.');
        hashtagInput.style.border = '2px solid red';
      } else {
        for (var i = 0; i < hashtagsArray.length; i++) {
          var currentHashtag = hashtagsArray[i];
          if (currentHashtag.length < 2) {
            hashtagInput.setCustomValidity('Хэш-тег должен состоять минимум из 2-х символов, включая символ #.');
            hashtagInput.style.border = '2px solid red';
          } else if (currentHashtag.length > 20) {
            hashtagInput.setCustomValidity('Хэш-тег должен состоять максимум из 20-и символов, включая символ #.');
            hashtagInput.style.border = '2px solid red';
          } else if (!currentHashtag.match(hashtagPattern)) {
            hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа # и состоять и букв и цифр. Хэш-тег может содержать только один символ #.');
            hashtagInput.style.border = '2px solid red';
          } else if (checkedHashtagsArray.indexOf(currentHashtag) > -1) {
            hashtagInput.setCustomValidity('Хэш-теги не должны повторяться.');
            hashtagInput.style.border = '2px solid red';
          } else {
            checkedHashtagsArray.push(currentHashtag);
            hashtagInput.setCustomValidity('');
          }
        }
      }
      return checkedHashtagsArray;
    };
    checkHashtags();
  });


  // 2.4 комментарии

  var descriptionInput = document.querySelector('.text__description');

  descriptionInput.addEventListener('invalid', function () {
    if (descriptionInput.validity.tooLong) {
      descriptionInput.setCustomValidity('Комментарий должен состоять максимум из 140 символов.');
      hashtagInput.style.border = '2px solid red';
    } else if (descriptionInput.validity.typeMismatch) {
      descriptionInput.setCustomValidity('Поле ввода комментариев.');
      hashtagInput.style.border = '2px solid red';
    } else {
      descriptionInput.setCustomValidity('');
    }
  });

})();
