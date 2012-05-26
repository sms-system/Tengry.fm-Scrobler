var breakTime = 3000;

var onAir, artist, song;
var lastOnAir="";
function getNowPlayingInfo() {
	onAir = document.getElementById("onair").childNodes[1].textContent;
	var separatorPosition = onAir.indexOf(" - ");
	if (separatorPosition > 0 && onAir != lastOnAir) {
		artist = onAir.substring(0, separatorPosition);
		song = onAir.substring(separatorPosition + 3);
		lastOnAir = onAir;
		alert(artist+"/"+song);
	}
	setTimeout(getNowPlayingInfo,breakTime);
}
function getOnAir() {
	x = new XMLHttpRequest();
	x.onreadystatechange = function() {
		if (x.readyState != 4) return;
		clearTimeout(timer);
		if (x.status==200) {
			onAir=x.responseText;
			scroble();
		}
		x.open("GET","http://tengryfm.kz/cron/player-get-tracklist.php?f=getCurTrack",true);
	}
}
getNowPlayingInfo();