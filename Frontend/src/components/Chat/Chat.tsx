import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Input } from './ChatComponents/input';
import { Button } from './ChatComponents/button';
import './Chat.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";


// const testHTML = `<table border="1" style="width:100%; border-collapse: collapse;">
// <tr><th>After reviewing the related documents, I've extracted the following information regarding Alaska's energy industry: <strong>Table: Summary of Alaska's Energy Industry</strong></th><th><strong>Category</strong></th><th><strong>Information</strong></th><th><strong>Doc_ID(s)</strong></th></tr>
// <tr><td>Energy Exports</td><td>Alaska exports 9 times more fossil fuels than it consumes; projected to increase with gas pipeline construction</td><td>9734b5ac-7f5a-495f-bb94-50eb9f75985e</td></tr>
// <tr><td>Renewable Energy Sources</td><td>Potential for hydro, wind, tidal, and other zero-fuel energy sources; could reduce reliance on fossil fuels and lower consumer energy prices</td><td>9734b5ac-7f5a-495f-bb94-50eb9f75985e</td></tr>
// <tr><td>Fossil Fuel Reserves</td><td>Prudhoe Bay field is a significant discovery; concern about converting temporary revenue streams into long-term benefits</td><td>1034e068-56ff-4557-b6f6-03d0296803b1</td></tr>
// <tr><td>State Revenue Streams</td><td>State receives revenue from federal oil and gas leases (27%); distributed through various programs, including Land and Water Conservation Fund Grants</td><td>a1233b65-62f4-4596-a600-a6461130eba2</td></tr>
// <tr><td>State Policies</td><td>Constitutional requirement to manage natural resources for maximum benefit of Alaskans; Stranded Gas Act allows for negotiation of special fiscal terms on large gas projects</td><td>9300609b-62cf-4ccb-bf4a-b238bb561490</td></tr>
// <tr><td>Energy Infrastructure</td><td>Mention of gas pipelines, including Alaska Gasline Inducement Act (AGIA) application</td><td>94b02cee-7105-481f-80a3-2f6d5fc5ee55</td></tr>
// <tr><td>Research and Development</td><td>Establishment of Alaska Energy Data Gateway to provide accessible energy data for research and decision-making</td><td>7a9b1669-144e-4f12-9671-2e5dfeb7a5fd</td></tr>
// </table>
// I've referenced the following Doc_IDs: * 9734b5ac-7f5a-495f-bb94-50eb9f75985e * 1034e068-56ff-4557-b6f6-03d0296803b1 * a1233b65-62f4-4596-a600-a6461130eba2 * 9300609b-62cf-4`;
// const testMD = `
//   # Alaska's Energy Industry
//
//   **Table: Summary of Alaska's Energy Industry**
//
//   | Category                 | Information                                                                                           | Doc_ID(s)                        |
//   |--------------------------|-------------------------------------------------------------------------------------------------------|----------------------------------|
//   | Energy Exports           | Alaska exports 9 times more fossil fuels than it consumes; projected to increase with gas pipeline construction | 9734b5ac-7f5a-495f-bb94-50eb9f75985e |
//   | Renewable Energy Sources | Potential for hydro, wind, tidal, and other zero-fuel energy sources; could reduce reliance on fossil fuels and lower consumer energy prices | 9734b5ac-7f5a-495f-bb94-50eb9f75985e |
//   | Fossil Fuel Reserves     | Prudhoe Bay field is a significant discovery; concern about converting temporary revenue streams into long-term benefits | 1034e068-56ff-4557-b6f6-03d0296803b1 |
//   | State Revenue Streams    | State receives revenue from federal oil and gas leases (27%); distributed through various programs, including Land and Water Conservation Fund Grants | a1233b65-62f4-4596-a600-a6461130eba2 |
//   | State Policies           | Constitutional requirement to manage natural resources for maximum benefit of Alaskans; Stranded Gas Act allows for negotiation of special fiscal terms on large gas projects | 9300609b-62cf-4ccb-bf4a-b238bb561490 |
//   | Energy Infrastructure    | Mention of gas pipelines, including Alaska Gasline Inducement Act (AGIA) application | 94b02cee-7105-481f-80a3-2f6d5fc5ee55 |
//   | Research and Development | Establishment of Alaska Energy Data Gateway to provide accessible energy data for research and decision-making | 7a9b1669-144e-4f12-9671-2e5dfeb7a5fd |
//
//   I've referenced the following Doc_IDs: * 9734b5ac-7f5a-495f-bb94-50eb9f75985e * 1034e068-56ff-4557-b6f6-03d0296803b1 * a1233b65-62f4-4596-a600-a6461130eba2 * 9300609b-62cf-4
//   `;

