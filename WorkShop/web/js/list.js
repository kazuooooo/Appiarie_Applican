(function() {

	/*
	 * 一覧を生成する
	 */
	function httpGetSuccess(data) {
		var outputHTML = "";
		if ( typeof data === "string") {
			data = $.parseJSON(data);
		}
		if(data._objs && data._objs.length > 0) {
			outputHTML += "<ul>";
			//作成時間の降順で一覧を生成する
			for(var i= data._objs.length - 1 ; i >= 0; i--) {
				outputHTML += "<li><a href='coupon.html?id=" + data._objs[i]._id + "'>";
				outputHTML += htmlEntities(data._objs[i].coupon_name);
				outputHTML += "</a></li>";
			}
			outputHTML += "</ul>";
			$("#couponList").html(outputHTML);
		} else {
			$("#couponList").html("取得したクーポンは有りません");
		}
	}

	/*
	 * 検索失敗時のcallback処理
	 */
	function httpGetError(message) {
		console.log("ネットワーク通信にエラー発生しました。");
	}
	
	/********************* イベント登録 *********************/
	document.addEventListener("deviceready", function() {

		// UUID
		var uuid = applican.device.uuid;

		// クーポン取得用URL
		var DATA_URL= "https://api-datastore.appiaries.com/v1/dat/_sandbox/beacon_sample_kazuo/coupon_data/-;uuid.eq." + uuid;
	
		var options = {timeout : 10000};

		applican.http.get(DATA_URL + "?order=_cts", options, httpGetSuccess, httpGetError);


	});
})();
