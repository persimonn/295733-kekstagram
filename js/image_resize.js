'use strict';

(function () {
// 2. редактирование изображения

// 2.1 масштаб

var resizePlus = document.querySelector('.resize__control--plus');
var resizeMinus = document.querySelector('.resize__control--minus');
var resizeValue = document.querySelector('.resize__control--value');
window.uploadPreview = document.querySelector('.img-upload__preview img');

var imageSizeValue = 100;
resizeValue.value = imageSizeValue + '%';

var calculateTransform = function () {
  var imageSizeScale = imageSizeValue * 0.01;
  return 'transform: scale(' + imageSizeScale + ')';
};

uploadPreview.setAttribute('style', calculateTransform());

resizeMinus.addEventListener('click', function () {
  if (imageSizeValue >= 50) {
    imageSizeValue = imageSizeValue - 25;
    resizeValue.value = imageSizeValue + '%';
    uploadPreview.style = calculateTransform();
  }
});

resizePlus.addEventListener('click', function () {
  if (imageSizeValue <= 75) {
    imageSizeValue = imageSizeValue + 25;
    resizeValue.value = imageSizeValue + '%';
    uploadPreview.style = calculateTransform();
  }
});

})();
