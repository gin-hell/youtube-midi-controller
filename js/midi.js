var midi;
var midiDevices = [];

if (navigator.requestMIDIAccess) {
	    navigator.requestMIDIAccess({
			sysex: false
	    }).then(onMIDISuccess, onMIDIFailure);

} else {
    alert("No MIDI support in this browser, please use Chrome");
}

function onMIDISuccess(MIDIAccess) {
    // when we get a succesful response, run this code
	console.log(MIDIAccess);

	midi = MIDIAccess;

	var inputs = midi.inputs.values();

	for ( var input = inputs.next(); input && !input.done; input = inputs.next() ) {
		input.value.onmidimessage = onMIDIMessage;
	}
}





function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("error: " + error);
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

var sessionStorageControls = sessionStorage;
var sessionStorageEmpty = sessionStorage.clear();


function onMIDIMessage(event) {
    // console.log(window.document.hasFocus());
    data = event.data;
    if (window.document.hasFocus == true){
        sessionStorage = sessionStorageControls;
        // console.log(data);
    } else if (window.document.hasFocus == false) {
        sessionStorage.clear();
        // console.log(data);
    }

	
	channel = data[0];
    note = data[1];
    vel = data[2];

//open new window !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (newWindowListening == true){
        newWindowChan = channel;
        newWindowNote = note;
        sessionStorage.setItem( "newWindowNote", note );
        newWindowListening = false;
        modal2.style.display = "none";
        document.getElementById('new').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("newWindowNote")) {
        newWindowVel = vel/127;
    }

    if (newWindowVel>0){
        // openNewWindow();
    }


//play
    if (playListening == true){
    	playChan = channel;
    	playNote = note;
    	sessionStorage.setItem( "playNote", note );
    	playListening = false;
    	modal2.style.display = "none";
        document.getElementById('play').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("playNote")) {
    	playVel = vel/127;
    }

    if (playVel>0){
    	play()
    }


//pause
    if (pauseListening == true){
    	pauseChan = channel;
    	pauseNote = note;    	
    	sessionStorage.setItem( "pauseNote", note );
		pauseListening = false;
    	modal2.style.display = "none";
        document.getElementById('pause').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("pauseNote")) {
    	pauseVel = vel/127;
    }

    if (pauseVel>0){
    	pause();
    }


//previous video
    if (prevListening == true) {
    	prevChan = channel;
    	prevNote = note;
        sessionStorage.setItem( "prevNote", note );
		prevListening = false;
    	modal2.style.display = "none";
        document.getElementById('prev').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("prevNote")) {
    	prevVel = vel/127;
    }

    if (prevVel>0){
    	prevVideo();
    }


//next video
    if (nextListening == true) {
    	nextChan = channel;
    	nextNote = note;
        sessionStorage.setItem( "nextNote", note );
    	nextListening = false;
    	modal2.style.display = "none";
        document.getElementById('next').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("nextNote")) {
    	nextVel = vel/127;
    }

    if (nextVel>0){
    	nextVideo();
    }


//rewind 1 sec
    if (rewindListening == true) {
    	rewindChan = channel;
    	rewindNote = note;
        sessionStorage.setItem( "rewindNote", note );
    	rewindListening = false;
    	modal2.style.display = "none";
        document.getElementById('rewind').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("rewindNote")) {
    	rewindVel = vel/127;
    } 

    if (rewindVel>0) {
    	rewind();
    }


//fastforward 1 sec
    if (fastforwardListening == true) {
        fastforwardChan = channel;
        fastforwardNote = note;
        sessionStorage.setItem( "fastforwardNote", note );
        fastforwardListening = false;
        modal2.style.display = "none";
        document.getElementById('fastforward').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("fastforwardNote")) {
        fastforwardVel = vel/127;
    } 

    if (fastforwardVel>0) {
        fastforward();
    }


//loop on-off
    if (loopListening == true) {
    	loopChan = channel;
    	loopNote = note;
        sessionStorage.setItem( "loopNote", note );
    	loopListening = false;
    	modal2.style.display = "none";
        document.getElementById('loop').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("loopNote")) {
    	loopVel = vel/127;
    } 

    if (loopVel>0) {
    	loop();
    }


//playback rate
    if (playbackListening == true) {
    	playbackChan = channel;
    	playbackVel = vel;
        sessionStorage.setItem( "playbackNote", note );
    	playbackListening = false;
    	modal2.style.display = "none";
        document.getElementById('playback').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("playbackNote")) {
		
		playbackVel = Math.round((vel/127)*4);
  
    	playbackRate();
    }


//loop size
    if (sizeListening == true) {
    	sizeChan = channel;
    	sizeVel = vel;
        sessionStorage.setItem( "sizeNote", note );
    	sizeListening = false;
    	modal2.style.display = "none";
        
        document.getElementById('width').style.backgroundColor = "transparent";
    }

    if (note == sessionStorage.getItem("sizeNote")) {
		
		loopSize = (vel/127) + 0.01;

    }


//volume
    if (volListening == true) {
        volChan = channel;
        volVel = vel;
        sessionStorage.setItem( "volNote", note );
        volListening = false;
        modal2.style.display = "none";
        document.getElementById('vol').style.backgroundColor = "transparent";

    }

    if (note == sessionStorage.getItem("volNote")) {
        
        vol();
        volume = Math.round((vel/127) * 100);
        // console.log(volume);

    }


}





// buttons:

var modal2 = document.getElementById("modal2");
var close2 = document.getElementById("close2");	


// open new window !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function openNewWindowMIDI(){

    var img = document.getElementById('new');
    img.style.backgroundColor = "#ff0002";
    newWindowListening = true;

    modal2 = document.getElementById("modal2");
    close2 = document.getElementById("close2");     

    modal2.style.display = "block";
    close2.onclick = function() {
        modal2.style.display = "none";
        img.style.backgroundColor = "transparent";
    }
}


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






