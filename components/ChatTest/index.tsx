import { useEffect, useState, useRef } from 'react'
import { Message, ChatLine, LoadingChatLine } from '../ChatLine'
import { useCookies } from 'react-cookie'
import { Button } from '../Button'
import axios from 'axios'
import {configAPI} from '../../config.js'
import { Router, useRouter } from 'next/router'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicOnIcon from '../../assets/svg/micOn'
import MicOffIcon from '../../assets/svg/micOff'


const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: 'bot',
    message: 'Hi! I’m A friendly AI assistant. Ask me anything!',
  },
]

const InputMessage = ({ input, setInput, sendMessage, isListening, transcript }: any) => {
  const textInput = input ;
  return (
    <div className="mt-6 flex clear-both w-full">
    <input
    	disabled = {isListening}
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={textInput}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input)
          setInput('')
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }
      }
    />
    <Button
      type="submit"
      className="mx-4 flex-none"
      onClick={() => {
        sendMessage(input)
        setInput('')
      }}
    >
      Say
    </Button>
  </div>
)}

export function Chat() {

	const [lang, setLang] = useState('vi-VN')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

	const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true)
    const newMessages = [
      ...messages,
      { message: message, who: 'user' } as Message,
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10)

     if(message.toLowerCase() == 'hi') {
	    	message = 'hello';
	    }

    const response = await axios.post('https://api.openai.com/v1/completions', {
    	"model": "text-davinci-003",
		  "prompt": `${message}`,
		  "max_tokens": 4000,
		  "temperature": 0.7
		    },  {headers: {
		        Authorization: `Bearer ${process.env.NEXT_OPENAI_API_KEY}`,
		      }})
    const data = response.data.choices[0];
    
    // // strip out white spaces from the bot message
    const botNewMessage = data.text.trim();
    const dataMessage = {
    	message: botNewMessage
    }
    axios.post('/api/write-file',dataMessage);
    setMessages([
      ...newMessages,
      { message: botNewMessage, who: 'bot' } as Message,
    ])
    setLoading(false)
  }

  const handleStopLitening = () => {
  	SpeechRecognition.stopListening();
  	if(transcript.length !== 0) {
	  	sendMessage(transcript)
	    setInput('')
  	}
  }

  const handleChangeLang = (event ) => {
  	if(event.target.checked === true) {
	    setLang(event.target.value);
  	}
  }

  return (
    <div className="px-7 md:px-60">
      {messages.map(({ message, who }, index) => (
        <ChatLine key={index} who={who} message={message} />
      ))}

      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a message to start the conversation
        </span>
      )}
      <div className='flex items-center w-full'>
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isListening={listening}
          transcript={transcript}
        />
        {listening ? 
          <div className='hover:cursor-pointer mt-6 flex' onClick={handleStopLitening}>
            <MicOnIcon /> 
            <span className='whitespace-nowrap ml-1'>Talk and turn off the micro to chat</span>
          </div> :
          !input ? <div className='hover:cursor-pointer mt-6' onClick={() => SpeechRecognition.startListening({ language: lang })}>
            <MicOffIcon />
          </div> : ''
        }
      </div>
      {listening ? <div className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto`}>
      	<div className="modal-dialog relative w-auto pointer-events-none">
	    		<div className="modal-content h-60 border-none shadow-lg relative flex flex-col w-full justify-center items-center pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
		      	<div className='hover:cursor-pointer animate-border border p-5 border-red-200 rounded-full' onClick={handleStopLitening}>
			      	<MicOnIcon width={50} height={50} fill="red"/>
		      	</div>
		      	<h3 className='text-2xl font-bold mt-4'>Talk and turn off the micro to chat</h3>
		      </div>
	      </div>
      </div> : ''}
      	<p>Trải nghiệm tốt hơn khi chọn ngôn ngữ với chức năng chat voice</p>
      	<p>Bấm vào biểu tượng voice để nói và bấm lần nữa khi xong</p>
      <div className='flex mt-6'>
	      <div className="flex items-center mr-5">
			    <input checked={lang === 'vi-VN'} onChange={handleChangeLang} type="radio" value="vi-VN" name="lang" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
			    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Việt Nam</label>
				</div>
				<div className="flex items-center">
			    <input type="radio" onChange={handleChangeLang}  value="en-US" name="lang" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
			    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">United State</label>
				</div>
      </div>
      <div className='h-5' ref={bottomRef} />
    </div>
  )
}