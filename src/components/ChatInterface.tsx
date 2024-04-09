import { useEffect, useRef, useState } from 'react';
import MessageCard from '../components/MessageCard';
import { useImmer } from 'use-immer';
import { Message } from '../types/openai';
import '../styling/chatInterface.scss';

function capitalizeFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function ChatInterface() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useImmer([] as Message[])
    const sending = useRef(false)
    const path = useRef(null as null | string)

    useEffect(() => {
        if (sending.current) {
            window.electron.sendToGPT(messages, path.current).then((response: string) => {
                sendMessage("assistant", response)
                sending.current = false
            })
        }
    }, [messages])

    function sendMessage(role: "user" | "assistant", content: string) {
        setMessages(draft => {
            draft.unshift({ role: role, content: content })
        })
    }

    async function openFileDialog() {
        path.current = await window.electron.openFile()
        console.log(path.current)
    }

    function sendUserMessage() {
        if (input !== "") {
            sendMessage("user", input)
            sending.current = true
            setInput("")
        }
    }

    return <div className="chat-interface">
        <div>
            <div className='banner'>Chat With Your Assistant</div>
            <div className="input-container">
                <input
                    className='message-input'
                    placeholder='Message to Your Assistant'
                    value={input}
                    onChange={e => {
                        if (!sending.current) {
                            setInput(e.target.value);
                        }
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            sendUserMessage();
                        }
                    }}
                />
                <button className="send-button" onClick={sendUserMessage}>→</button>
                <button className='context-button' onClick={openFileDialog}>Choose Context</button>
            </div>
            <div>
                {messages.map((message, index) => <MessageCard 
                    key={index} 
                    header={capitalizeFirst(message.role)} 
                    content={message.content} 
                    maxLength={256} 
                />)}
            </div>
        </div>
    </div>
}

export default ChatInterface;