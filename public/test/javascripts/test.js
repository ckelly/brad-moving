(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("test/models/header_test", function(exports, require, module) {
var Header;

Header = require('models/header');

describe('Header', function() {
  beforeEach(function() {
    return this.model = new Header();
  });
  afterEach(function() {
    return this.model.dispose();
  });
  return it('should contain 4 items', function() {
    return expect(this.model.get('items')).to.have.length(4);
  });
});

});

;require.register("test/test-helpers", function(exports, require, module) {
var chai, sinonChai;

chai = require('chai');

sinonChai = require('sinon-chai');

chai.use(sinonChai);

module.exports = {
  expect: chai.expect,
  sinon: require('sinon')
};

});

;require.register("test/views/header_view_test", function(exports, require, module) {
var Header, HeaderView, HeaderViewTest, mediator, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

mediator = require('mediator');

Header = require('models/header');

HeaderView = require('views/header_view');

HeaderViewTest = (function(_super) {
  __extends(HeaderViewTest, _super);

  function HeaderViewTest() {
    _ref = HeaderViewTest.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HeaderViewTest.prototype.renderTimes = 0;

  HeaderViewTest.prototype.render = function() {
    HeaderViewTest.__super__.render.apply(this, arguments);
    return this.renderTimes += 1;
  };

  return HeaderViewTest;

})(HeaderView);

describe('HeaderView', function() {
  beforeEach(function() {
    this.model = new Header();
    return this.view = new HeaderViewTest({
      model: this.model
    });
  });
  afterEach(function() {
    this.view.dispose();
    return this.model.dispose();
  });
  it('should display 4 links', function() {
    return expect(this.view.$el.find('a')).to.have.length(4);
  });
  return it('should re-render on login event', function() {
    expect(this.view.renderTimes).to.equal(1);
    mediator.publish('loginStatus');
    return expect(this.view.renderTimes).to.equal(2);
  });
});

});

;require.register("test/views/home_page_view_test", function(exports, require, module) {
var HomePageView;

HomePageView = require('views/home_page_view');

describe('HomePageView', function() {
  beforeEach(function() {
    return this.view = new HomePageView();
  });
  afterEach(function() {
    return this.view.dispose();
  });
  return it('should auto-render', function() {
    return expect(this.view.$el.find('img')).to.have.length(1);
  });
});

});

;
//@ sourceMappingURL=test.js.map