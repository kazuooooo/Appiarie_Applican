(function() {
	// アピアリーズのサーバに接続用トークン
	var TOKEN = "appe7b035bd9fbe8ddbd24ee672fa";
	// クーポン情報URL
	var DATA_URL_LIST= "https://api-datastore.appiaries.com/v1/dat/_sandbox/beacon_sample_kazuo/coupon_data/";

	/*
	 * クーポン情報を取得する
	 */
	function getCouponData() {
		var detailUrl;
		detailUrl = DATA_URL_LIST + request("id");
	
		var options = {timeout : 10000};
		applican.http.get(detailUrl, options, httpGetSuccess, httpGetError);
	}

	/*
	 * クーポン情報を表示する
	 */
	function httpGetSuccess(data) {
		
		var outputHTML = "";
		if ( typeof data === "string") {
			data = $.parseJSON(data);
		}
		if(data) {
			$("#couponName").text(data.coupon_name);
			$("#couponDetail").text(data.coupon_detail);
		}
	}

	/*
	 * 検索失敗時のコールバック処理
	 */
	function httpGetError(message) {
		console.log("ネットワーク通信中にエラーが発生しました。");
	}
	
	/*
	 * クーポン情報を保存する
	 */
	function saveCoupon() {
		// UUID
		var uuid = applican.device.uuid;

		// クーポン保存用URL
		var postUrl = DATA_URL_LIST + "?access_token=" + TOKEN;

		// クーポンデータ
		var postData = {
			"uuid" : uuid,
			"coupon_name" : $("#couponName").text(),
			"coupon_detail" : $("#couponDetail").text()
		};

		// ajaxでデータを保存する
		$.ajax({
			url: postUrl,
			contentType: "application/json",
			data: JSON.stringify(postData),
			type: "post",
			success: function(data) {
				console.log("クーポンを保存しました。");
			},
			error: function(data) {
				console.log("保存に失敗しました。");
			}
		});
	}
	
	/********************* イベント登録 *********************/
	document.addEventListener("deviceready", function() {

		// 一覧画面からの場合
		if(request("id")) {
			 getCouponData();
		} else {
			// ローカル通知から開いた場合
			$("#couponName").text("店頭特典クーポンクーポン");
			$("#couponDetail").text("全商品１００％OFF！！");
			
			// couponの保存
			saveCoupon();
		}

	});

})();
