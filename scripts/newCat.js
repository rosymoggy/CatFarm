

/**
 * 貓咪陣列
 */
var catArray = [];
/**
 * 貓咪設定
 */
var catSetting = {
	/**
	 * 眼睛顏色
	 */
	eyeColorArray: [ "黑", "藍", "棕", "黃" ],
	/**
	 * 身體顏色
	 */
	bodyColorArray: [ "黑", "白", "三花", "虎斑", "乳牛" ],
	/**
	 * 個性
	 */
	kindArray: [ "活潑", "穩重", "機掰", "懶散", "膽小", "黏人" ]
};

class Cat {
  constructor() {
  	this.code = "";

    var r = Math.floor(Math.random() * 100 % catSetting.bodyColorArray.length);
    this.bodyColor = catSetting.bodyColorArray[r];
    this.code += r.toString() + "-";

    r = Math.floor(Math.random() * 100 % catSetting.kindArray.length);
    this.kind = catSetting.kindArray[r];
    this.code += r.toString() + "-";

    r = Math.floor(Math.random() * 100 % catSetting.eyeColorArray.length);
    this.leftEyeColor = catSetting.eyeColorArray[r];
    this.code += r.toString() + "-";

    r = Math.floor(Math.random() * 100);
    if(r % 20 == 1) {
		r = Math.floor(Math.random() * 100 % catSetting.eyeColorArray.length);
    	var newColor = catSetting.eyeColorArray[r];
    	while(newColor == this.leftEyeColor){
    		r = Math.floor(Math.random() * 100 % catSetting.eyeColorArray.length);
    		newColor = catSetting.eyeColorArray[r];
    	}
    	this.rightEyeColor = newColor;
    } else {
    	this.rightEyeColor = this.leftEyeColor;
    }
    this.code += r.toString();

    this.htmlId = Cat.$prefix + Cat.$count;
    Cat.$count = Cat.$count + 1;
  }

  static $count = 0;
  static $prefix = "CatArray";

  get info() {
  	var eyeText = this.leftEyeColor + "眼";
  	if(this.leftEyeColor != this.rightEyeColor) {
  		eyeText = "異色瞳(左" + this.leftEyeColor + "右" + this.rightEyeColor + ")";
  	}
  	return "一隻" + this.kind + "的" + eyeText + this.bodyColor + "貓";
  }

  getHtmlId() {
  	return this.htmlId;
  }

  getCode() {
  	return this.code;
  }
}

/**
 * 創造數量
 */
var createCount = 3;

/**
 * 創造貓咪
 */
function createCat() {
	catArray = [];

	for(var i = 0; i < createCount; i++) {
		var newCat = new Cat();
		catArray.push(newCat);
	}
}

/**
 * 列出貓咪
 * @param {string} targetHtmlId - 目標 html id
 */
function showCat(targetHtmlId) {
	var jqTarget = $("[id='" + targetHtmlId + "']");
	if(jqTarget.length > 0) {
		jqTarget.empty();
		$.each(catArray, function(idx, item) {
			jqTarget.append(
				"<div class='radio'>" +
				"<label for='" + item.getHtmlId() + "'>" + 
				"<input id='" + item.getHtmlId() + "' type='radio' name='" + Cat.$prefix + "' value='" + item.getCode() + "' />" + 
				"<span>" + item.info + "</span>" +
				"</label>" +
				"</div>"
			);
		});
	}
}

/**
 * 切換下一批貓咪
 * @param {string} oldHtmlId - 舊資料 html id
 * @param {string} newHtmlId - 新資料 html id
 */
function switchCat(oldHtmlId, newHtmlId) {
	var jqOld = $("[id='" + oldHtmlId + "']");
	var jqNew = $("[id='" + newHtmlId + "']");
	var jqChecked = jqNew.find("input[type=radio]:checked");
	if(jqOld.length > 0 && jqNew.length > 0) {
		if(jqChecked.length > 0) {
			var catText = jqChecked.parent().find("span").text();
			var catCode = jqChecked.val();

			var idx = jqOld.find(".history").length + 1;
			jqOld.append(
				"<div id='History" + idx + "' class='history'>" +
				"你的第" + idx + "隻貓咪是："　+ catText + 
				"<input type='hidden' name='CatCode' value='" + catCode + "' />" +
				"</div>"
			);
			jqOld.show();
			jqNew.empty();

			createCat();
			showCat(newHtmlId);
		} else {
			alert("請選擇一隻貓咪！");
		}
	}
}





