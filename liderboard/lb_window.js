//uiElemManager.leaderboard.show();

var PLACES = 100;
var lbFull = [];
function get_lb(username, callback) {
	$.ajax({ type : "POST", url : GAME_URL + "lb", data : { name : username }, success : function (e) { 
		lbFull[0]=e.lb[0];
		if (e.lb[1].rank < PLACES) {
			lbFull[e.lb[1].rank-1]=e.lb[1];
		}
		if (e.lb[1].rank > 2) {
			get_lb(e.lb[1].name, callback);
		} else callback();
	}});
}
get_lb("pd", function () { createLeaderboardTable(lbFull); });

var lbTab = ' \
	<html>	\
		<head> \
			<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"> \
			<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"> \
			<link rel="stylesheet" href="https://dripstat.com/game/combined.2015-02-21-04-39-35.min.css"> \
			<style type="text/css">.cf-hidden { display: none; } .cf-invisible { visibility: hidden; }</style> \
		</head> \
		<body> \
			<table id="lbTab" class="table table-condensed"> \
			</table> \
		</body> \
	</html> \
';

function createLeaderboardTable (t) {
	if (t !== void 0 && null != t && t.length > 0) {
		for (var a = "<tbody>", r = !1, n = 0; t.length > n; n++) {
			var o = t[n],
			i = !1,
			s = "<tr>";
			null != networkUser && o.name === networkUser.userName && (s = "<tr class='success'>", i = !0, r = !0),
			a += i ? _.str.sprintf(s + "<td>%s</td><td><a id='ldbdUser' href='#'>%s</a></td><td>%s</td></tr>", o.rank, o.name, NumUtils.byteConvert(o.score, 2)) : _.str.sprintf(s + "<td>%s</td><td>%s</td><td>%s</td></tr>", o.rank, o.name, NumUtils.byteConvert(o.score, 2))
		}
		a += "</tbody>";
		var lbWindow = window.open("","","resizable=1;width=400,height=400");
		lbWindow.document.write(lbTab);
		lbWindow.document.getElementById("lbTab").innerHTML = a;
		//console.log(a);
	}
}