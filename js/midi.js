var midi;
var midiDevices = [];

if (navigator.requestMIDIAccess) {
	    navigator.requestMIDIAccess({
			sysex: false
	    }).then(onMIDISuccess, onMIDIFailure);

} else {
    alert("No MIDI support in this browser, please use Chrome; OR please allow MIDI access in browser");
}

function onMIDISuccess(MIDIAccess) {
    // when we get a succesful response, run this code
	console.log("Successful MIDIAccess response");

	midi = MIDIAccess;

	var inputs = midi.inputs.values();

	for ( var input = inputs.next(); input && !input.done; input = inputs.next() ) {
		input.value.onmidimessage = onMIDIMessage;
        console.log(input.value.onmidimessage);
	}
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("error: " + error);
}

if (localStorage.length > 0) {
    console.log("Previous settings succesfully loaded")
}


var data;
var channel;
var note;
var vel;

var playChan;
var playNote;
var playVel;
var playListening = false;

var pauseChan;
var pauseNote;
var pauseVel;
var pauseListening = false;

var prevChan;
var prevNote;
var prevVel;
var prevListening = false;

var nextChan;
var nextNote;
var nextVel;
var nextListening = false;

var rewindChan;
var rewindNote;
var rewindVel;
var rewindListening = false;

var fastforwardChan;
var fastforwardNote;
var fastforwardVel;
var fastforwardListening = false;

var playbackChan;
var playbackNote;
var playbackVel;
var playbackListening = false;

var loopChan;
var loopNote;
var loopVel;
var loopListening = false;

var sizeChan;
var sizeNote;
var sizeVel;
var sizeListening = false;

var volChan;
var volNote;
var volVel;
var volListening = false;

var newWindowChan;
var newWindowNote;
var newWindowVel;
var newWindowListening = false;

// var localStorageControls = localStorage;
// var localStorageEmpty = localStorage.clear();


function onMIDIMessage(event) {
    data = event.data;

	
	channel = data[0];
    note = data[1];
    vel = data[2];


//play
    if (playListening == true){
    	playChan = channel;
    	playNote = note;
    	localStorage.setItem( "playNote", note );
    	playListening = false;
    	modal2.style.display = "none";
        document.getElementById('play').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("playNote")) {
    	playVel = vel;
    }

    if (playVel==127){
    	play()
    }


//pause
    if (pauseListening == true){
    	pauseChan = channel;
    	pauseNote = note;    	
    	localStorage.setItem( "pauseNote", note );
		pauseListening = false;
    	modal2.style.display = "none";
        document.getElementById('pause').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("pauseNote")) {
    	pauseVel = vel;
    }

    if (pauseVel==127){
    	pause();
    }


//previous video
    if (prevListening == true) {
    	prevChan = channel;
    	prevNote = note;
        localStorage.setItem( "prevNote", note );
		prevListening = false;
    	modal2.style.display = "none";
        document.getElementById('prev').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("prevNote")) {
    	prevVel = vel;
    }

    if (prevVel==127){
    	prevVideo();
    }


//next video
    if (nextListening == true) {
    	nextChan = channel;
    	nextNote = note;
        localStorage.setItem( "nextNote", note );
    	nextListening = false;
    	modal2.style.display = "none";
        document.getElementById('next').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("nextNote")) {
    	nextVel = vel;
    }

    if (nextVel==127){
    	nextVideo();
    }


//rewind 1 sec
    if (rewindListening == true) {
    	rewindChan = channel;
    	rewindNote = note;
        localStorage.setItem( "rewindNote", note );
    	rewindListening = false;
    	modal2.style.display = "none";
        document.getElementById('rewind').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("rewindNote")) {
    	rewindVel = vel;
    } 

    if (rewindVel==127) {
    	rewind();
    }


//fastforward 1 sec
    if (fastforwardListening == true) {
        fastforwardChan = channel;
        fastforwardNote = note;
        localStorage.setItem( "fastforwardNote", note );
        fastforwardListening = false;
        modal2.style.display = "none";
        document.getElementById('fastforward').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("fastforwardNote")) {
        fastforwardVel = vel;
    } 

    if (fastforwardVel==127) {
        fastforward();
    }


//loop on-off
    if (loopListening == true) {
    	loopChan = channel;
    	loopNote = note;
        localStorage.setItem( "loopNote", note );
    	loopListening = false;
    	modal2.style.display = "none";
        document.getElementById('loop').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("loopNote")) {
    	loopVel = vel;
    } 

    if (loopVel==127) {
    	loop();
        if (true) {}
    }


//playback rate
    if (playbackListening == true) {
    	playbackChan = channel;
    	playbackVel = vel;
        localStorage.setItem( "playbackNote", note );
    	playbackListening = false;
    	modal2.style.display = "none";
        document.getElementById('playback').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("playbackNote")) {
		
		playbackVel = Math.round((vel/127)*4);
  
    	playbackRate();
    }



//loop size
    if (sizeListening == true) {
    	sizeChan = channel;
    	sizeVel = vel;
        localStorage.setItem( "sizeNote", note );
    	sizeListening = false;
    	modal2.style.display = "none";
        
        document.getElementById('width').style.backgroundColor = "transparent";
    }

    if (note == localStorage.getItem("sizeNote")) {
		
		loopSize = (vel/127) + 0.02;
        loopSizeChanged(loopSize)
        console.log(loopSize);

    }
    function loopSizeChanged(loopSize) {
        loop()

    }


//volume
    if (volListening == true) {
        volChan = channel;
        volVel = vel;
        localStorage.setItem( "volNote", note );
        volListening = false;
        modal2.style.display = "none";
        document.getElementById('vol').style.backgroundColor = "transparent";

    }

    if (note == localStorage.getItem("volNote")) {
        
        vol();
        volume = Math.round((vel/127) * 100);
        // console.log(volume);

    }


}





