import {Howl, Howler} from 'howler';
import axios from "axios";

export const VoiceLangVN = async (text) => {
  try{
		const voiceVN = await axios.post('https://api.fpt.ai/hmi/tts/v5',text,{
      headers: {
        'api-key': 'ilY3o6C7EMNvTuhxjHIKPN9ZRseKkJEp',
        'speed': 0,
        'voice': 'banmai',
      }
    } )
    var sound = new Howl({
      src: ['https://file01.fpt.ai/text2speech-v5/short/2023-02-05/902e17b65efc717f16054e6b6042b6dd.mp3'],
      html5: true,
      autoplay: true
    });

    sound.play();
    return sound.play();
  }
  catch(err) {
    console.log(err)
  }
}

export const VoiceLangOrther = (text,lang) => {
	let utterance = new SpeechSynthesisUtterance();
	utterance.lang = lang ?? 'en-US'
	utterance.text = text;
	speechSynthesis.speak(utterance);
}