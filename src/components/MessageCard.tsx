import { useState } from 'react';
import '../styling/chatInterface.scss'; 
import Markdown from 'react-markdown';

type MessageCardParameters = {
    header: string,
    content: string,
    maxLength: number
}

const MessageCard = ({ header, content, maxLength }: MessageCardParameters) => {
    const paddedContent = padContent(content, maxLength);
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(paddedContent.trim())
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        } catch (error) {
            console.error('Failed to copy: ', error);
        }
    };

    function padContent(content: string, maxLength: number) {
        const contentLength = content.length;
        if (contentLength < maxLength) {
            const spacesToAdd = maxLength - contentLength;
            return content + ' '.repeat(spacesToAdd);
        }
        return content;
    };

    return (
        <div className="message-card-container">
            <div className="message-header">
                <h3>{header}</h3>
            </div>
            <div className="message-content">
                <Markdown>{paddedContent}</Markdown>
            </div>
            <div style={{ marginBottom: '20px' }}></div>
            <button className="copy-button" onClick={handleCopy}>{copied ? 'Copied' : 'Copy Text'}</button>
        </div>
    );
};

export default MessageCard;