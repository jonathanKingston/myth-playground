(function () {
  'use strict';
  var myth = require('myth');

  var MythPlayground = function MythPlayground(options) {
    this.options = options;
    this.outputElement = null;
    this.inputElement = null;
    this.errorElement = null;
    this.init();
  };

  exports = module.exports = MythPlayground;

  function selector(scope, selector) {
    var el = scope.querySelector(selector);
    return el;
  }

  MythPlayground.prototype.init = function init() {
    var that = this;
    var scope = document.body;

    if ('inputSelector' in this.options) {
      this.inputElement = selector(scope, this.options.inputSelector);
    }

    if ('outputSelector' in this.options) {
      this.outputElement = selector(scope, this.options.outputSelector);
    }

    if ('errorSelector' in this.options) {
      this.outputElement = selector(scope, this.options.errorSelector);
    }

    if ('inputElement' in this.options) {
      this.inputElement = this.options.inputElement;
    }

    if ('outputElement' in this.options) {
      this.outputElement = this.options.outputElement;
    }

    if ('errorElement' in this.options) {
      this.errorElement = this.options.errorElement;
    }

    if (this.outputElement) {
      this.inputElement.addEventListener('change', function () {
        that.updateCSS();
      });

      this.inputElement.addEventListener('keyup', function () {
        that.updateCSS();
      });
      this.updateCSS();
    }
  };

  MythPlayground.prototype.updateOutput = function (outputCSS) {
    if (this.outputElement && this.outputElement.tagName.toLowerCase() === 'textarea') {
      this.outputElement.value = outputCSS;
    } else {
      this.outputElement.innerHTML = outputCSS.toString();
    }
  };

  MythPlayground.prototype.getCurrentOutput = function () {
    var currentOutput = '';
    if (this.outputElement && this.outputElement.tagName.toLowerCase() === 'textarea') {
      currentOutput = this.outputElement.value;
    } else {
      currentOutput = this.outputElement.innerHTML;
    }
    return currentOutput;
  };

  MythPlayground.prototype.hideErrorMessage = function () {
    if (this.errorElement) {
      this.errorElement.innerHTML = '';
      this.errorElement.className = 'hidden';
    }
  };

  MythPlayground.prototype.showErrorMessage = function (message) {
    if (this.errorElement) {
      this.errorElement.className = '';
      this.errorElement.innerHTML = message;
    }
  };

  MythPlayground.prototype.getInput = function () {
    if (this.inputElement && this.inputElement.tagName.toLowerCase() === 'textarea') {
      return this.inputElement.value;
    } else {
      return this.inputElement.innerHTML;
    }
    return '';
  };

  MythPlayground.prototype.updateCSS = function updateCSS() {
    var css = this.getInput();
    var outputValue;
    var currentOutputValue = this.getCurrentOutput();

    this.hideErrorMessage();
    try {
      outputValue = myth(css);
    } catch(e) {
      outputValue = currentOutputValue;

      this.showErrorMessage(e.toString());
    }

    this.updateOutput(outputValue);
  };

}());