const welcomeMessage =  `
# Welcome to the ACEP Research Chatbot!
The **Alaska Center for Energy and Power (ACEP)** has spent the last 6 months designing and
implementing an advanced Language Model (LLM) Chatbot tailored specifically to the field of energy
research. Recognizing the significant time and effort researchers invest in searching for relevant
materials, the initiative aims to alleviate this burden by providing a user-friendly interface for
prompt and accurate information retrieval. We hope you find this version to your liking and that it
proves helpful in your endeavors!
## Example Prompts
Click on one of the following prompts to get started:
1. Give me a summary of ...
2. Show me a table of documents that include ...
`

interface Message {
  text: string;
  sender: string;
  sources?: string[];
}

export default function Searchbar() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [responses, setResponses] = useState<Message[]>([
    {
      // Initial message from the bot
      text: 'Welcome! I am your personalized research assistant. How can I help you?',
      sender: 'bot',
    },
    {
      // Initial message from the bot
      text: welcomeMessage,
      sender: 'bot',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat window when responses change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
      if(messagesEndRef.current?.clientHeight < messagesEndRef.current?.scrollHeight)
        window.scrollTo(0, document.body.scrollHeight);
    }
  }, [responses]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSend = async () => {
    const userMessage = userInput;

    // If this is the first query, remove the welcome message
    const updatedResponses = responses.findIndex(response => response.text.includes("Welcome to the ACEP Research Chatbot")) !== -1
    ? responses.filter((_, index) => index !== 1)
    : responses;

    setUserInput(''); // Clear input after sending
    setResponses((prevResponses) => [
      // Send waiting message first before getting the response
      { text: "Waiting for a response...", sender: 'bot'},
      { text: userMessage, sender: 'user'},
      ...updatedResponses,
    ]); // Pop user's message first
    setLoading(true); // Lock the send button until get the response

    try {
      const response = await axios.post('https://flaskapp-k22nw35fzq-uw.a.run.app/sendquery', { text: userInput });

      setResponses((prevResponses) => [
          {
            text: response.data.response,
            sender: 'bot',
            sources: response.data.sources,
          },
          ...prevResponses.slice(1), // Shift the waiting message
        ]);
    } catch (error) {
      setResponses((prevResponses) => [
        { text: 'Failed to get responses from LLM.', sender: 'bot'},
        ...prevResponses.slice(1),
      ]);
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Unlock the send button
    }
  };

  return (
    <main>
      <div className="chat">
        {/* The Chat Box */}
        <div className="chat-container" ref={messagesEndRef}>
          <div className="message-container">
            {responses.map((response, index) => (
              <div key={index} className={`message ${response.sender === 'user' ? 'user' : 'bot'}`}>
                <p className="message-text">
                    {/*Show the table response as markdown style*/}
                  {/*<div dangerouslySetInnerHTML={{ __html: response.text}} />*/}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{response.text}</ReactMarkdown>
                </p>
                {response.sender === 'bot' && response.sources && response.sources.length > 0 && (
                  <div className="sources">
                    <p>Sources:</p>
                    <ul>
                      {response.sources.map((source, sourceIndex) => (
                        <li key={sourceIndex}>
                          <a href={source} target="_blank" rel="noopener noreferrer">{source}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The Input Box */}
        <footer className="footer">
          <div className="input-container">
            <Input id="input"
                value={userInput}
                onChange={handleInputChange}
                onEnterPress={handleSend}
                placeholder={loading ? 'Getting response' : 'Type your message here...'} />
            <Button id="send-button" onClick={handleSend} disabled={!userInput.trim() || loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer">
            Note this is a pilot. Generated content may be inaccurate or false. Please check important data.
          </div>
        </footer>

      </div>
    </main>
  );
}
