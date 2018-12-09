"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stringifyId = function stringifyId(doc) {
  return _objectSpread({}, doc, {
    _id: doc._id.toString()
  });
};

var prepareMongooseDoc = function prepareMongooseDoc(result) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (Array.isArray(result)) return result.map(function (item) {
    return stringifyId(item._doc);
  });
  return fields.map(function (fieldName) {
    return [fieldName, prepareMongooseDoc(_toConsumableArray(result[fieldName]))];
  }).reduce(function (doc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fieldName = _ref2[0],
        preparedDoc = _ref2[1];

    doc[fieldName] = preparedDoc;
    return doc;
  }, stringifyId(result._doc));
};

module.exports = {
  prepareMongooseDoc: prepareMongooseDoc
};
//# sourceMappingURL=graphql.js.map