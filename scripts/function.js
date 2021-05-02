
/**
 * 閃爍
* @param {string} targetHtmlId - 目標 html id
* @param {number} ms - 閃爍毫秒數
* @param {number} currentIndex - 目前閃爍位置
 */
function twinkling(targetHtmlId, ms, currentIndex) {
	var jqTarget = $("[id='" + targetHtmlId + "']");
	if(jqTarget.length > 0) {
		// 目標 html 文字
		var text = jqTarget.text();

		// 暫存
		var tempHtmlId = "temp" + targetHtmlId;
		var jqTemp = $("[id='" + tempHtmlId + "']");
		if(jqTemp.length == 0) {
			$("body").append("<div id='" + tempHtmlId + "' class='hide'>" + text + "</div>");
		} else {
			text = jqTemp.text();
		}

		// 閃爍
		if(!currentIndex || currentIndex > text.length) {
			currentIndex = 0;
		}
		var beforeText = text.substr(0, currentIndex);
		var afterText = text.substr(currentIndex + 1);
		var newText = beforeText + "　" + afterText;
		jqTarget.text(newText);
		setTimeout(function(){
			twinkling(targetHtmlId, ms, currentIndex + 1);
		}, ms);
	}
}

/**
 * 閃爍
* @param {string} url - 連結
 */
function changeForm(url) {
	if(url) {
		location.href = url;
	}
}