// buttons:

var modal2 = document.getElementById("modal2");
var close2 = document.getElementById("close2");	



function playMIDI(target) {

    var img = document.getElementById('play');
    img.style.backgroundColor = "#ff0002";
	playListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");		

	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}
}


function pauseMIDI() {

    var img = document.getElementById('pause');
    img.style.backgroundColor = "#ff0002";

	pauseListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");

	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}
}


function prevMIDI() {

    var img = document.getElementById('prev');
    img.style.backgroundColor = "#ff0002";
    
	prevListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");
	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}

}

function fastforwardMIDI() {

    var img = document.getElementById('fastforward');
    img.style.backgroundColor = "#ff0002";

    fastforwardListening = true;

    modal2 = document.getElementById("modal2");
    close2 = document.getElementById("close2");
    modal2.style.display = "block";
    close2.onclick = function() {
        modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
    }

}


function nextMIDI() {

    var img = document.getElementById('next');
    img.style.backgroundColor = "#ff0002";

	nextListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");
	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}
}


function rewindMIDI() {

    var img = document.getElementById('rewind');
    img.style.backgroundColor = "#ff0002";

	rewindListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");
	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}	
}


function loopMIDI() {

    var img = document.getElementById('loop');
    img.style.backgroundColor = "#ff0002";

	loopListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");
	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}	
}






// knobs/faders:
function playbackMIDI() {
    
    var img = document.getElementById('playback');
    img.style.backgroundColor = "#ff0002";

	playbackListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");
	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}	
}


function loopSizeMIDI() {

    var img = document.getElementById('width');
    img.style.backgroundColor = "#ff0002";

	sizeListening = true;

	modal2 = document.getElementById("modal2");
	close2 = document.getElementById("close2");
	modal2.style.display = "block";
	close2.onclick = function() {
		modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
	}	
}

function volMIDI() {

    var img = document.getElementById('vol');
    img.style.backgroundColor = "#ff0002";

    volListening = true;

    modal2 = document.getElementById("modal2");
    close2 = document.getElementById("close2");
    modal2.style.display = "block";
    close2.onclick = function() {
        modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
    }   
}






