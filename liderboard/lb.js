//======================================================================================================================
//TOP20, looking from user to top

var lbFull = [];
var LB_PLACES = 20;
uiElemManager.leaderboard.show();
function get_lb(username, callback) {
	$.ajax({ type : "POST", url : GAME_URL + "lb", data : { name : username }, success : function (e) { 
		lbFull[0]=e.lb[0];
		if (e.lb[1].rank <= LB_PLACES) {
			lbFull[e.lb[1].rank-1]=e.lb[1];
		}
		if (e.lb[1].rank > 2) {
			get_lb(e.lb[1].name, callback);
		} else callback();
	}});
}
var someuser = "pd";	// 32 place
setInterval('get_lb("'+someuser+'", function () { LeaderBoardUI.createLeaderboardTable(lbFull); });', 10000);

//======================================================================================================================
//from user 10 upper
//don't call this for TOP2 players

var lbFull = [];
var LB_PLACES = 10;
uiElemManager.leaderboard.show();
function get_lb(username, curId, callback) {
	$.ajax({ type : "POST", url : GAME_URL + "lb", data : { name : username }, success : function (e) { 
		if (curId == LB_PLACES) {
			var userRank = e.lb[2].rank;
			if (userRank < LB_PLACES+1) curId=userRank-1;
		}
		if (e.lb[2].rank == 3) {
			lbFull[curId]=e.lb[2];
			lbFull[--curId]=e.lb[1];
			lbFull[--curId]=e.lb[0];
		} else lbFull[curId]=e.lb[2];
		if (curId > 0) {
			get_lb(e.lb[1].name, --curId, callback);
		} else callback();
	}});
}
setInterval('get_lb("'+networkUser.userName+'", LB_PLACES, function () { LeaderBoardUI.createLeaderboardTable(lbFull); });', 5000);