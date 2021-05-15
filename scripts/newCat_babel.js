"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 目前擁有的貓咪陣列
 * @type {Array.<Cat>} 
 */
var catArray = [];
/**
 * 目標貓咪
 * @type {Cat} 
 */

var targetCat;
$(document).ready(function () {
  targetCat = new Cat();
  $("#TargetCat").html("<span>" + targetCat.info + "</span>" + "<input type='hidden' value='" + targetCat.code + "' />");
});
/**
 * 貓咪設定
 */

var catSetting = {
  /**
   * 基本生育次數
   */
  baseMateCount: 2,

  /**
   * 眼睛顏色
   */
  eyeColorArray: ["金", "藍", "綠", "黃"],

  /**
   * 身體毛髮顏色
   */
  furColorArray: ["黑", "白", "橘", "藍", "橘白", "三花", "黑虎斑", "橘虎斑", "乳牛", "重點色"],

  /**
   * 個性
   */
  kindArray: ["活潑", "穩重", "機掰", "懶散", "膽小", "黏人", "貪吃", "謹慎", "兇悍", "溫和"],

  /**
   * 毛髮長度
   */
  furLengthArray: ["長", "短"],

  /**
   * 四肢長度
   */
  limbLengthArray: ["長", "短"],

  /**
   * 性別
   */
  genderArray: ["母", "公"],

  /**
   * 動作
   */
  actionArray: ["坐下了", "趴下了", "站起來了", "翻肚肚了", "叫了", "便便了", "想睡覺了", "睡著了", "四處亂看", "盯著你看"]
};
/**
 * 貓咪
 */

