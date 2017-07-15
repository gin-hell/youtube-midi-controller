

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    console.log("client library loaded")
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');   
}


document.addEventListener("keyup", function(event){

    if(event.keyCode == 13){
        search();
    }
});

var button = document.getElementById("button");

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: "video",
        q: document.getElementById("query").value
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.

var results;
var selector = document.getElementById("selector");

function onSearchResponse(response) {
    results = response.result.items;
    selector = document.getElementById("selector");

    while (selector.options.length > 0) {                
        selector.remove(0);
        
    }

    for (var i = 0; i < results.length; i++) {
    	console.log(results[i]);
    	var opt = document.createElement("option");
    	opt.text = results[i].snippet.title;
    	opt.value = i;
    	document.getElementById("selector").add(opt);
    }

}

function selection(){
    selector = document.getElementById("selector");
    console.log(results[selector.value].id.videoId);
    selectionId = results[selector.value].id.videoId;

    player.loadVideoById(selectionId);

}

//~~~~~~~//~~~~~~~//~~~~~~~//~~~~~~~ youtube player api ~~~~~~~//~~~~~~~//~~~~~~~//~~~~~~~//

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var selectionId;

function onYouTubeIframeAPIReady() {
    // console.log("youtube player ready")

    player = new YT.Player("player",{ 
        height: '390',
        width: '640',
        videoId: selectionId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });


}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) { 
    player.controls=0;
    player.modestbranding=1;
}

// 5. The API calls this function when the player's state changes.
var currentTime;

function onPlayerStateChange(event) {
    if ( player.getPlayerState() == 1 ) {
    currentTime = setInterval(getCurrentTime, 100);
    }
 }


//~~~~~~~//~~~~~~~//~~~~~~~//~~~~~~~ youtube player functions ~~~~~~~//~~~~~~~//~~~~~~~//~~~~~~~//

var duration;


function getCurrentTime() {
    currentTime = player.getCurrentTime();
}



function play() {
    clearInterval(myLoop);
    // player.setPlaybackRate(1);
    player.playVideo()
}



function pause() {
    clearInterval(myLoop);
    player.pauseVideo()
}



var i = 1; 

function playbackRate() {
    var playbackRates = [0.5, 1, 1.25, 1.5, 2]
    player.setPlaybackRate(playbackRates[playbackVel]); 
    // console.log( playbackVel );

}


function rewind() {
    time = player.getCurrentTime();
    player.seekTo(time - 1);
}


function fastforward() {
    time = player.getCurrentTime();
    player.seekTo(time + 1);
}


var newIdIndex = selector.value;

function nextVideo(){
    newIdIndex = (newIdIndex + 1) % 5;
    player.loadVideoById( results[newIdIndex].id.videoId );
}



function prevVideo() {
    if (newIdIndex > 0) { ( newIdIndex = newIdIndex - 1) % 5; 
    } else {newIdIndex =  4}
    player.loadVideoById( results[newIdIndex].id.videoId );
}



var myLoop;
var loopSize;

function loop() {
    loopSize;
    clearInterval(myLoop);
    var time = player.getCurrentTime();
    console.log(time);
    myLoop = setInterval( function() { player.seekTo(time) }, (loopSize * 1000));
}

var volume;

function vol() {
    player.setVolume( volume )
}


