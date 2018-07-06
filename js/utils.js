'use strict';

(function () {
  window.utils = {

    // функция для поиска случайного значения в интервале min - max
    getRandomArbitraryValue: function (min, max) {
      var randomArbitraryValue = Math.round(Math.random() * (max - min) + min);
      return randomArbitraryValue;
    },

    ESC_KEYCODE: 27
  }

})()
