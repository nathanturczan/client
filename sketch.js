
const scales = data["scales"]
const startingScale = scales["c_diatonic"]
var canvas;
var curr_scale = "c_diatonic";
var lastclick;
var lastAutoPChange;
var autopilotIsRunning = false;

const socket = io();




//p5 has keyReleased()
//p5 has windowResize() -- check this out later

function drawGradient() {
    background(127, 127, 127);
    
    //this sucks, use an png
    //or use the css gradient functions
}

function setup() {
    ellipseMode(RADIUS);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    drawGradient();
    pick_scale(curr_scale);
    frameRate(30); //there are other ways to do timing, like setInterval()
}

//abstract the logic in here into separate classes
//

function mouseClicked() {
    lastclick = frameCount;
    autopilotIsRunning = false;
    //console.log("touch data", touch_data);
    var key;
    for (let i = 0; i < touch_data.length; i++){
        if (Math.abs(mouseX - touch_data[i].x) < touch_data[i].ssize && Math.abs(mouseY - touch_data[i].y) < touch_data[i].ssize){
            key = touch_data[i].k;
            touch_data = [];
            drawGradient();
            console.log(key);
        }
    }
    pick_scale(key);
}



function draw() {
    // if ((frameCount - lastclick) >= 500 && autopilotIsRunning == false ) {
    //     // generate random key here when autopilot is enabled
    //     // var randomKey = ....
    //     autopilot();
    //     // once autopilot is enabled - we need a boolean to say whether its running
    //     autopilotIsRunning = true;
        
    // }
    // else if ((frameCount - lastAutoPChange) >= 250 && autopilotIsRunning == true) {
    //     autopilot();
    // }
}

function autopilot() {
  lastAutoPChange = frameCount;
  drawGradient();

  // for random adjacent
  // keep track of last scale name
  // get random adjacent from last scale name
  // instead of random scale - get random adjacent from last randomKey
  var r = random(scale_names);


  console.log("autoscale", r, scales[r]);

  pick_scale(r);
}

//make the keys navigate the same journey as the touch
//maybe just add 49 rather than using a dictionary
const num_convert = {49 : 0, 50 : 1, 51 : 2, 52 : 3 , 53 : 4, 54 : 5};

function keyPressed()
{
    //drawGradient();
    //pick_scale(curr_scale);

}


