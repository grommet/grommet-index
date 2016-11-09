'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('grommet/components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _LinkDown = require('grommet/components/icons/base/LinkDown');

var _LinkDown2 = _interopRequireDefault(_LinkDown);

var _LinkUp = require('grommet/components/icons/base/LinkUp');

var _LinkUp2 = _interopRequireDefault(_LinkUp);

var _Intl = require('grommet/utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('grommet/utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "index-sort";

var Sort = function (_Component) {
  (0, _inherits3.default)(Sort, _Component);

  function Sort(props) {
    (0, _classCallCheck3.default)(this, Sort);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Sort.__proto__ || (0, _getPrototypeOf2.default)(Sort)).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeDirection = _this._onChangeDirection.bind(_this);
    _this.state = _this._stateFromProps(props);
    return _this;
  }

  (0, _createClass3.default)(Sort, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this._stateFromProps(nextProps));
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var parts = props.value.split(':');
      return {
        name: parts[0],
        direction: parts[1]
      };
    }
  }, {
    key: '_onChange',
    value: function _onChange(event) {
      var value = event.target.value;
      this.props.onChange(value + ':' + this.state.direction);
    }
  }, {
    key: '_onChangeDirection',
    value: function _onChangeDirection(direction) {
      this.props.onChange(this.state.name + ':' + direction);
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.props.attributes;

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      var classNames = [CLASS_ROOT];
      if (this.props.className) {
        classNames.push(this.props.className);
      }

      var options = attributes.map(function (attribute) {
        return _react2.default.createElement(
          'option',
          { key: attribute.name, value: attribute.name },
          attribute.label || attribute.name
        );
      });

      var title = _Intl2.default.getMessage(this.context.intl, 'Sort');

      return _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, boxProps, { className: classNames.join(' ') }),
        _react2.default.createElement(
          _Header2.default,
          { size: 'small' },
          title
        ),
        _react2.default.createElement(
          _Box2.default,
          { direction: 'row', justify: 'between', align: 'center' },
          _react2.default.createElement(
            'select',
            { ref: 'sort', value: this.state.name, onChange: this._onChange },
            options
          ),
          _react2.default.createElement(
            _Box2.default,
            { direction: 'row' },
            _react2.default.createElement(_Button2.default, {
              icon: _react2.default.createElement(_LinkDown2.default, {
                colorIndex: 'asc' === this.state.direction ? 'brand' : undefined }),
              onClick: this._onChangeDirection.bind(this, 'asc') }),
            _react2.default.createElement(_Button2.default, {
              icon: _react2.default.createElement(_LinkUp2.default, {
                colorIndex: 'desc' === this.state.direction ? 'brand' : undefined }),
              onClick: this._onChangeDirection.bind(this, 'desc') })
          )
        )
      );
    }
  }]);
  return Sort;
}(_react.Component);

exports.default = Sort;


Sort.propTypes = {
  attributes: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired
  })),
  onChange: _react.PropTypes.func, // name:asc|desc
  value: _react.PropTypes.string // name:asc|desc
};

Sort.defaultProps = {
  value: ''
};

Sort.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];