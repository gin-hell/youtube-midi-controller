

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3'/*, onYouTubeApiLoad */);
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');  
    console.log("new window client library loaded")
}

function onYouTubeIframeAPIReady() {
    // console.log("youtube player ready")

    player = new YT.Player("newWindowPlayer",{ 
        height: '360',
        width: '640',
        videoId: selectionId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }, playerVars: { 
            'controls': 0, 
            'showinfo': 0,
            'rel' : 0,
            'fs' : 0,
        }
    });


}


// function search() {
//     // Use the JavaScript client library to create a search.list() API call.

//     request = gapi.client.youtube.videos.list({
//         part: 'snippet',
//         type: "video",
//         chart: "mostPopular",
//         maxResults: "50"
//     });
    
//     // Send the request to the API server,
//     // and invoke onSearchRepsonse() with the response.
//     request.execute(getTrending);
// }

// Called automatically with the response of the YouTube API request.

var results;

// function getTrending(response){

//     var randomId = Math.floor(Math.random()*25);
// 	console.log(response.result.items[randomId].id);
    
//     player.loadVideoById(response.result.items[randomId].id);

// }

//~~~~~~~//~~~~~~~//~~~~~~~//~~~~~~~ youtube player api ~~~~~~~//~~~~~~~//~~~~~~~//~~~~~~~//

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var selectionId;



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) { 
    player.controls=0;
    player.modestbranding=1;
    // search();
}

// 5. The API calls this function when the player's state changes.
var currentTime;

function onPlayerStateChange(event) {
    if ( player.getPlayerState() == 1 ) {
    currentTime = setInterval(getCurrentTime, 100);
    }
 }






