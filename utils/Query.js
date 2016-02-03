'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StringConvert = require('grommet/utils/StringConvert');

var _StringConvert2 = _interopRequireDefault(_StringConvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TRACE_PARSING = false;
// don't convert timestamps, MAC addresses, or WWNs to attribute:value
// This pattern matches the name: ^[^\d:'"\s]{2}[^:'"\s]+
// We allow for the value to be optionally be quoted. So, we repeat the name
// pattern three times, once for single quoted value, once for double quoted
// value, and lastly with no quotes.
// We don't build this programmatically for better performance.
var ATTRIBUTE_PATTERN = /^[^\d:'"\s]{1}[^:'"\s]*:'[^']+'|^[^\d:'"\s]{1}[^:'"\s]*:"[^"]+"|^[^\d:'"\s]{1}[^:'"\s]*:[^'"\s]+/;
// allow for text to contain quotes
var TEXT_PATTERN = /^[^'"\s]+|^'[^']+'|^"[^"]+"/;

function addTerm(expression, term) {
  if (!expression.left) {
    expression.left = term;
  } else if (!expression.right) {
    expression.right = term;
    if (!expression.op) {
      if (term.name && expression.left && expression.left.name === term.name) {
        setOp(expression, 'OR');
      } else {
        setOp(expression, 'AND');
      }
    }
  } else {
    // We already have a left and a right.
    // If the right is a simple term, convert it to an expression.
    if (!expression.right.left) {
      var expression2 = {};
      addTerm(expression2, expression.right);
      expression.right = expression2;
    }
    // Add the term to the right expression.
    addTerm(expression.right, term);
  }
}

function setOp(expression, op) {
  if (!expression.op) {
    expression.op = op;
  } else {
    // already have an op, nest
    // If the right is a simple term, convert it to an expression.
    if (!expression.right.left) {
      var expression2 = {};
      addTerm(expression2, expression.right);
      expression2.op = op;
      expression.right = expression2;
    } else {
      // right is an expression, add to it
      setOp(expression.right, op);
    }
  }
}

// parser helper functions

function traceParsing(message) {
  if (TRACE_PARSING) {
    console.log('!!! ' + message);
  }
}

function parseSpace(text) {
  return ' ' === text[0] ? 1 : 0;
}

function parseParens(text, expression) {
  var result = 0;
  if ('(' === text[0]) {
    traceParsing('--begin-paren--');
    // TODO: This doesn't handle nested parens yet!
    var endIndex = text.indexOf(')');
    var subExpression = parse(text.slice(1, endIndex));
    traceParsing('--end-paren--');
    addTerm(expression, subExpression);
    result = endIndex + 1;
  }
  return result;
}

function parseAnd(text, expression) {
  var result = 0;
  if ('AND' === text.slice(0, 3)) {
    traceParsing('--and--');
    result = 3;
    setOp(expression, 'AND');
  }
  return result;
}

function parseOr(text, expression) {
  var result = 0;
  if ('OR' === text.slice(0, 2)) {
    traceParsing('--or--');
    result = 2;
    setOp(expression, 'OR');
  }
  return result;
}

function parseNot(text, expression) {
  var result = 0;
  if ('NOT' === text.slice(0, 3)) {
    traceParsing('--not--');
    result = 3;
    expression.notNext = true;
  }
  return result;
}

function parseAttribute(text, expression) {
  var result = 0;
  var matches = text.match(ATTRIBUTE_PATTERN);
  if (matches) {
    traceParsing('--attribute--');
    // attribute:value
    result = matches[0].length;
    var parts = matches[0].split(':');
    var term = {
      text: matches[0],
      name: parts[0],
      value: _StringConvert2.default.unquoteIfNecessary(parts[1]),
      not: expression.notNext
    };
    delete expression.notNext;
    addTerm(expression, term);
  }
  return result;
}

function parseText(text, expression) {
  var result = 0;
  var matches = text.match(TEXT_PATTERN);
  if (matches) {
    traceParsing('--text--');
    result = matches[0].length;
    var term = {
      text: _StringConvert2.default.unquoteIfNecessary(matches[0]),
      not: expression.notNext
    };
    delete expression.notNext;
    addTerm(expression, term);
  }
  return result;
}

function parse(text) {

  var parsers = [parseSpace, parseParens, parseAnd, parseOr, parseNot, parseAttribute, parseText];
  var remaining = text;
  var expression = {};
  traceParsing('--parse-- ' + text);

  while (remaining.length > 0) {
    var priorLength = remaining.length;
    for (var i = 0; i < parsers.length; i += 1) {
      var parser = parsers[i];
      var length = parser(remaining, expression);
      if (length > 0) {
        remaining = remaining.slice(length);
        traceParsing('  parsed ' + length + ' leaving ' + remaining);
        break;
      }
    }
    if (remaining.length === priorLength) {
      throw 'Syntax error at character ' + (text.length - priorLength) + ': ' + remaining[0];
    }
  }

  traceParsing('--parsed-- ' + "\n" + expression);

  return expression;
}

var Query = function () {
  function Query(string) {
    _classCallCheck(this, Query);

    this.text = string || '';
    this.parsedTree = undefined;
    this.parseErrors = undefined;
  }

  _createClass(Query, [{
    key: 'error',
    value: function error() {
      this.tree(); // to trigger generating it
      return this.parseErrors;
    }
  }, {
    key: 'set',
    value: function set(string) {
      this.text = string || '';
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.text;
    }
  }, {
    key: 'tree',
    value: function tree() {
      if (!this.parsedTree) {
        try {
          this.parsedTree = parse(this.text);
        } catch (e) {
          this.parseErrors = e;
        }
      }
      return this.parsedTree;
    }
  }]);

  return Query;
}();

exports.default = Query;
;
module.exports = exports['default'];