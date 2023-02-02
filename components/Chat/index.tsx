import { useEffect, useState } from 'react'
import { type Message, ChatLine, LoadingChatLine } from '../ChatLine'
import { useCookies } from 'react-cookie'
import { Button } from '../Button'
import axios from 'axios'
import {configAPI} from '../../config.js'
import { Router, useRouter } from 'next/router'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: 'bot',
    message: 'Hi! I’m A friendly AI assistant. Ask me anything!',
  },
]

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="mt-6 flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input)
          setInput('')
        }
      }}
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input)
        setInput('')
      }}
    >
      Say
    </Button>
  </div>
)

export function Chat() {
	const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true)
    const newMessages = [
      ...messages,
      { message: message, who: 'user' } as Message,
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10)

    const {apiKey} = router.query;
    console.log(apiKey)

    const response = await axios.post('https://api.openai.com/v1/completions', {
    	"model": "text-davinci-003",
		  "prompt": `${message}`,
		  "max_tokens": 300,
		  "temperature": 1
		    }, configAPI)
    console.log(response);
    const data = response.data.choices[0];

    // // strip out white spaces from the bot message
    const botNewMessage = data.text.trim()

    setMessages([
      ...newMessages,
      { message: botNewMessage, who: 'bot' } as Message,
    ])
    setLoading(false)
  }

  return (
    <div className="px-60">
      {messages.map(({ message, who }, index) => (
        <ChatLine key={index} who={who} message={message} />
      ))}

      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a message to start the conversation
        </span>
      )}
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  )
}