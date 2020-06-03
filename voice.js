// initialize webspeech api
const synth=window.speechSynthesis;


//DOM elements

const textForm =document.querySelector('form');
const textInput =document.querySelector('#text-input');
const voiceSelect =document.querySelector('#voice-select');
const rate =document.querySelector('#rate');
const  rateValue =document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');
const anim1=document.querySelector('#anime1');
const anim2=document.querySelector('#anime2');
//intialize voice array

let voices=[];


const getVoices = () => {
    voices = synth.getVoices();
  
    // Loop through voices and create an option for each one
    voices.forEach(voice => {
      // Create option element
      const option = document.createElement('option');
      // Fill option with voice and language
      option.textContent = voice.name + '(' + voice.lang + ')';
  
      // Set needed option attributes
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  };


 getVoices();

 if(synth.onvoiceschanged !==undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak 

const speak = () => {


    //check if speaking
    if(synth.speaking){
        console.error("Already speaking!!!");

    }

    if(textInput.value !== ''){
        //get speak text
        const speakText =new SpeechSynthesisUtterance(textInput.value);
        anim1.style.background= '#141414 url(img/sppech.gif)';
        anim2.style.background= '#141414 url(img/sppech.gif)';
        anim1.style.backgroundRepeat= 'no-repeat';
        anim2.style.backgroundRepeat= 'no-repeat';
        anim1.style.backgroundSize= '100% 100%';
        anim2.style.backgroundSize= '100% 100%';
        //speak end
        speakText.onend = e => {
            console.log("Done sepaking...");
            anim1.style.background= '#141414';
            anim2.style.background= '#141414';
        }

        //speak error
        speakText.onerror = e => {
            console.log("Something went wrong");
        }

        //selected voice
        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices

        voices.forEach(voice => {
            if(voice.name === selectedVoice)
            {
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        //speak

        synth.speak(speakText);
    }
};

//Event listeners

//Text form submit

textForm.addEventListener('submit',e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//rate value change
rate.addEventListener('change', e => {
   rateValue.textContent=rate.value;
});

pitch.addEventListener('change', e => {
    pitchValue.textContent=pitch.value;
 });

 //voice select change
 voiceSelect.addEventListener('change',e => speak());