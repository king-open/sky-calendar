// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var isLeapYear = function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0 || year % 100 === 0 && year % 400 === 0;
};
var getFebDays = function getFebDays(year) {
  return isLeapYear(year) ? 29 : 28;
};
var calendar = document.querySelector('.calendar');
var month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var month_picker = document.querySelector('#month-picker');
var dayTextFormate = document.querySelector('.day-text-formate');
var timeFormate = document.querySelector('.time-formate');
var dateFormate = document.querySelector('.date-formate');

month_picker.onclick = function () {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

var generateCalendar = function generateCalendar(month, year) {
  var calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  var calendar_header_year = document.querySelector('#year');
  var days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  var first_day = new Date(year, month);

  for (var i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

    var day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (i - first_day.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

var month_list = calendar.querySelector('.month-list');
month_names.forEach(function (e, index) {
  var month = document.createElement('div');
  month.innerHTML = '<div>' + e + '</div>';

  month_list.append(month);
  month.onclick = function () {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

(function () {
  month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = function () {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = function () {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

var currentDate = new Date();
var currentMonth = { value: currentDate.getMonth() };
var currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

var todayShowTime = document.querySelector('.time-formate');
var todayShowDate = document.querySelector('.date-formate');

var currshowDate = new Date();
var showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
};
var currentDateFormate = new Intl.DateTimeFormat('en-US', showCurrentDateOption).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(function () {
  var timer = new Date();
  var option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  var formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  var time = ('' + timer.getHours()).padStart(2, '0') + ':' + ('' + timer.getMinutes()).padStart(2, '0') + ': ' + ('' + timer.getSeconds()).padStart(2, '0');
  todayShowTime.textContent = formateTimer;
}, 1000);
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.3f408693.map