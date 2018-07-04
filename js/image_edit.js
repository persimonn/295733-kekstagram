'use strict';

(function () {

  // 2.2 наложение эффекта

  document.querySelector('#effect-heat').removeAttribute('checked');

  document.addEventListener('change', function () {
    var effectButtons = document.querySelectorAll('.effects__radio');
    var activeEffectButton = null;

    var getEffectClassName = function () {
      return 'effects__preview--' + document.activeElement.value;
    };

    var getActiveClass = function () {
      for (var k = 0; k < effectButtons.length; k++) {
        if (effectButtons[k].checked) {
          activeEffectButton = effectButtons[k];
        }
      }

      if (activeEffectButton) {
        uploadPreview.className = ' ';
        uploadPreview.style.filter = 'none';
        uploadPreview.classList.add(getEffectClassName());
        var activeClass = uploadPreview.className;
      }

      return activeClass;
    };

    var activeClass = getActiveClass();

    // слайдер - функции
    var scalePin = document.querySelector('.scale__pin');
    var scale = document.querySelector('.scale');
    var scaleLevel = document.querySelector('.scale__level');
    var scaleValue = document.querySelector('.scale__value');
    var scaleLine = document.querySelector('.scale__line');

    var MAX_LEFT = parseFloat(window.getComputedStyle(scale).width) - parseFloat(window.getComputedStyle(scaleLine).left) - parseFloat(window.getComputedStyle(scaleLine).right);

    var calculateScaleValue = function () {
      scaleValue.value = Math.round(parseFloat(scalePin.style.left) * 100 / MAX_LEFT);
      return scaleValue.value;
    };

    var filterProperty = null;
    var calculateIntensity = function () {
      if (activeClass === 'effects__preview--chrome') {
        var chromeLevel = (scaleValue.value * 0.01).toFixed(1);
        filterProperty = 'filter: grayscale(' + chromeLevel + ')';
      } else if (activeClass === 'effects__preview--sepia') {
        var sepiaLevel = (scaleValue.value * 0.01).toFixed(1);
        filterProperty = 'filter: sepia(' + sepiaLevel + ')';
      } else if (activeClass === 'effects__preview--marvin') {
        var marvinLevel = scaleValue.value + '%';
        filterProperty = 'filter: invert(' + marvinLevel + ')';
      } else if (activeClass === 'effects__preview--phobos') {
        var fobosLevel = (scaleValue.value * 0.03).toFixed(1) + 'px';
        filterProperty = 'filter: blur(' + fobosLevel + ')';
      } else if (activeClass === 'effects__preview--heat') {
        var heatLevel = (1 + scaleValue.value * 0.02).toFixed(1);
        filterProperty = 'filter: brightness(' + heatLevel + ')';
      }
      return filterProperty;
    };

    var changeEffectIntensity = function () {
      uploadPreview.style = calculateIntensity();
    };

    // скрываем слайдер, если не применен ни один эффект
    if (activeClass === 'effects__preview--none') {
      scale.classList.add('hidden');
    } else {
      scale.classList.remove('hidden');
    }

    // изначальное значение ползунка и интенсивности эффекта = 100%
    scalePin.style.left = MAX_LEFT + 'px';
    scaleLevel.style.width = scalePin.style.left;
    calculateScaleValue();
    changeEffectIntensity();

    // слайдер - передвиганиеползунка
    scalePin.addEventListener('mousedown', function (evt) {
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
        }

        scaleLevel.style.width = scalePin.style.left;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        // изменение интенсивности эффекта
        calculateScaleValue();
        changeEffectIntensity();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  });

})();