var Cat =
/*#__PURE__*/
function () {
  function Cat(code, isChild) {
    _classCallCheck(this, Cat);

    if (code && code.length > 0) {
      this.setSettingByCode(code);
      this.code = code;
    } else {
      this.code = ""; // fur color

      var idxFurColor = getRandom(catSetting.furColorArray.length);
      this.code += idxFurColor.toString() + "-"; // kind

      var idxKind = getRandom(catSetting.kindArray.length);
      this.code += idxKind.toString() + "-"; // left eye color

      var idxLeftEyeColor = getRandom(catSetting.eyeColorArray.length);
      this.code += idxLeftEyeColor.toString() + "-"; // right eye color

      var idxRightEyeColor = idxLeftEyeColor;
      var diff = getRandom(50);

      if (diff == 1) {
        while (idxRightEyeColor == idxLeftEyeColor) {
          idxRightEyeColor = getRandom(catSetting.eyeColorArray.length);
        }
      }

      this.code += idxRightEyeColor.toString() + "-"; // fur length

      var idxFurLength = getRandom(catSetting.furLengthArray.length);
      this.code += idxFurLength.toString() + "-"; // limb length

      var idxLimbLength = getRandom(catSetting.limbLengthArray.length);
      this.code += idxLimbLength.toString() + "-"; // gender

      var idxGender = 0;

      if (idxFurColor != 5) {
        // 三花(5)永遠是母的
        idxGender = getRandom(catSetting.genderArray.length);
      }

      this.code += idxGender.toString() + "-"; // is child

      this.isChild = isChild ? isChild : 0;
      this.code += this.isChild.toString();
      this.setSettingByCode(this.code);
    }

    this.mateCount = catSetting.baseMateCount;
    this.catTitle = "一隻";
    this.htmlId = Cat.$prefix + Cat.$historyArray.length;
    Cat.$historyArray.push(this);
  }

  _createClass(Cat, [{
    key: "getAction",

    /**
     * 取得貓咪動作
     */
    value: function getAction() {
      var r = getRandom(catSetting.actionArray.length);
      var actionText = catSetting.actionArray[r];
      return "　［" + actionText + "］";
    }
    /**
     * 根據貓咪代碼設定貓咪屬性
     * @param {string} code - 貓咪代碼
     */

  }, {
    key: "setSettingByCode",
    value: function setSettingByCode(code) {
      this.code = code;
      var splitCode = code.split("-"); // fur color

      if (!$.isNumeric(splitCode[0])) {
        throw new Error("Invalid body code.");
      }

      var idxFurColor = parseInt(splitCode[0]);
      this.furColor = catSetting.furColorArray[idxFurColor]; // kind

      if (!$.isNumeric(splitCode[1])) {
        throw new Error("Invalid kind code.");
      }

      var idxKind = parseInt(splitCode[1]);
      this.kind = catSetting.kindArray[idxKind]; // left eye color

      if (!$.isNumeric(splitCode[2])) {
        throw new Error("Invalid left eye code.");
      }

      var idxLeftEyeColor = parseInt(splitCode[2]);
      this.leftEyeColor = catSetting.eyeColorArray[idxLeftEyeColor]; // right eye color

      if (!$.isNumeric(splitCode[3])) {
        throw new Error("Invalid right eye code.");
      }

      var idxRightEyeColor = parseInt(splitCode[3]);
      this.rightEyeColor = catSetting.eyeColorArray[idxRightEyeColor]; // fur length

      if (!$.isNumeric(splitCode[4])) {
        throw new Error("Invalid fur length code.");
      }

      var idxFurLength = parseInt(splitCode[4]);
      this.furLength = catSetting.furLengthArray[idxFurLength]; // limb length

      if (!$.isNumeric(splitCode[5])) {
        throw new Error("Invalid limb length code.");
      }

      var idxLimbLength = parseInt(splitCode[5]);
      this.limbLength = catSetting.limbLengthArray[idxLimbLength]; // gender

      if (!$.isNumeric(splitCode[6])) {
        throw new Error("Invalid fur length code.");
      }

      var idxGender = parseInt(splitCode[6]);

      if (this.furColor == "三花") {
        idxGender = 0;
      }

      this.gender = catSetting.genderArray[idxGender]; // is child

      if ($.isNumeric(splitCode[7])) {
        this.isChild = parseInt(splitCode[7]);
      } else {
        this.isChild = 0;
      }
    }
  }, {
    key: "info",

    /**
     * 取得貓咪資訊
     */
    get: function get() {
      var eyeText = this.leftEyeColor + "眼";

      if (this.leftEyeColor != this.rightEyeColor) {
        eyeText = "異色瞳(左" + this.leftEyeColor + "右" + this.rightEyeColor + ")";
      }

      var info = "";
      info += this.kind + "的";
      info += this.furLength + "毛";
      info += this.limbLength + "腳";
      info += eyeText;
      info += this.furColor + "貓";
      info += " (" + this.gender + ")";

      if (this.isChild) {
        info += " [培育]";
      }

      return info;
    }
    /**
     * 取得貓咪 radio html 語法
     */

  }, {
    key: "radioHtml",
    get: function get() {
      return "" + "<div class='radio'>" + "<label for='radio" + this.htmlId + "'>" + "<input id='radio" + this.htmlId + "' type='radio' name='" + Cat.$prefix + "' value='" + this.code + "' />" + "<span class='cat-title'>" + this.catTitle + "</span><span class='cat-info'>" + this.info + "</span>" + "</label>" + "</div>";
    }
    /**
     * 取得貓咪 checkbox html 語法
     */

  }, {
    key: "checkboxHtml",
    get: function get() {
      var countText = "[" + this.mateCount + "/" + catSetting.baseMateCount + "] ";
      return "" + "<div class='checkbox'>" + "<label for='checkbox" + this.htmlId + "'>" + "<input id='checkbox" + this.htmlId + "' type='checkbox' name='" + Cat.$prefix + "' value='" + this.code + "' onclick='checkCatMate($(this));' />" + "<span class='cat-title'>" + countText + this.catTitle + "</span><span class='cat-info'>" + this.info + "</span>" + "</label>" + "</div>";
    }
  }]);

  return Cat;
}();
/**
 * 取得亂數
 * @param {number} max - 最大值
 * @returns {number} - 亂數值
 */


_defineProperty(Cat, "$historyArray", []);

_defineProperty(Cat, "$prefix", "CatArray");

function getRandom(max) {
  return Math.floor(Math.random() * 100 % max);
}
/**
 * 創造貓咪
 * @param {number} catCount - 貓咪數量
 * @returns {Array} - 貓咪陣列
 */