function killswitch(){
    //clean up this MIDI stuff later, abstract into a few functions
    function on_midi_success(midi) {
        console.log("KILLSWITCH SUCCESSFUL");
        midi.outputs.forEach(function (port, port_id) {
            if(port.name == "IAC Driver INTERSTICES"){
            for( let i = 0; i < 127; i++ ) {
                port.send([144, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([145, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([146, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([147, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([148, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([149, i, 0]);
            }
        }
    })
}
    function on_midi_failure(error_code) {
        console.error("Could not connect to MIDI: error code " + error_code);
    }

    navigator.requestMIDIAccess().then(on_midi_success, on_midi_failure);

}



function pick_scale(key) {
    render_notation(key);
    index = num_convert[keyCode];

    if (index !== undefined && (index) < scales[key].adjacent_scales.length) {
        key = scales[key].adjacent_scales[index];
        curr_scale = key;
    }
    
    drawScale(key, windowWidth / 2, windowHeight / 2, 1, [], -1);

    function on_midi_success(midi) {
        console.log("MIDI connection was successful");
        midi.outputs.forEach(function (port, port_id) {
            if(port.name == "IAC Driver INTERSTICES"){
            for( let i = 0; i < 127; i++ ) {
                port.send([144, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([145, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([146, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([147, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([148, i, 0]);
            }
            for( let i = 0; i < 127; i++ ) {
                port.send([149, i, 0]);
            }
            var superset = scales[key]["chord_subsets"];
            

            var subset = random(superset);
            //console.log(subset);
            socket.emit('scale_index', key);
            //for(let i = 0; i < 5; i++){
                //port.send([144, 0, 127]);
                //port.send([144, 47, 127]);
                //video_indexer

                //bass
                //port.send([145, scales[key].root+48, 127]);

                //port.send([144, 60 + (voicings[subset]["root_transposed_to_zero"][i]), 127]);
                //console.log(60 + (voicings[subset]["root_transposed_to_zero"][i]));
                //port.send([145, scales[key].pitch_classes[0]+24, 127]);
                //port.send([145, scales[key].pitch_classes[0]+36, 127]);
                //port.send([145, scales[key].pitch_classes[0]+48, 127]);
                //port.send([145, scales[key].pitch_classes[4]+48, 127]);
                //port.send([145, scales[key].pitch_classes[0]+60, 127]);
                //port.send([145, scales[key].pitch_classes[2]+60, 127]);
                //port.send([145, scales[key].pitch_classes[4]+60, 127]);
                //port.send([145, scales[key].pitch_classes[6]+60, 127]);
                //port.send([145, scales[key].pitch_classes[0]+72, 127]);
                //port.send([145, scales[key].pitch_classes[1]+72, 127]);
                //port.send([145, scales[key].pitch_classes[2]+72, 127]);
                //port.send([145, scales[key].pitch_classes[3]+72, 127]);
                //port.send([145, scales[key].pitch_classes[4]+72, 127]);
                //port.send([145, scales[key].pitch_classes[5]+72, 127]);
                //port.send([145, scales[key].pitch_classes[6]+72, 127]);
                //port.send([145, scales[key].pitch_classes[0]+84, 127]);

                //port.send([64, 0, 0]);
                
                //port.send([148, scales[key].video_index-1, 127]);
                
                //port.send([149, 22, 127]);
                //port.send([149, 47, 127]);
            //}
        }
    })
         
            
    }

    function on_midi_failure(error_code) {
        console.error("Could not connect to MIDI: error code " + error_code);
    }

    navigator.requestMIDIAccess().then(on_midi_success, on_midi_failure);
}

function polygon(x, y, radius, npoints, sClass) {
  angle = TWO_PI / npoints;
  beginShape();
  for ( let a = 0; a < TWO_PI; a += angle) {
    if (npoints == 3 || npoints == 6) {
        let sx = x + cos(a+(TWO_PI/12)) * radius;
        let sy = y + sin(a+(TWO_PI/12)) * radius;
        vertex(sx, sy);
    }
    if (npoints == 5 ) {
        let sx = x + cos(a+(TWO_PI/20)) * radius;
        let sy = y + sin(a+(TWO_PI/20)) * radius;
        vertex(sx, sy);
    }

    if (npoints == 4 ) {
        if (sClass == "acoustic"){
            vertex(x+radius, y+radius*0.5);
            vertex(x-radius, y+radius*0.5);
            vertex(x-radius, y-radius*0.5);
            vertex(x+radius, y-radius*0.5);
        }
        if (sClass == "harmonic_major"){
            vertex(x+radius, y+radius*0.25);
            vertex(x-radius, y+radius*1.25);
            vertex(x-radius, y-radius*0.25);
            vertex(x+radius, y-radius*1.75);
        }
        if (sClass == "harmonic_minor"){
            vertex(x+radius, y+radius*1.25);
            vertex(x-radius, y+radius*0.25);
            vertex(x-radius, y-radius*1.75);
            vertex(x+radius, y-radius*0.25);
        }
        
    }
  }
  endShape(CLOSE);
}


//delete this later, use p5 native hsv mode
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}



var note_names = ["c", "c#", "d", "e♭", "e", "f", "f#", "g", "g#", "a", "b♭", "b"];

//keep tally of wha's been printed so far
const nodes_visited = {};

var touch_data = [];

//pass angle into recersive function
function drawScale(key, x, y, level, ancestors, offset) {
    //function drawscale(key, x, y, level, angle)
    //copy the array so that we dont modify the original with recucursion 
     ancestors = ancestors.slice();
    //add it to the ancestors array
    ancestors.push(key);
    

    fill(hsvToRgb(map(scales[key].root, 11, 0, 0, 1), map(scales[key].root, 0, 11, 0.5, 1), map(level, 0, 4, 1, 0.2)));
    const shape_size = (windowHeight*(0.1111) / level);

    //all of the babie
    let filt_adjacent_scales = scales[key].adjacent_scales;

    //filter out all ancestors

    filt_adjacent_scales = filt_adjacent_scales.filter(function(item){
    return ancestors.indexOf(item) === -1;

    });

    if (level < 3) {
        touch_data.push(
            {
                x: x,
                y: y,
                ssize: shape_size,
                k: key
            }
        );
    }

    //color scheme by scale class
    polygon(x, y, shape_size, scales[key].adjacent_scales.length, scales[key].scale_class);
  
    stroke(0);
    fill(0,0,0);
    const font_size_1 = 32/level;
    textSize(font_size_1);
    text(note_names[scales[key].root], x-(9 / level)-1, y-1);
    text(scales[key].scale_class, x-(54 / level)-1, y+(33 / level)-1); //print out scale class
    fill(255,255,255);
    const font_size_2 = 30/level;
    textSize(font_size_2);
    text(note_names[scales[key].root], x-(9 / level), y);
    //use symbols instead of printing out EVERYTHING
    //text()
    text(scales[key].scale_class, x-(54 / level), y+(33 / level)); //print out scale class
    fill(0);

    if ( level > 1) {
        return 
    }

    for( let i = 0; i < filt_adjacent_scales.length; i++ ) {

        var angle;
        let divisor = pow(2, level);

        if(level == 1) {
            angle = map(i, 0, filt_adjacent_scales.length, 0, (TWO_PI));
        }
        else {
            // angle = map(i, 0, filt_adjacent_scales.length, 0, (PI)); 
            let middle = Math.round((filt_adjacent_scales.length - 1) / 2);
            let pos = i - middle;
            angle = map(pos, 0, filt_adjacent_scales.length, offset - (PI/divisor), offset + (PI/divisor)) + (PI/divisor);            
        }


        let theta = map(i, 0, scales[key].adjacent_scales.length, 0, (TWO_PI/(level*level)));
        if (level > 1 ){
            // angle = angle + theta;
        }
        let newX = x + sin(angle+TWO_PI) * ((windowWidth*0.25) / level ) ;
        let newY = y + cos(angle+TWO_PI) * ((windowHeight*0.25) / level ) ;
        //rotate(cos(TWO_PI/adjacent_scales.length));

        drawScale(filt_adjacent_scales[i], newX, newY, level + 1, ancestors, angle);


        stroke(hsvToRgb(map(scales[key].root, 11, 0, 0, 1), map(scales[key].root, 0, 11, 0.5, 1), map(level, 0, 4, 1, 0.4)));
        line(x, y, newX, newY);
        stroke(hsvToRgb(map(scales[key].root, 11, 0, 0, 1), map(scales[key].root, 0, 11, 0.5, 1), map(level, 0, 4, 1, 0.4)));
    }
}
