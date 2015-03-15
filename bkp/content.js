var scriptContent = " \
	var runLoop = function () { \
		if (localStats.byteCount < localStats.memoryCapacity) {	\
			var t = CoffeeCup.calcBytesPerClick()*20;	\
			localStats.byteCount + t > localStats.memoryCapacity && (t = localStats.memoryCapacity - localStats.byteCount), localStats.byteCount += t,	\
			popManager.newPop('btn-addMem', '+' + NumUtils.byteConvert(t, 2))	\
		} else dripper.dripGlobal(!1); \
		setTimeout(runLoop,1000); \
	}; \
	setTimeout(runLoop,5*1000); \
	";

//var scriptContent = "alert('Injected'); alert(localStats.byteCount);";
var script = document.createElement('script');
script.id = 'tmpScript';
script.appendChild(document.createTextNode(scriptContent));
(document.body || document.head || document.documentElement).appendChild(script);