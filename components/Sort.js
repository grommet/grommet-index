'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "index-sort";

var Sort = function (_Component) {
  _inherits(Sort, _Component);

  function Sort(props) {
    _classCallCheck(this, Sort);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sort).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeDirection = _this._onChangeDirection.bind(_this);
    _this.state = _this._stateFromProps(props);
    return _this;
  }

  _createClass(Sort, [{
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

      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));
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

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, other, { className: classNames.join(' ') }),
        _react2.default.createElement(
          _Header2.default,
          { size: 'small' },
          'Sort'
        ),
        _react2.default.createElement(
          _Box2.default,
          { direction: 'row', justify: 'between', align: 'center' },
          _react2.default.createElement(
            'select',
            { ref: 'sort', value: this.state.name, className: 'flex',
              onChange: this._onChange },
            options
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              _Button2.default,
              { type: 'icon',
                onClick: this._onChangeDirection.bind(this, 'asc') },
              _react2.default.createElement(_LinkDown2.default, { colorIndex: 'asc' === this.state.direction ? 'brand' : undefined })
            ),
            _react2.default.createElement(
              _Button2.default,
              { type: 'icon',
                onClick: this._onChangeDirection.bind(this, 'desc') },
              _react2.default.createElement(_LinkUp2.default, { colorIndex: 'desc' === this.state.direction ? 'brand' : undefined })
            )
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
module.exports = exports['default'];