function createCat(catCount) {
  var array = [];
  var hasFather = false,
      hasMother = false;

  for (var i = 0; i < catCount; i++) {
    var newCat = new Cat(); // 不可創造出同一隻貓咪

    while (newCat.code == targetCat.code) {
      newCat = new Cat();
    }

    array.push(newCat);

    if (newCat.gender == "公") {
      hasFather = true;
    } else if (newCat.gender == "母") {
      hasMother = true;
    }
  } // 沒有母的


  while (!hasMother) {
    var newCat = new Cat();

    if (newCat.gender == "母") {
      array.pop();
      array.push(newCat);
      break;
    }
  } // 沒有公的


  while (!hasFather) {
    var newCat = new Cat();

    if (newCat.gender == "公") {
      array.pop();
      array.push(newCat);
      break;
    }
  }

  return array;
}
/**
 * 健康貓咪最高上限
 */


var maxHealthCatCount = 4;
/**
 * 列出貓咪
 * @param {string} targetHtmlId - 目標 html id
 */

function showCat(targetHtmlId) {
  var jqTarget = $("[id='" + targetHtmlId + "']");

  if (jqTarget.length == 0) {
    throw new Error("Invalid targetHtmlId: " + targetHtmlId);
  }

  jqTarget.empty();
  var healthCatCount = 0;
  $.each(catArray, function (idx, item) {
    if (item.mateCount == catSetting.baseMateCount) {
      healthCatCount++;
    }
  });

  if (healthCatCount >= maxHealthCatCount) {
    jqTarget.append("<div class='radio'>" + "<p>你不能再選擇新貓咪了！</p>" + "</div>");

    if (!$("#SwitchBtn").hasClass("hide")) {
      $("#SwitchBtn").addClass("hide");
    }
  } else {
    var array = createCat(3);
    $.each(array, function (idx, item) {
      jqTarget.append(item.radioHtml);
    });

    if ($("#SwitchBtn").hasClass("hide")) {
      $("#SwitchBtn").removeClass("hide");
    }
  }
}
/**
 * 比對貓咪代碼
 * @param {string} code1 - 貓咪代碼 1
 * @param {string} code2 - 貓咪代碼 2
 */


function matchCode(code1, code2) {
  var split1 = code1.split('-');
  var split2 = code2.split('-');
  var isMatched = true;

  for (var i = 0; i < split1.length; i++) {
    if (i == 1) {
      // kind 跳過
      continue;
    }

    if (split1[i] != split2[i]) {
      isMatched = false;
      break;
    }
  }

  return isMatched;
}
/**
 * 列出目前擁有的貓咪
 * @param {string} targetHtmlId - 目標 html id
 */


function showCurrentCat(targetHtmlId) {
  $("#CurrentBox").removeClass("hide");
  $("#CurrentLine").removeClass("hide");
  var healthCatCount = 0;
  var hasFather = false,
      hasMother = false,
      hasTarget = false;
  $.each(catArray, function (idx, item) {
    if (matchCode(item.code, targetCat.code)) {
      hasTarget = true;
    }

    if (item.mateCount == catSetting.baseMateCount) {
      healthCatCount++;
    }

    if (item.gender == "母") {
      hasMother = true;
    }

    if (item.gender == "公") {
      hasFather = true;
    }
  });

  if (healthCatCount >= maxHealthCatCount && (!hasFather || !hasMother)) {
    $("#ToolBoxBtn").show();

    if (!$(".toolbox").find(".cat-clear").hasClass("hide") || !$(".toolbox").find(".cat-change").hasClass("hide")) {
      $(".toolbox").removeClass("hide");
    } else {
      alert("你的道具都用完了，也沒有貓咪可以配種了，繁殖貓咪失敗！");
    }
  } else {
    $("#ToolBoxBtn").hide();
  }

  showCat(targetHtmlId);

  if (hasTarget) {
    alert("你配出目標貓咪了！");
  }

  switchCatAction();
}
/**
 * 切換貓咪的動作
 */


