const scales = data["scales"];
const socket = io();


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function map_chan1_0to47(){
    console.log("working?");
    //clean up this MIDI stuff later, abstract into a few functions
    function on_midi_success(midi) {        
        midi.outputs.forEach(function (port, port_id) {
            if(port.name == "IAC Driver INTERSTICES"){
                
                //clear channel of all MIDI
                for( let i = 0; i < 127; i++ ) {
                    port.send([144, i, 0]);
                }
                sleep(20);
                console.log("map it now!");
                //send range for mapping
                port.send([144, 0, 127]);
                port.send([144, 47, 127]);

                sleep(3000);
                console.log("mapping off");
                //clear channel of all MIDI
                for( let i = 0; i < 127; i++ ) {
                    port.send([144, i, 0]);
                }   
            }
        })
    }

    function on_midi_failure(error_code) {
        console.error("Could not connect to MIDI: error code " + error_code);
    }

    navigator.requestMIDIAccess().then(on_midi_success, on_midi_failure);

}

function recieving_and_transmitting_index(){
    console.log("receiving scale index!");

    //clean up this MIDI stuff later, abstract into a few functions
    function on_midi_success(midi) {        
        midi.outputs.forEach(function (port, port_id) {
            if(port.name == "IAC Driver INTERSTICES"){
                //coming in from the server
                //index # is then transmitted: port.send([144, index#, 127]);
                socket.on('scale_index', (msg) => {
                    console.log("sending ", scales[msg].video_index-1, " to IAC Driver INTERSTICES");
                    //clear channel of all MIDI
                    for( let i = 0; i < 127; i++ ) {
                        port.send([144, i, 0]);
                    }
                    port.send([144, scales[msg].video_index-1, 127]);
                    //console.log("rendering notation to client");
                    render_notation(msg);
                })

            }
        })
    }

    function on_midi_failure(error_code) {
        console.error("Could not connect to MIDI: error code " + error_code);
    }

    navigator.requestMIDIAccess().then(on_midi_success, on_midi_failure);

}
