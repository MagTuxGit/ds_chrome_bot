var cursorLvl = localStats.powerUps[0].purchasedUpgrades.length;
var clicksPs = 20;
var clicksQuot = clicksPs*cursorLvl/10+1;
var totalBps;

var nextBuyObject;
var nextBuyElement;
var nextBuyPrice;
var nextBuyTime = 999999999;

var showInfo = function () {
	var botDiv = document.getElementById('botInfo');
	if (botDiv==null) {
		botDiv = document.createElement('div');
		botDiv.id = 'botInfo';
		document.getElementById('middleColumn').appendChild(botDiv);		
	};
	botDiv.innerHTML = ' \
		<span style=\'font-size: 30px; text-align:left;\'>totalBps = '+totalBps.toFixed(0)+'</span><br> \
		<span style=\'font-size: 30px; text-align:left;\'>nextBuyObject = '+nextBuyObject.name+'</span><br> \
		<span style=\'font-size: 30px; text-align:left;\'>nextBuyPrice = '+nextBuyPrice.toFixed(0)+'</span><br> \
		<span style=\'font-size: 30px; text-align:left;\'>nextBuyTime = '+nextBuyTime.toFixed(1)+' minutes</span><br> \
	';
};

var getNextBuy = function () {
	nextBuyTime = 999999999;
	for (var n = 0; n < localStats.powerUps.length; n++) {
		if (document.getElementById('pu'+(n+1))!=null) {
			var curPu = localStats.powerUps[n];
			var puTimeBuy = Math.max(0,(curPu.currentPrice-localStats.byteCount)/totalBps);
			var currentPrice = (curPu.currentPrice<=localStats.memoryCapacity) ? (curPu.currentPrice) : (curPu.currentPrice*2-localStats.memoryCapacity);
			var puTime = (currentPrice/(curPu.currentBps*clicksQuot)+puTimeBuy)/60;
			if (puTime<nextBuyTime) {
				nextBuyTime=puTime;
				nextBuyPrice=curPu.currentPrice;
				nextBuyObject=curPu;
				nextBuyElement='pu'+(n+1);
			};

			if (curPu.upgrades.length>0) {
				var curUp = curPu.upgrades[0]; 
				var upTimeBuy = Math.max(0,(curUp.price-localStats.byteCount)/totalBps);
				var cursorBonus = (n==0) ? (clicksPs*localStats.bps*0.1) : 0;
				var currentPrice = (curUp.price<=localStats.memoryCapacity) ? (curUp.price) : (curUp.price*2-localStats.memoryCapacity);
				var upTime = (curUp.price/(curPu.totalBps*0.1*clicksQuot+cursorBonus)+upTimeBuy)/60;
				if (upTime<nextBuyTime) {
					nextBuyTime=upTime;
					nextBuyPrice=curUp.price;
					nextBuyObject=curUp;
					nextBuyElement='upg1';
				};
			};
		};
	};
	showInfo();
};

var runLoop = function () {
	if (uiElemManager.networkError.el()[0].style.display != '') {
		location.reload();
	};
	if (nextBuyTime==999999999) {
		getNextBuy();
	};
	if (nextBuyPrice>localStats.memoryCapacity) {
		if (localStats.byteCount > nextBuyPrice-localStats.memoryCapacity) {
			dripper.dripGlobal(!1);
		};
	};
	if (localStats.byteCount>=nextBuyPrice) {
		nextBuyObject.buy(localStats),
		popManager.newPop(nextBuyElement, '+1 ' + nextBuyObject.name),
		totalBps=localStats.bps+clicksPs*CoffeeCup.calcBytesPerClick(),
		getNextBuy();
	};
	if (localStats.byteCount < localStats.memoryCapacity) {
		var t = CoffeeCup.calcBytesPerClick()*clicksPs;
		localStats.byteCount + t > localStats.memoryCapacity && (t = localStats.memoryCapacity - localStats.byteCount), localStats.byteCount += t,
		popManager.newPop('btn-addMem', '+' + NumUtils.byteConvert(t, 2))
	} else dripper.dripGlobal(!1);
	setTimeout(runLoop,1001);
};
totalBps=localStats.bps+clicksPs*CoffeeCup.calcBytesPerClick();
runLoop();