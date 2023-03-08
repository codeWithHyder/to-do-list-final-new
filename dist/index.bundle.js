"use strict";
(self["webpackChunkto_do_list_final"] = self["webpackChunkto_do_list_final"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_subClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/subClass.js */ "./src/modules/subClass.js");


const dataCollection = new _modules_subClass_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
dataCollection.load();
dataCollection.displayToDoList();
const getInputValue = id => {
  const inputField = document.querySelector(id);
  const inputValue = inputField.value;
  inputField.value = '';
  return inputValue;
};
const enterBtn = document.querySelector('.enterBtn');
enterBtn.addEventListener('click', event => {
  event.preventDefault();
  const inputValue = getInputValue('#inputField');
  dataCollection.setDataInLocal(inputValue);
  dataCollection.displayToDoList();
});
const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('input[type=checkbox]');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      dataCollection.data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = dataCollection.data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  dataCollection.data = updateList;
  localStorage.setItem('toDoList', JSON.stringify(updateList));
  dataCollection.displayToDoList();
});
document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});

/***/ }),

/***/ "./src/modules/mainClass.js":
/*!**********************************!*\
  !*** ./src/modules/mainClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
class Main {
  constructor(task, index, completed) {
    this.task = task;
    this.index = index;
    this.completed = completed;
  }
}

/***/ }),

/***/ "./src/modules/subClass.js":
/*!*********************************!*\
  !*** ./src/modules/subClass.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataCollection)
/* harmony export */ });
/* harmony import */ var _mainClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainClass.js */ "./src/modules/mainClass.js");

