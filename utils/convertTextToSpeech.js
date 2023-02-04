import {Howl, Howler} from 'howler';
import axios from "axios";

export const VoiceLangVN = async (text) => {
		const voiceVN = await axios.post('https://api.fpt.ai/hmi/tts/v5',text,{
      headers: {
        'api-key': 'ilY3o6C7EMNvTuhxjHIKPN9ZRseKkJEp',
        'speed': 0,
        'voice': 'banmai'
      }
    } )
    console.log(voiceVN.data)
    var sound = new Howl({
      src: [voiceVN.data.async],
      html5: true
    });

    sound.play();
}

export const VoiceLangOrther = (text,lang) => {
	let utterance = new SpeechSynthesisUtterance();
	utterance.lang = lang ?? 'en-US'
	utterance.text = text;
	speechSynthesis.speak(utterance);
}