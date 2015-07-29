(function() {
	/**********************************
	 * Beacon
	 * iBeaconを利用し端末の位置情報を取得、監視する
	 **********************************/
	
	/**
	 * Beacon API の初期化成功時のcallback処理
	 */
	function initBeaconSuccess(){
		console.log("Beaconの初期化成功。");
		// モニタリングの開始
		applican.beacon.startMonitoring(startMonitoringSuccess, startMonitoringError);
	}

	/**
	 * Beacon API の初期化失敗時のcallback処理
	 */
	function initBeaconError(error) {
		console.log("Beacon API の初期化に失敗しました。");
		if(error.code === 2) {
			applican.notification.alert("Bluetoothを有効にしてください。", function(){
			}, "検索一覧", "OK");
		}
	}

	/**
	 * Beaconの監視開始成功時のcallback処理
	 */
	function startMonitoringSuccess() {
		console.log("Beacon監視開始しました。");
	}

	/**
	 * Beaconの監視開始失敗時のcallback処理
	 */
	function startMonitoringError(error) {
		console.log("Beaconの監視開始に失敗しました。");
		console.log(error);
	}

	/**
	 * Beaconの監視開始成功時のcallback処理
	 */
	function stopMonitoringSuccess() {
		console.log("Beacon監視を終了しました。");
	}

	/**
	 * Beaconの監視開始失敗時のcallback処理
	 */
	function stopMonitoringError(error) {
		console.log("Beaconの監視の終了に失敗しました。");
	}

	/*
	 * 画面初期表示処理
	 */
	document.addEventListener("deviceready", function() {
		console.log("Beaconの初期化開始。");
		// Beacon API の初期化
		applican.beacon.init(initBeaconSuccess, initBeaconError);

		$("#clearBeacon").on("touchend", function(){
			applican.beacon.stopMonitoring(stopMonitoringSuccess, stopMonitoringError);
		});
	});
})();
