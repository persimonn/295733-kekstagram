'use strict';

(function () {

  // 1. загрузка нового изображения
  var uploadOpen = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadBlock = document.querySelector('.img-upload__overlay');

  uploadOpen.addEventListener('change', function () {
    uploadBlock.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (document.activeElement) {
          if (document.activeElement.name !== 'hashtags' && document.activeElement.name !== 'description') {
            uploadBlock.classList.add('hidden');
            uploadOpen.value = '';
          }
        } else {
          uploadBlock.classList.add('hidden');
          uploadOpen.value = '';
        }
      }
    });
  });

  uploadClose.addEventListener('click', function () {
    uploadBlock.classList.add('hidden');
    uploadOpen.value = '';
  });

})();
