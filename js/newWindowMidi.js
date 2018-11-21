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

	// var i = 0;
	// for (var input of midi.inputs.values()) {
	// 	var opt = document.createElement("option");
	// 	opt.text = input.name;
	// 	opt.value = i;
	// 	midiDevices.push( input );
	// 	document.getElementById("inputselector").add(opt);
	// 	i++;
	//  }	

	// document.getElementById("inputselector").addEventListener("change",function(){
	// 	for (var i = 0; i < midiDevices.length; i++) {
	// 		midiDevices[i].onmidimessage = null;
	// 	};
	// 	midiDevices[this.value].onmidimessage = onMIDIMessage;

	// });

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



function onMIDIMessage(event) {

    data = event.data;

    // console.log(data);
	
	channel = data[0];
    note = data[1];
    vel = data[2];



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
		
		loopSize = (vel/127) + 0.05;

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
        volume = Math.round((vel/127) * 80);
        console.log(volume);

    }


}










