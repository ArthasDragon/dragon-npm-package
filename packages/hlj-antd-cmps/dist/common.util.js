function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NOOP = function NOOP() {};
//约定对应prop的state都以_开头+prop
export var getRes = function getRes(instance, propName) {
  if (propName in instance.props) {
    return instance.props[propName];
  }
  return instance.state["_" + propName];
};
export var isNoProp = function isNoProp(cmp, key) {
  return !(key in cmp.props);
};
export var injectInit = function injectInit(cmp) {
  cmp.props.onInit && cmp.props.onInit({
    getState: function getState(name) {
      return name ? cmp.state[name] : cmp.state;
    }
  });
};
export var getStoreFun = function getStoreFun(store, name) {
  if (!store) {
    return NOOP;
  }
  if (store.__base_store_name__) {
    return store[name] || NOOP;
  }
  console.error("请正确继承@store中对应的store");
  return NOOP;
};
var cloneStaticProps = function cloneStaticProps(targetCmp, sourceCmp) {
  var _ref = sourceCmp || {},
      defaultProps = _ref.defaultProps,
      rest = _objectWithoutProperties(_ref, ["defaultProps"]);

  for (var key in rest) {
    targetCmp[key] = rest[key];
  }
  return defaultProps;
};
export { cloneStaticProps };