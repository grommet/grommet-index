'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var query = new Query();
  query.initialize(string);
  return query;
};

var _StringConvert = require('grommet/utils/StringConvert');

var _StringConvert2 = _interopRequireDefault(_StringConvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // Parse the query text into a boolean logic tree.
// function parseX(text) {
//   text = text || '';
//   var result = [];
//   // strip leading and trailing whitespace
//   ///var text = text.replace(/^\s+|\s+$/g, '');
//   // split into tokens
//   var index = 0;
//   var endIndex;
//   var token;
//   var value;
//   var rest;
//   var matches;
//   var parts;
//   var op = null;
//
//   // TODO: handle nested parentheses, handle quoted parentheses
//
//   while (index < text.length) {
//
//     token = null;
//     if (' ' === text[index]) { // space
//       index += 1;
//     } else if ('(' === text[index]) { // begin paren
//       endIndex = text.indexOf(')', index);
//       token = tokenize(text.slice(index + 1, endIndex));
//       index = endIndex + 1;
//     } else if ('AND' === text.slice(index, index + 3)) { // AND
//       op = 'AND';
//       index += 3;
//     } else if ('OR' === text.slice(index, index + 2)) { // OR
//       op = 'OR';
//       index += 2;
//     } else if ('NOT' === text.slice(index, index + 3)) { // NOT
//       op = 'NOT';
//       index += 3;
//     } else {
//       rest = text.slice(index, text.length);
//       matches = rest.match(/^\w+:[^'"\s]+|^\w+:'[^']+'|^\w+:"[^"]+"/);
//       if (matches) { // attribute:value
//         endIndex = index + matches[0].length;
//         parts = matches[0].split(':');
//         value = StringConvert.unquoteIfNecessary(parts[1]);
//         token = {attribute: parts[0], value: value, text: text.slice(index, endIndex)};
//         index = endIndex + 1;
//       } else { // plain text, possibly quoted
//         matches = rest.match(/^[^'"\s]+|^'[^']+'|^"[^"]+"/);
//         if (matches) { // text
//           endIndex = index + matches[0].length;
//           token = {text: text.slice(index, endIndex)};
//           index = endIndex + 1;
//         } else {
//           // Hmm... must be syntatically invalid, perhaps a single quote
//           token = {text: rest, error: 'Syntax error'};
//           index = index + rest.length;
//         }
//       }
//     }
//
//     if (token) {
//       if (Array.isArray(token)) {
//         token = {tokens: token};
//       }
//       if (op) {
//         token.op = op;
//         op = null;
//       }
//       token.index = result.length;
//       result.push(token);
//     }
//   }
//
//   return result;
// }

// // An attribute term in an Expression.
// function AttributeTerm (text) {
//   this._not = false;
//
//   var parts = text.toLowerCase().split(':');
//   this._name = parts[0];
//   this._value = StringConvert.unquoteIfNecessary(parts[1]);
//
//   this.not = function (not) {
//     this._not = not;
//   };
//
//   this.isRelatedTo = function (term) {
//     return (this._name === term._name);
//   };
// }
//
// // A text term in an Expression.
// function TextTerm (text) {
//   this._not = false;
//   this._text = text;
//
//   // if the string is quoted, require matching at both ends
//   var unquoted = StringConvert.unquoteIfNecessary(text);
//   if (text === unquoted) {
//     this._regexp = new RegExp(text, 'i');
//   } else {
//     this._regexp = new RegExp('^' + unquoted + '$', 'i');
//   }
//
//   this.not = function (not) {
//     this._not = not;
//   };
//
//   this.isRelatedTo = function () {
//     return false;
//   };
// }
//
// // A simple expression in a query.
// // These can be nested for more complex expressions.
// // They have a _left term, a _right term, and an _op (AND or OR).
// function Expression () {
//
//   this.op = function (op) {
//     if (! this._op) {
//       this._op = op;
//     } else {
//       // already have an op, nest
//       // If the right is a simple term, convert it to an expression.
//       if (! this._right._left) {
//         var expression = new Expression();
//         expression.addTerm(this._right);
//         expression.op(op);
//         this._right = expression;
//       } else {
//         // right is an expression, add to it
//         this._right.op(op);
//       }
//     }
//   };
//
//   this.addTerm = function (term) {
//     if (! this._left) {
//       this._left = term;
//     } else if (! this._right) {
//       this._right = term;
//       if (! this._op) {
//         if (this._left.isRelatedTo(this._right)) {
//           this._op = 'OR';
//         } else {
//           this._op = 'AND';
//         }
//       }
//     } else {
//       // We already have a left and a right.
//       // If the right is a simple term, convert it to an expression.
//       if (! this._right._left) {
//         var expression = new Expression();
//         expression.addTerm(this._right);
//         this._right = expression;
//       }
//       // Add the term to the right expression.
//       this._right.addTerm(term);
//     }
//   };
//
//   this.isRelatedTo = function () {
//     return false;
//   };
// }

var TRACE_PARSING = false;
// don't convert timestamps, MAC addresses, or WWNs to attribute:value
// This pattern matches the name: ^[^\d:'"\s]{2}[^:'"\s]+
// We allow for the value to be optionally be quoted. So, we repeat the name
// pattern three times, once for single quoted value, once for double quoted
// value, and lastly with no quotes.
// We don't build this programmatically for better performance.
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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

var Query = function Query() {
  this.parseErrors = null;
  this.text = '';
  this.parsedTree = {};
};

Query.prototype = {

  initialize: function initialize(string) {
    this.text = string || '';
    try {
      this.parsedTree = parse(this.text);
    } catch (e) {
      this.parseErrors = e;
    }
    return this;
  },

  clone: function clone() {
    var query = new Query();
    return query.initialize(this.text);
  },

  error: function error() {
    return this.parseErrors;
  },

  set: function set(string) {
    this.text = string || '';
    try {
      this.parsedTree = parse(this.text);
    } catch (e) {
      this.parseErrors = e;
    }
    return this;
  },

  toString: function toString() {
    return this.text;
  },

  tree: function tree() {
    return this.parsedTree;
  }
};

;
module.exports = exports['default'];