/*
 * URLからパラメーターを取得する
 */
function request(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) {
		return unescape(r[2]);
	}
	return null;
}

/*
 * 特殊文字の置換処理
 */
function htmlEntities(str) {
	return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>");
}