class DataCollection {
  constructor() {
    this.data = [];
  }
  getNextIndex = () => {
    let maxIndex = 0;
    this.data.forEach(toDoList => {
      if (toDoList.index > maxIndex) {
        maxIndex = toDoList.index;
      }
    });
    return maxIndex + 1;
  };
  setDataInLocal = inputValue => {
    const completed = false;
    const index = this.getNextIndex();
    const task = inputValue;
    const info = new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](task, index, completed);
    this.data.push(info);
    this.save();
  };
  displayToDoList = () => {
    let items = '';
    this.data.forEach(toDoList => {
      items += `
       <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr>
      `;
    });
    document.querySelector('.displayListCont').innerHTML = items;
    this.DeleteListeners();
    this.EditListeners();
    this.SaveListeners();
    this.checkBox();
  };
  updateCompletedStatus = (index, completed) => {
    this.data[index].completed = completed;
    this.save();
  };
  checkBox = () => {
    const checks = document.querySelectorAll('input[type=checkbox]');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    checks.forEach((ck, i) => {
      const isCompleted = this.data[i].completed;
      if (isCompleted) {
        inputs[i].classList.add('completed');
        checks[i].setAttribute('checked', 'checked');
      }
      ck.addEventListener('change', () => {
        if (checks[i].checked) {
          inputs[i].classList.add('completed');
          this.updateCompletedStatus(i, true);
        } else {
          inputs[i].classList.remove('completed');
          this.updateCompletedStatus(i, false);
        }
      });
    });
  };
  EditListeners = () => {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.controller');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    editBtn.forEach((eb, i) => {
      eb.addEventListener('click', () => {
        updateController[i].style.display = 'flex';
        editBtn[i].style.display = 'none';
        inputs[i].disabled = false;
      });
    });
  };

  /* update item when edit */
  updateItem = (task, i) => {
    this.data[i].task = task;
    this.save();
    this.displayToDoList();
  };
  SaveListeners = () => {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    saveBtn.forEach((sb, i) => {
      sb.addEventListener('click', () => {
        this.updateItem(inputs[i].value, i);
      });
    });
  };
  deleteItem = i => {
    this.data = this.data.filter((item, index) => index !== i);
    this.data.forEach((item, index) => {
      item.index = index + 1;
    });
    this.save();
    this.displayToDoList();
  };
  DeleteListeners = () => {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.deleteItem(i);
      });
    });
  };
  save = () => {
    localStorage.setItem('toDoList', JSON.stringify(this.data));
  };
  load = () => {
    const getDataFromLocal = JSON.parse(localStorage.getItem('toDoList')) || [];
    getDataFromLocal.forEach(toDoList => {
      this.data.push(new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](toDoList.task, toDoList.index, toDoList.completed));
    });
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(100, 146, 173, 0.63);\r\n}\r\n\r\n.mainSection {\r\n  width: 50%;\r\n  margin-top: 2rem;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: rgb(143, 102, 190);\r\n  box-shadow: 1px 1px 30px grey;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.inputDiv,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 85%;\r\n  font-size: 1.2rem;\r\n  margin-left: 0;\r\n  background-color: rgb(255, 255, 255);\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px 0;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n  background-color: rgba(151, 112, 189, 0.575);\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: rgb(143, 102, 190);\r\n}\r\n\r\n.inputField {\r\n  padding: 0.5rem;\r\n  width: 85%;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n  margin-left: 3.2rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 85%;\r\n  height: 1px;\r\n  background-color: black;\r\n  margin: 0 2rem;\r\n  margin-left: 3rem;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: rgb(29, 27, 27);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,2CAA2C;AAC7C;;AAEA;EACE,UAAU;EACV,gBAAgB;EAChB,QAAQ;EACR,QAAQ;EACR,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,oCAAoC;EACpC,6BAA6B;EAC7B,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,cAAc;EACd,oCAAoC;EACpC,YAAY;EACZ,YAAY;EACZ,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,eAAe;EACf,4CAA4C;AAC9C;;AAEA;EACE,YAAY;EACZ,oCAAoC;AACtC;;AAEA;EACE,eAAe;EACf,UAAU;EACV,YAAY;EACZ,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;EACvB,cAAc;EACd,iBAAiB;AACnB;;AAEA;;EAEE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE;IACE,oBAAoB;IACpB,sBAAsB;EACxB;;EAEA;IACE,yBAAyB;IACzB,WAAW;EACb;AACF","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(100, 146, 173, 0.63);\r\n}\r\n\r\n.mainSection {\r\n  width: 50%;\r\n  margin-top: 2rem;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: rgb(143, 102, 190);\r\n  box-shadow: 1px 1px 30px grey;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.inputDiv,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 85%;\r\n  font-size: 1.2rem;\r\n  margin-left: 0;\r\n  background-color: rgb(255, 255, 255);\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px 0;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n  background-color: rgba(151, 112, 189, 0.575);\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: rgb(143, 102, 190);\r\n}\r\n\r\n.inputField {\r\n  padding: 0.5rem;\r\n  width: 85%;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n  margin-left: 3.2rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 85%;\r\n  height: 1px;\r\n  background-color: black;\r\n  margin: 0 2rem;\r\n  margin-left: 3rem;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: rgb(29, 27, 27);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9tYWluQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL3N1YkNsYXNzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgRGF0YUNvbGxlY3Rpb24gZnJvbSAnLi9tb2R1bGVzL3N1YkNsYXNzLmpzJztcblxuY29uc3QgZGF0YUNvbGxlY3Rpb24gPSBuZXcgRGF0YUNvbGxlY3Rpb24oKTtcbmRhdGFDb2xsZWN0aW9uLmxvYWQoKTtcbmRhdGFDb2xsZWN0aW9uLmRpc3BsYXlUb0RvTGlzdCgpO1xuY29uc3QgZ2V0SW5wdXRWYWx1ZSA9IChpZCkgPT4ge1xuICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBpbnB1dEZpZWxkLnZhbHVlO1xuICBpbnB1dEZpZWxkLnZhbHVlID0gJyc7XG4gIHJldHVybiBpbnB1dFZhbHVlO1xufTtcblxuY29uc3QgZW50ZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW50ZXJCdG4nKTtcbmVudGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBnZXRJbnB1dFZhbHVlKCcjaW5wdXRGaWVsZCcpO1xuICBkYXRhQ29sbGVjdGlvbi5zZXREYXRhSW5Mb2NhbChpbnB1dFZhbHVlKTtcbiAgZGF0YUNvbGxlY3Rpb24uZGlzcGxheVRvRG9MaXN0KCk7XG59KTtcblxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXJDb21wbGV0ZWQnKTtcbmNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBjaGVja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpO1xuICBjb25zdCB1cGRhdGVJdGVtID0gW107XG4gIGNoZWNrcy5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xuICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICBkYXRhQ29sbGVjdGlvbi5kYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uaW5kZXggPSBpbmRleDtcbiAgICAgIH0pO1xuICAgICAgdXBkYXRlSXRlbS5wdXNoKGkpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHVwZGF0ZUxpc3QgPSBkYXRhQ29sbGVjdGlvbi5kYXRhLmZpbHRlcigoaXRlbSwgaSkgPT4gIXVwZGF0ZUl0ZW0uaW5jbHVkZXMoaSkpO1xuICB1cGRhdGVMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgaXRlbS5pbmRleCA9IGluZGV4O1xuICB9KTtcbiAgZGF0YUNvbGxlY3Rpb24uZGF0YSA9IHVwZGF0ZUxpc3Q7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZUxpc3QpKTtcbiAgZGF0YUNvbGxlY3Rpb24uZGlzcGxheVRvRG9MaXN0KCk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXJlZnJlc2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtcmVmcmVzaCcpLmNsYXNzTGlzdC5hZGQoJ3JlZnJlc2gnKTtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiB7XG4gIGNvbnN0cnVjdG9yKHRhc2ssIGluZGV4LCBjb21wbGV0ZWQpIHtcbiAgICB0aGlzLnRhc2sgPSB0YXNrO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgfVxufSIsImltcG9ydCBNYWluIGZyb20gJy4vbWFpbkNsYXNzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YUNvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgfVxuXG4gIGdldE5leHRJbmRleCA9ICgpID0+IHtcbiAgICBsZXQgbWF4SW5kZXggPSAwO1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh0b0RvTGlzdCkgPT4ge1xuICAgICAgaWYgKHRvRG9MaXN0LmluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgbWF4SW5kZXggPSB0b0RvTGlzdC5pbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SW5kZXggKyAxO1xuICB9XG5cbiAgICAgc2V0RGF0YUluTG9jYWwgPSAoaW5wdXRWYWx1ZSkgPT4ge1xuICAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgoKTtcbiAgICAgICBjb25zdCB0YXNrID0gaW5wdXRWYWx1ZTtcbiAgICAgICBjb25zdCBpbmZvID0gbmV3IE1haW4odGFzaywgaW5kZXgsIGNvbXBsZXRlZCk7XG4gICAgICAgdGhpcy5kYXRhLnB1c2goaW5mbyk7XG4gICAgICAgdGhpcy5zYXZlKCk7XG4gICAgIH07XG5cbiAgICAgICBkaXNwbGF5VG9Eb0xpc3QgPSAoKSA9PiB7XG4gICAgICAgICBsZXQgaXRlbXMgPSAnJztcbiAgICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh0b0RvTGlzdCkgPT4ge1xuICAgICAgICAgICBpdGVtcyArPSBgXG4gICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhQ29udGFpbmVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hcIiBuYW1lPVwiY29tcGxldGVkXCIgLz5cbiAgICAgICAgICA8dGV4dGFyZWEgZGlzYWJsZWQ+JHt0b0RvTGlzdC50YXNrfTwvdGV4dGFyZWE+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1lbGxpcHNpcy12IGVkaXRCdG5cIiA+PC9pPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zYXZlIHNhdmVCdG5cIj48L2k+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10cmFzaCBkZWxldGVCdG5cIj48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgICA8aHI+XG4gICAgICBgO1xuICAgICAgICAgfSk7XG4gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzcGxheUxpc3RDb250JykuaW5uZXJIVE1MID0gaXRlbXM7XG4gICAgICAgICB0aGlzLkRlbGV0ZUxpc3RlbmVycygpO1xuICAgICAgICAgdGhpcy5FZGl0TGlzdGVuZXJzKCk7XG4gICAgICAgICB0aGlzLlNhdmVMaXN0ZW5lcnMoKTtcbiAgICAgICAgIHRoaXMuY2hlY2tCb3goKTtcbiAgICAgICB9O1xuXG4gdXBkYXRlQ29tcGxldGVkU3RhdHVzID0gKGluZGV4LCBjb21wbGV0ZWQpID0+IHtcbiAgIHRoaXMuZGF0YVtpbmRleF0uY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgdGhpcy5zYXZlKCk7XG4gfVxuXG5jaGVja0JveCA9ICgpID0+IHtcbiAgY29uc3QgY2hlY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKTtcbiAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHRhcmVhQ29udGFpbmVyIHRleHRhcmVhJyk7XG4gIGNoZWNrcy5mb3JFYWNoKChjaywgaSkgPT4ge1xuICAgIGNvbnN0IGlzQ29tcGxldGVkID0gdGhpcy5kYXRhW2ldLmNvbXBsZXRlZDtcbiAgICBpZiAoaXNDb21wbGV0ZWQpIHtcbiAgICAgIGlucHV0c1tpXS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgIGNoZWNrc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgIH1cbiAgICBjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoY2hlY2tzW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgaW5wdXRzW2ldLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBsZXRlZFN0YXR1cyhpLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0c1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wbGV0ZWRTdGF0dXMoaSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuIEVkaXRMaXN0ZW5lcnM9KCkgPT4ge1xuICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0QnRuJyk7XG4gICBjb25zdCB1cGRhdGVDb250cm9sbGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRyb2xsZXInKTtcbiAgIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0YXJlYUNvbnRhaW5lciB0ZXh0YXJlYScpO1xuICAgZWRpdEJ0bi5mb3JFYWNoKChlYiwgaSkgPT4ge1xuICAgICBlYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICB1cGRhdGVDb250cm9sbGVyW2ldLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgZWRpdEJ0bltpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgIGlucHV0c1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICB9KTtcbiAgIH0pO1xuIH1cblxuIC8qIHVwZGF0ZSBpdGVtIHdoZW4gZWRpdCAqL1xuICB1cGRhdGVJdGVtID0gKHRhc2ssIGkpID0+IHtcbiAgICB0aGlzLmRhdGFbaV0udGFzayA9IHRhc2s7XG4gICAgdGhpcy5zYXZlKCk7XG4gICAgdGhpcy5kaXNwbGF5VG9Eb0xpc3QoKTtcbiAgfVxuXG4gU2F2ZUxpc3RlbmVycz0oKSA9PiB7XG4gICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNhdmVCdG4nKTtcbiAgIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0YXJlYUNvbnRhaW5lciB0ZXh0YXJlYScpO1xuICAgc2F2ZUJ0bi5mb3JFYWNoKChzYiwgaSkgPT4ge1xuICAgICBzYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICB0aGlzLnVwZGF0ZUl0ZW0oaW5wdXRzW2ldLnZhbHVlLCBpKTtcbiAgICAgfSk7XG4gICB9KTtcbiB9XG5cbiAgICAgZGVsZXRlSXRlbSA9IChpKSA9PiB7XG4gICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSwgaW5kZXgpID0+IGluZGV4ICE9PSBpKTtcbiAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgIGl0ZW0uaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgfSk7XG4gICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgdGhpcy5kaXNwbGF5VG9Eb0xpc3QoKTtcbiAgICAgfVxuXG4gICAgIERlbGV0ZUxpc3RlbmVycz0gKCkgPT4ge1xuICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGVCdG4nKTtcbiAgICAgICBkZWxldGVCdG4uZm9yRWFjaCgoYnRuLCBpKSA9PiB7XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRoaXMuZGVsZXRlSXRlbShpKTsgfSk7XG4gICAgICAgfSk7XG4gICAgIH1cblxuIHNhdmUgPSAoKSA9PiB7XG4gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9Eb0xpc3QnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcbiB9XG5cbiBsb2FkID0gKCkgPT4ge1xuICAgY29uc3QgZ2V0RGF0YUZyb21Mb2NhbCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvRG9MaXN0JykpIHx8IFtdO1xuICAgZ2V0RGF0YUZyb21Mb2NhbC5mb3JFYWNoKCh0b0RvTGlzdCkgPT4ge1xuICAgICB0aGlzLmRhdGEucHVzaChuZXcgTWFpbih0b0RvTGlzdC50YXNrLCB0b0RvTGlzdC5pbmRleCwgdG9Eb0xpc3QuY29tcGxldGVkKSk7XG4gICB9KTtcbiB9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTQ2LCAxNzMsIDAuNjMpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpblNlY3Rpb24ge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxyXFxuICBsZWZ0OiA1JTtcXHJcXG4gIHRvcDogMTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAyLCAxOTApO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5UaXRsZUNvbnRhaW5lcixcXHJcXG4uaW5wdXREaXYsXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiA4NSU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzogMXB4IDA7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUxLCAxMTIsIDE4OSwgMC41NzUpO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXJCdG4ge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAyLCAxOTApO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXRGaWVsZCB7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICB3aWR0aDogODUlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICBtYXJnaW4tbGVmdDogMy4ycmVtO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDg1JTtcXHJcXG4gIGhlaWdodDogMXB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICBtYXJnaW46IDAgMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZmEsXFxyXFxuLmNoZWNrYm94IHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xsZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcXHJcXG4gIGdhcDogMTVweDtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIGNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBhbmltYXRpb246IHJvdGF0ZSAwLjFzIGVhc2Utb3V0O1xcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxyXFxuICAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcclxcbiAgICBjb2xvcjogcmdiKDI5LCAyNywgMjcpO1xcclxcbiAgfVxcclxcblxcclxcbiAgMTAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIGNvbG9yOiBhcXVhO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsMkNBQTJDO0FBQzdDOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixRQUFRO0VBQ1IsUUFBUTtFQUNSLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLG9DQUFvQztFQUNwQyw2QkFBNkI7RUFDN0IsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxvQ0FBb0M7RUFDcEMsWUFBWTtFQUNaLFlBQVk7RUFDWixjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixlQUFlO0VBQ2YsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGVBQWU7RUFDZixVQUFVO0VBQ1YsWUFBWTtFQUNaLGNBQWM7RUFDZCxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixjQUFjO0VBQ2QsaUJBQWlCO0FBQ25COztBQUVBOztFQUVFLGVBQWU7RUFDZixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixTQUFTO0VBQ1Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixXQUFXO0VBQ2I7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTQ2LCAxNzMsIDAuNjMpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpblNlY3Rpb24ge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxyXFxuICBsZWZ0OiA1JTtcXHJcXG4gIHRvcDogMTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAyLCAxOTApO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5UaXRsZUNvbnRhaW5lcixcXHJcXG4uaW5wdXREaXYsXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiA4NSU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzogMXB4IDA7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUxLCAxMTIsIDE4OSwgMC41NzUpO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXJCdG4ge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAyLCAxOTApO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXRGaWVsZCB7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICB3aWR0aDogODUlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICBtYXJnaW4tbGVmdDogMy4ycmVtO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDg1JTtcXHJcXG4gIGhlaWdodDogMXB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICBtYXJnaW46IDAgMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZmEsXFxyXFxuLmNoZWNrYm94IHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xsZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcXHJcXG4gIGdhcDogMTVweDtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIGNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBhbmltYXRpb246IHJvdGF0ZSAwLjFzIGVhc2Utb3V0O1xcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxyXFxuICAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcclxcbiAgICBjb2xvcjogcmdiKDI5LCAyNywgMjcpO1xcclxcbiAgfVxcclxcblxcclxcbiAgMTAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIGNvbG9yOiBhcXVhO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiRGF0YUNvbGxlY3Rpb24iLCJkYXRhQ29sbGVjdGlvbiIsImxvYWQiLCJkaXNwbGF5VG9Eb0xpc3QiLCJnZXRJbnB1dFZhbHVlIiwiaWQiLCJpbnB1dEZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5wdXRWYWx1ZSIsInZhbHVlIiwiZW50ZXJCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInNldERhdGFJbkxvY2FsIiwiY2xlYXJCdG4iLCJjaGVja3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwidXBkYXRlSXRlbSIsImZvckVhY2giLCJjaGVja2JveCIsImkiLCJjaGVja2VkIiwiZGF0YSIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJ1cGRhdGVMaXN0IiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2xhc3NMaXN0IiwiYWRkIiwiTWFpbiIsImNvbnN0cnVjdG9yIiwidGFzayIsImNvbXBsZXRlZCIsImdldE5leHRJbmRleCIsIm1heEluZGV4IiwidG9Eb0xpc3QiLCJpbmZvIiwic2F2ZSIsIml0ZW1zIiwiaW5uZXJIVE1MIiwiRGVsZXRlTGlzdGVuZXJzIiwiRWRpdExpc3RlbmVycyIsIlNhdmVMaXN0ZW5lcnMiLCJjaGVja0JveCIsInVwZGF0ZUNvbXBsZXRlZFN0YXR1cyIsImlucHV0cyIsImNrIiwiaXNDb21wbGV0ZWQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmUiLCJlZGl0QnRuIiwidXBkYXRlQ29udHJvbGxlciIsImViIiwic3R5bGUiLCJkaXNwbGF5IiwiZGlzYWJsZWQiLCJzYXZlQnRuIiwic2IiLCJkZWxldGVJdGVtIiwiZGVsZXRlQnRuIiwiYnRuIiwiZ2V0RGF0YUZyb21Mb2NhbCIsInBhcnNlIiwiZ2V0SXRlbSJdLCJzb3VyY2VSb290IjoiIn0=