function switchCatAction() {
  var jqBox = $("#CurrentBox").find("div.cat-box");

  if (jqBox.length == 0) {
    throw new Error("Invalid current box: CurrentBox");
  }

  jqBox.empty();

  if (catArray.length == 0) {
    return;
  }

  $.each(catArray, function (idx, item) {
    item.catTitle = "這是一隻";
    var bkClass = "";

    if (item.code == targetCat.code) {
      bkClass = "cat-action";
    }

    if (idx < catArray.length - 1) {
      var htmlId = "Box" + item.htmlId;
      jqBox.append("<div class='col-sm-3 box " + bkClass + "'>" + item.checkboxHtml + "<div id='" + htmlId + "'>" + //  class='cat-action'
      item.getAction() + "</div>" + "</div>");
    } else {
      jqBox.append("<div class='col-sm-3 box " + bkClass + "'>" + item.checkboxHtml + "<div id='" + htmlId + "'>" + //  class='cat-action'
      "　" + "</div>" + "</div>");
    }
  });
}
/**
 * 切換下一批貓咪
 * @param {string} targetHtmlId - 目標 html id
 */


function switchCat(targetHtmlId) {
  var jqNew = $("[id='NewList']");

  if (jqNew.length == 0) {
    throw new Error("Invalid old list: NewList");
  }

  var jqChecked = jqNew.find("input[type=radio]:checked");

  if (jqChecked.length == 0) {
    alert("請選擇一隻貓咪！");
    return;
  }

  var cat = new Cat(jqChecked.val());

  if (catArray.length > maxHealthCatCount - 2) {
    var hasFather = false,
        hasMother = false;
    $.each(catArray, function (idx, item) {
      if (item.gender == "母") {
        hasMother = true;
      }

      if (item.gender == "公") {
        hasFather = true;
      }
    });

    if (!hasFather && cat.gender == "母") {
      alert("你沒有公貓了，請選擇一隻公貓！");
      return;
    }

    if (!hasMother && cat.gender == "公") {
      alert("你沒有母貓了，請選擇一隻母貓！");
      return;
    }
  }

  catArray.push(cat);
  addHistoryCat(cat);
  jqNew.empty();
  showCurrentCat(targetHtmlId);
}
/**
 * 增加貓咪紀錄
 * @param {Cat} cat - 貓咪物件
 */


function addHistoryCat(cat) {
  var jqOld = $("[id='OldList']");

  if (jqOld.length == 0) {
    throw new Error("Invalid old list: OldList");
  }

  var idx = jqOld.find(".history").length + 1;
  var currentHtmlId = "History" + idx;
  var htmlHistory = cat.info + "<input type='hidden' name='CatCode' value='" + cat.code + "' />";
  jqOld.append("<div id='" + currentHtmlId + "' class='history'>" + "你的第" + idx + "隻貓咪是：" + htmlHistory + "</div>");

  if (jqOld.hasClass("hide")) {
    jqOld.removeClass("hide");
  }
}
/**
 * 確認貓咪可否配種
 * @param {object} jqCheckbox - checkbox 物件
 */


function checkCatMate(jqCheckbox) {
  var checkboxLength = $("#CurrentBox").find("input[type=checkbox]:checked").length;

  if (checkboxLength > 2) {
    jqCheckbox.prop("checked", false);
  }

  var jqCatMate = $("#CatMateBtn");

  if (checkboxLength >= 2) {
    if (jqCatMate.hasClass("hide")) {
      jqCatMate.removeClass("hide");
    }
  } else {
    if (!jqCatMate.hasClass("hide")) {
      jqCatMate.addClass("hide");
    }
  }
}
/**
 * 尋找目前的貓
 * @param {string} code - 貓咪代碼
 * @returns {Cat} - 貓咪物件
 */


function findCat(code) {
  var cat = undefined,
      tmpIdx = undefined;
  $.each(catArray, function (idx, item) {
    if (item.code == code) {
      cat = item;
      tmpIdx = idx;
    }
  });

  if (cat) {
    catArray[tmpIdx].mateCount--;
    var newCatArray = [];
    $.each(catArray, function (idx, item) {
      if (item.mateCount > 0) {
        newCatArray.push(item);
      }
    });
    catArray = newCatArray; //if(catArray[tmpIdx].mateCount <= 0) {
    //  catArray.splice(tmpIdx, 1);
    //}

    return cat;
  } else {
    throw new Error("Cannot find code: " + code);
  }
}
/**
 * 生小貓
 * @param {string} targetHtmlId - 目標 html id
 */


