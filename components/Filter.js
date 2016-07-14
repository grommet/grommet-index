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

var _CheckBox = require('grommet/components/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _RadioButton = require('grommet/components/RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('grommet/components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Status = require('grommet/components/icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _CaretDown = require('grommet/components/icons/base/CaretDown');

var _CaretDown2 = _interopRequireDefault(_CaretDown);

var _CaretUp = require('grommet/components/icons/base/CaretUp');

var _CaretUp2 = _interopRequireDefault(_CaretUp);

var _FormattedMessage = require('grommet/components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Props = require('grommet/utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = 'index-filter'; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Filter = function (_Component) {
  (0, _inherits3.default)(Filter, _Component);

  function Filter(props) {
    (0, _classCallCheck3.default)(this, Filter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Filter).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeAll = _this._onChangeAll.bind(_this);
    _this._onToggleActive = _this._onToggleActive.bind(_this);

    _this.state = { active: _this.props.active };
    return _this;
  }

  (0, _createClass3.default)(Filter, [{
    key: '_onChange',
    value: function _onChange(value) {
      var exclusive = this.props.exclusive;

      var values = void 0;
      if (exclusive) {
        values = [value];
      } else {
        values = this.props.values.slice(0);
        var index = values.indexOf(value);
        if (-1 === index) {
          values.push(value);
        } else {
          values.splice(index, 1);
        }
      }
      this.props.onChange(values);
    }
  }, {
    key: '_onChangeAll',
    value: function _onChangeAll() {
      this.props.onChange([]);
    }
  }, {
    key: '_onToggleActive',
    value: function _onToggleActive(event) {
      event.preventDefault();
      this.setState({ active: !this.state.active });
    }
  }, {
    key: '_renderChoices',
    value: function _renderChoices() {
      var _this2 = this;

      var _props = this.props;
      var name = _props.name;
      var values = _props.values;
      var choices = _props.choices;
      var all = _props.all;
      var exclusive = _props.exclusive;
      var status = _props.status;

      var Type = exclusive ? _RadioButton2.default : _CheckBox2.default;
      var checkBoxes = choices.map(function (choice) {
        var id = name + '-' + choice.value;
        var checked = -1 !== values.indexOf(choice.value);
        var label = choice.label || choice.value || '';
        if (status) {
          label = _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_Status2.default, { value: choice.value, size: 'small' }),
            ' ',
            label
          );
        }
        return _react2.default.createElement(Type, { key: id,
          id: id, label: label, checked: checked,
          onChange: _this2._onChange.bind(_this2, choice.value) });
      });

      if (all) {
        var label = _react2.default.createElement(_FormattedMessage2.default, { id: 'All', defaultMessage: 'All' });
        checkBoxes.unshift(_react2.default.createElement(Type, { key: name + '-all',
          id: name + '-all', label: label, checked: values.length === 0,
          onChange: this._onChangeAll }));
      }
      return _react2.default.createElement(
        _Box2.default,
        { direction: 'column', pad: { between: 'small' } },
        checkBoxes
      );
    }
  }, {
    key: '_renderSummary',
    value: function _renderSummary() {
      var _props2 = this.props;
      var values = _props2.values;
      var choices = _props2.choices;
      var all = _props2.all;

      var summary = void 0;
      if (values.length === 0) {
        if (all) {
          summary = _react2.default.createElement(_FormattedMessage2.default, { id: 'All', defaultMessage: 'All' });
        }
      } else if (values.length === 1) {
        summary = choices.filter(function (choice) {
          return values.indexOf(choice.value) !== -1;
        }).map(function (choice) {
          return choice.label;
        });
      } else {
        summary = _react2.default.createElement(_FormattedMessage2.default, {
          id: 'FilterSummary',
          defaultMessage: values.length + ' selected values'
        });
      }
      return _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(
          'strong',
          null,
          summary
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var label = _props3.label;
      var inline = _props3.inline;
      var active = this.state.active;

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      var header = _react2.default.createElement(
        _Heading2.default,
        { tag: 'h3' },
        label
      );
      if (!inline) {
        var summary = this._renderSummary();
        var icon = void 0;
        if (active) {
          icon = _react2.default.createElement(_CaretUp2.default, null);
        } else {
          icon = _react2.default.createElement(_CaretDown2.default, null);
        }

        header = _react2.default.createElement(
          _Box2.default,
          { direction: 'row', justify: 'between', align: 'center',
            responsive: false,
            className: CLASS_ROOT + '__header',
            onClick: this._onToggleActive },
          _react2.default.createElement(
            'div',
            null,
            header,
            summary
          ),
          _react2.default.createElement(_Button2.default, { icon: icon, onClick: this._onToggleActive })
        );
      }

      var choices = void 0;
      if (inline || active) {
        choices = this._renderChoices();
      }

      return _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, boxProps, { pad: (0, _extends3.default)({}, boxProps.pad, { between: 'small' }) }),
        header,
        choices
      );
    }
  }]);
  return Filter;
}(_react.Component);

exports.default = Filter;


Filter.propTypes = {
  all: _react.PropTypes.bool,
  choices: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string
  }), _react.PropTypes.string])).isRequired,
  exclusive: _react.PropTypes.bool,
  inline: _react.PropTypes.bool,
  active: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func, // (values)
  status: _react.PropTypes.bool,
  values: _react.PropTypes.arrayOf(_react.PropTypes.string)
};

Filter.defaultProps = {
  all: true,
  inline: true,
  active: false,
  values: []
};
module.exports = exports['default'];