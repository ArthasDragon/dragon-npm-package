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
    timer = setTimeout(aaa, delay || 1000);
  };
};

var getUrlParams = function getUrlParams(name, def) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.href;

  var reg = new RegExp('(^|&)' + name + '=([^&]*?)(&|$|#)', 'g');
  var reg1 = new RegExp('(^|&)' + name + '=([^&]*?)(&|$|#)');
  var searchArr = url.split('?');

  var result = null;
  searchArr.forEach(function (item) {
    if (item.match(reg)) {
      item.match(reg).forEach(function (mat) {
        result = mat.match(reg1) || result;
      });
    }
  });
  if (result) {
    return unescape(result[2]);
  }
  return def || '';
};

var isPhone = function isPhone(phone) {
  return (/^1[0-9]{10}$/.test(phone + '')
  );
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var isPlainObj = function isPlainObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
var isFunc = function isFunc(obj) {
  return typeof obj === 'function';
};
var isNum = function isNum(value, isStrict) {
  if (!isStrict) {
    value = +value;
  }
  return typeof value === 'number' && !Number.isNaN(value);
};
var isStr = function isStr(obj) {
  return typeof obj === 'string';
};
var isBool = function isBool(obj) {
  return typeof obj === 'boolean';
};
var isArr = function isArr(obj) {
  return Array.isArray(obj);
};
var isUNN = function isUNN(obj) {
  return obj === null || obj === undefined || Number.isNaN(obj);
};
var isSymbol = function isSymbol(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'symbol';
};
var isHljKey = function isHljKey(key) {
  return isSymbol(key) && key.toString() === 'Symbol(__hljKey__)';
};
var isEmptyObj = function isEmptyObj(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
};
var isEmptyArr = function isEmptyArr(obj) {
  return isArr(obj) && obj.length === 0;
};
var isPromise = function isPromise(obj) {
  return isFunc(obj) && obj.then;
};

export { debounce, getUrlParams, isPlainObj, isFunc, isNum, isStr, isBool, isArr, isUNN, isSymbol, isHljKey, isEmptyObj, isEmptyArr, isPromise, isPhone };