function mateCat(targetHtmlId) {
  var currentCatArray = $("#CurrentBox").find("input[type=checkbox]:checked");

  if (currentCatArray.length < 2) {
    alert("貓咪不能無性繁殖，請選擇兩隻貓。");
    return;
  }

  var first = findCat(currentCatArray[0].value);
  var second = findCat(currentCatArray[1].value);

  if (first.gender == second.gender) {
    alert("貓咪不能多元成家，請選擇兩隻不同性別的貓。");
    return;
  } // 判斷父母是否皆為短腳貓


  if (first.limbLength == second.limbLength && first.limbLength == "短") {
    alert("配種失敗，小貓咪因故直接離開繁殖場。（短腳貓和短腳貓配種時，會因為發育不全而死亡）");
    showCurrentCat(targetHtmlId);
    return;
  } // 讓小貓繼承父母基因
  // 1. 改變設定: 眼睛顏色


  var tmpEyeColorArray = catSetting.eyeColorArray;
  catSetting.eyeColorArray = [first.leftEyeColor];

  if (catSetting.eyeColorArray.indexOf(first.rightEyeColor) >= 0) {
    catSetting.eyeColorArray.push(first.rightEyeColor);
  }

  if (catSetting.eyeColorArray.indexOf(second.rightEyeColor) >= 0) {
    catSetting.eyeColorArray.push(second.rightEyeColor);
  }

  if (catSetting.eyeColorArray.indexOf(second.leftEyeColor) >= 0) {
    catSetting.eyeColorArray.push(second.leftEyeColor);
  } // 2. 改變設定: 身體毛髮顏色


  var tmpFurColorArray = catSetting.furColorArray;
  catSetting.furColorArray = [first.furColor];

  if (catSetting.furColorArray.indexOf(second.furColor) >= 0) {
    catSetting.furColorArray.push(second.furColor);
  } // 3. 改變設定: 毛髮長度


  var tmpFurLengthArray = catSetting.furLengthArray;
  catSetting.furLengthArray = [first.furLength];

  if (catSetting.furLengthArray.indexOf(second.furLength) >= 0) {
    catSetting.furLengthArray.push(second.furLength);
  } // 4. 改變設定: 四肢長度


  var tmpLimbLengthArray = catSetting.limbLengthArray;
  catSetting.limbLengthArray = [first.limbLength];

  if (catSetting.limbLengthArray.indexOf(second.limbLength) >= 0) {
    catSetting.limbLengthArray.push(second.limbLength);
  } // 創造小貓


  var kitty = new Cat("", 1); // 5. 回復設定: 1-4

  catSetting.eyeColorArray = tmpEyeColorArray;
  catSetting.furColorArray = tmpFurColorArray;
  catSetting.furLengthArray = tmpFurLengthArray;
  catSetting.limbLengthArray = tmpLimbLengthArray;
  catArray.push(kitty);
  addHistoryCat(kitty);
  showCurrentCat(targetHtmlId);
}
/**
 * 送走所有貓咪
 * @param {string} targetHtmlId - 目標 html id
 */


function clearCat(targetHtmlId) {
  catArray = [];
  showCurrentCat(targetHtmlId);
  showCat(targetHtmlId);

  if (!$(".toolbox").hasClass("hide")) {
    $(".toolbox").addClass("hide");
  }

  if (!$(".toolbox").find(".cat-clear").hasClass("hide")) {
    $(".toolbox").find(".cat-clear").addClass("hide");
  }

  $("#KeepBtn").click();
}
/**
 * 隨機重置一隻貓咪(重置後必為異性)
 * @param {string} targetHtmlId - 目標 html id
 */


function changeCat(targetHtmlId) {
  var r = getRandom(catArray.length);
  var cat = catArray[r];
  var newCat = new Cat();

  while (newCat.gender == cat.gender) {
    newCat = new Cat();
  }

  catArray[r] = newCat;
  showCurrentCat(targetHtmlId);

  if (!$(".toolbox").hasClass("hide")) {
    $(".toolbox").addClass("hide");
  }

  if (!$(".toolbox").find(".cat-change").hasClass("hide")) {
    $(".toolbox").find(".cat-change").addClass("hide");
  }

  $("#KeepBtn").click();
}