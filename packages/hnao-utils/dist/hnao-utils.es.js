var debounce = function debounce(fn, delay) {
  var timer = null;
  return function () {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    var aaa = function aaa() {
      fn.apply(undefined, rest);
    };
    if (timer) {
      clearTimeout(timer);
    }
    // timer && clearTimeout(timer)
    timer = setTimeout(aaa, delay || 300);
  };
};

export { debounce };
