var breakTime = 3000;

var onAir, artist, song;
var lastOnAir="";
function getNowPlayingInfo() {
	getOnAir();
	setTimeout(getNowPlayingInfo,breakTime);
}
function getOnAir() {
	var timer;
	x = new XMLHttpRequest();
	x.onreadystatechange = function() {
		if (x.readyState != 4) return;
		if (x.status==200) {
			onAir=x.responseText;
			scroble();
		}
		x.open("GET","http://tengryfm.kz/cron/player-get-tracklist.php?f=getCurTrack",true);
		x.send();
	}
}
function scroble() {
	var separatorPosition = onAir.indexOf(" - ");
	if (separatorPosition > 0 && onAir != lastOnAir) {
		artist = onAir.substring(0, separatorPosition);
		song = onAir.substring(separatorPosition + 3);
		lastOnAir = onAir;
		alert(artist+"/"+song);
	}
}
getNowPlayingInfo();