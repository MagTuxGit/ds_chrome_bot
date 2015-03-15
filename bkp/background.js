var Background = {};
var rExp = /dripstat\.com\/game/;

Background.togglePlayPause = function() {
	var changeIcon = function (iconName) {
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (var i=0; i < tabs.length; ++i) {
				if (rExp.test(tabs[i].url)) {
					var img = new Object();
					img.path = chrome.extension.getURL(iconName);
					img.tabId = tabs[i].id;
					chrome.pageAction.setIcon(img);
				}
			}
		});
	}

	if (Engine.isPlay) {
		changeIcon('offline.jpg');
		Engine.pause();
	} else {
		changeIcon('online.jpg');
		Engine.play();
	}
}

function init() {
	console.log("init");
	
	// show icon in address bar
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (rExp.test(tab.url)) {
			var img = new Object();
			if (Engine.isPlay) {
				img.path = chrome.extension.getURL('online.jpg');
			} else {
				img.path = chrome.extension.getURL('offline.jpg');
			}
			img.tabId = tab.id;
			chrome.pageAction.setIcon(img);
			chrome.pageAction.show(tabId);
		}
	});
	
	chrome.pageAction.onClicked.addListener(function (tab) {
		Background.togglePlayPause();
	});
}

var Engine = {};

Engine.isPlay = false;

Engine.play = function() {
	if (Engine.isPlay)
		return;
	console.log("game resumed");
	Engine.isPlay = true;
	Engine.start();
};

Engine.pause = function() {
	if (!Engine.isPlay)
		return;
	Engine.stop();
	Engine.isPlay = false;
	console.log("game paused");
};

Engine.start = function () {
	// start function
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
		chrome.tabs.sendMessage(arrayOfTabs[0].id, { text: "start" }, function(e) {
			//some check maybe
		});
  });
};

Engine.stop = function () {
	// stop function
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
		chrome.tabs.sendMessage(arrayOfTabs[0].id, { text: "stop" }, function(e) {
			//some check maybe
		});
  });
};

init();