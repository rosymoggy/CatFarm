

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
  	return this.kind + "的" + eyeText + this.bodyColor + "貓";
  }

  getHtmlId() {
  	return this.htmlId;
  }

  getCode() {
  	return this.code;
  }

  static getInfoByCode(code) {
  	var splitCode = code.split("-");
  	// body
  	if(!$.isNumeric(splitCode[0])){
  		throw new Error("Invalid body code.");
  	}
  	var idxBodyColor = parseInt(splitCode[0]);
    var bodyColor = catSetting.bodyColorArray[idxBodyColor];

  	// kind
  	if(!$.isNumeric(splitCode[1])){
  		throw new Error("Invalid kind code.");
  	}
  	var idxKind = parseInt(splitCode[1]);
    var kind = catSetting.kindArray[idxKind];

  	// left eye
  	if(!$.isNumeric(splitCode[2])){
  		throw new Error("Invalid left eye code.");
  	}
  	var idxLeftEyeColor = parseInt(splitCode[2]);
    var leftEyeColor = catSetting.eyeColorArray[idxLeftEyeColor];

  	// right eye
  	if(!$.isNumeric(splitCode[3])){
  		throw new Error("Invalid right eye code.");
  	}
  	var idxRightEyeColor = parseInt(splitCode[3]);
	var rightEyeColor = catSetting.eyeColorArray[idxRightEyeColor];

  	var eyeText = leftEyeColor + "眼";
  	if(leftEyeColor != rightEyeColor) {
  		eyeText = "異色瞳(左" + leftEyeColor + "右" + rightEyeColor + ")";
  	}
  	var info = kind + "的" + eyeText + bodyColor + "貓";

  	return info;
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
				"一隻<span>" + item.info + "</span>" +
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
			var currentHtmlId = "History" + idx;
			var htmlHistory = 
				catText + "<input type='hidden' name='CatCode' value='" + catCode + "' />";
			jqOld.append(
				"<div id='" + currentHtmlId + "' class='history'>" +
				"你的第" + idx + "隻貓咪是：" +
				htmlHistory +
				"</div>"
			);
			if(jqOld.hasClass("hide")){
				jqOld.removeClass("hide");
			}
			jqNew.empty();

			// first
			if(idx <= 1) {
				$("#FirstCat").html("這是一隻" + htmlHistory);
				$("#CurrentBox").removeClass("hide");
				$("#CurrentLine").removeClass("hide");
			} 
			// second
			else {
				var htmlSecond = $("#SecondCat").html();
				if(htmlSecond.trim().length > 0) {
					$("#FirstCat").html(htmlSecond);
				} 
				$("#SecondCat").html("這是一隻" + htmlHistory);
			}

			createCat();
			showCat(newHtmlId);
		} else {
			alert("請選擇一隻貓咪！");
		}
	}
}



