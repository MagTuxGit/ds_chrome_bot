	var runLoop = function () {
		if (uiElemManager.networkError.el()[0].style.display != '') {
			location.reload();
		};
		var pu = localStats.powerUps[0]; 
		var upg = pu.upgrades[0]; 
		if (document.getElementById('upg1')!=null && upg.available) {
			upg.buy(localStats),
			popManager.newPop("upg1", "+1 " + pu.name)
		} else
		if (document.getElementById('pu1')!=null && pu.available) {
			pu.buy(localStats),
			popManager.newPop("pu1", "+1 " + pu.name)
		} else
		if (localStats.byteCount < localStats.memoryCapacity) {
			var t = CoffeeCup.calcBytesPerClick()*20;
			localStats.byteCount + t > localStats.memoryCapacity && (t = localStats.memoryCapacity - localStats.byteCount), localStats.byteCount += t,
			popManager.newPop('btn-addMem', '+' + NumUtils.byteConvert(t, 2))
		} else dripper.dripGlobal(!1);
		setTimeout(runLoop,1001);
	};
	runLoop();