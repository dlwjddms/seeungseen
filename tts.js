
const form = document.querySelector(".btn_tts");
import { writeFile } from 'fs';
import { promisify } from 'util';
import { TextToSpeechClient } from '@google-cloud/text-to-speech'; 


const projectId='refreshing-mark-222309';
const keyfile='./My First Project-a0591a3611f6.json'; //---1) 
const client = new TextToSpeechClient({
    projectId:projectId,
    keyFilename:keyfile
});

var btn_ON = false;

async function quickStart(contents) {
    // The text to synthesize
    const text = contents;
  
    // Construct the request
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: 'ko-KR', ssmlGender: 'FEMALE'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
   
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request,  (err, response) => {
        if (err) {
          console.error('ERROR:', err);
          return;
        }
        writeFile('output.mp3', response.audioContent, 'binary', err => {
          if (err) {
            console.error('ERROR:', err);
            return;
          }
          console.log('Audio content written to file: output.mp3');
        });
    });
      
    // Write the binary audio content to a local file
    const w_File = promisify(writeFile());
    await w_File('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
  }
//  quickStart(contents);
//}

function  do_tts(content){
    quickStart(content);
  // read_start(content);
}

function get_id(mouse_id){
         if(btn_ON){
           // mouse_id.target.style.width =  mouse_id.target.style.width*2;
           // mouse_id.target.style.height = mouse_id.target.style.height*2;
            //read_id = document.querySelector(`#${mouse_id}`);
            var read_id = document.getElementById(mouse_id);
            console.log("this"+read_id.innerText+"\n");
            do_tts(read_id.innerText);
         }
}

function changeText(){
    console.log("this");
    btn_ON = ! btn_ON;
    if(btn_ON){
        form.innerText = "Active";
        form.style.color = "red";
      //  btn_ON = false;
    }
    else{
        form.innerText = "READ TEXT";
        form.style.color = "black";
       // btn_ON = true;
    }
}
function init(){
    form.style.color = "black";
     form.addEventListener("click",changeText);
}

init();