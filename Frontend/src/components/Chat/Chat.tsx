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

const welcomeMessage = `# Welcome to the ACEP Research Chatbot!
The **Alaska Center for Energy and Power (ACEP)** has spent the last 6 months designing and
implementing an advanced Language Model (LLM) Chatbot tailored specifically to the field of energy
research. Recognizing the significant time and effort researchers invest in searching for relevant
materials, the initiative aims to alleviate this burden by providing a user-friendly interface for
prompt and accurate information retrieval. We hope you find this version to your liking and that it
proves helpful in your endeavors!
## Customize ChatBot Responses
Click on an icon on the right hand of the page to get started and tailor the **tone and personality of your personalized
research assistant**. Choose a formal, professional style or a friendly, conversational
approach - the responses will match your preferred manner while providing informative and
customized assistance.`

interface Message {
  text: string;
  sender: string;
  sources?: Sources[];
  buttons?: Buttons[];
}

// Define the Button and Icon interfaces
interface Buttons {
  label: string;
  image: string; // URL of the image
  action: () => void;
}

interface Sources {
  website_url: string;
  title: string;
  author: string;
  year: number;
  pdf_url: string;
}

interface Icon {
  id: number;
  name: string;
  path: string;
  description: string;
}

const icons: Icon[] = [
  { id: 1, name: "Insightful", path: "/icons/insightful.png", description: "An imaginative summarizer who creates detailed insights for researchers using APA formatting and reliable data sources." },
  { id: 2, name: "Direct", path: "/icons/direct.png", description: "A concise and straightforward assistant specializing in semantic search to quickly direct researchers to relevant information." },
  { id: 3, name: "Investigative", path: "/icons/investigative.png", description: "An assistant who asks follow-up questions and dives deeper into topics to help researchers make informed decisions." },
  { id: 4, name: "Organized", path: "/icons/organize.png", description: "A research assistant who helps organize complex information, providing context and important facts for coherent research." },
  { id: 5, name: "Analytical", path: "/icons/analytical.jpeg", description: "An analytical companion focused on data analysis, statistical interpretation, and providing insights based on empirical evidence." },
  { id: 6, name: "Creative", path: "/icons/creative.png", description: "A creative connector who draws connections between disparate pieces of information and generates innovative ideas." },
  { id: 7, name: "Data-Driven", path: "/icons/data-driven.png", description: "A data enthusiast who sources and validates data, ensuring accuracy and reliability to support researchers' work." },
  { id: 8, name: "Collaborative", path: "/icons/collaborative.png", description: "A collaborative partner who works with researchers to brainstorm ideas, develop research plans, and facilitate teamwork." },
  { id: 9, name: "Systematic", path: "/icons/systematic.png", description: "A methodical guide who helps researchers follow structured research methodologies and adhere to best practices." },
];

export default function Searchbar() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<number>(0);
  const [responses, setResponses] = useState<Message[]>([
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
    const updatedResponses = responses.filter(response => !response.text.includes("Welcome to the ACEP Research Chatbot"));

    setUserInput(''); // Clear input after sendings
    setResponses((prevResponses) => [
      // Send waiting message first before getting the response
      { text: "Waiting for a response...", sender: 'bot'},
      { text: userMessage, sender: 'user'},
      ...updatedResponses,
    ]); // Pop user's message first
    setLoading(true); // Lock the send button until get the response

    try {
      const response = await axios.post('https://flaskapp-k22nw35fzq-uw.a.run.app/sendquery', {
        text: userInput,
        personality: icons[activeButton].name, // Add the personality data
        response: responses
      });
      console.log("responses: " + JSON.stringify(responses));
      setResponses((prevResponses) => [
        {
          text: response.data.response,
          sender: 'bot',
          sources: response.data.sources,
          buttons: [],
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

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
    console.log(`${icons[index].name} was clicked!`);
  };

  const [containerWidth, setContainerWidth] = useState('100px'); // Initial width of the personality container
  const [currentState, setState] = useState("Expand");

  // Function to toggle the width of the personality container
  const toggleContainerWidth = () => {
    // If the container width is currently smaller, increase it; otherwise, decrease it
    setContainerWidth(containerWidth === '100px' ? '400px' : '100px');
    setState(currentState === "Expand" ? "Close" : "Expand");
  };

  return (
    <main>
      <div className="chat">
        {/* The Chat Box */}
        <div className="chat-container" ref={messagesEndRef}>
          <div className="message-container">
            {responses.map((response, index) => (
              <div key={index} className={`message ${response.sender === 'user' ? 'user' : 'bot'}`}>
                <div className="message-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{response.text}</ReactMarkdown>
                  {/* Render sources if they exist */}
                  {response.sender === 'bot' && response.sources && response.sources.length > 0 && (
                    <div className="sources">
                      <h3>Sources:</h3>
                      <div className="sources-container">
                      {response.sources.map((source, sourceIndex) => (
                        <button key={sourceIndex}>
                            <a className="title"
                              href={source['ISER_link']}
                              target="_blank"
                              rel="noopener noreferrer"
                            > {source.title}
                            </a>

                          <span className="author">{"\n" + source.author + " Published in " + source['Year'] }</span>
                            <a
                              className="pdf"
                              href={source.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >View PDF</a>

                          {!source.pdf_url && ( // Show fallback if no PDF URL
                            <a
                              className="pdf"
                              href="google.com" // Or any other fallback URL
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              PDF (No direct link available)
                            </a>
                          )}
                        </button>
                      ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Personality Container */}
      <div className="personality-container" style={{ width: containerWidth }}>
        {/* Paragraph for changing container width */}
        <button id="side-bar" onClick={toggleContainerWidth}>{currentState === "Expand" ? "Show More" : "Close X"}</button>
        {currentState === "Close" ? (
          // Render this div when the condition is true
          <div className="buttons-container">
          {icons.map((icon, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={activeButton === index ? 'active' : ''}
              style={{ width: containerWidth}}
            >
              <div className="left">
                <img src={icon.path} alt={icon.name} className="icon-img"/>
                <span>{icon.name}</span>
              </div>
              <div className="right">
                  <span>{icon.description}</span>
              </div>
            </button>
          ))}
        </div>
        ) : (
          // Render this div when the condition is false
          <div className="buttons-container">
            <button
              key={activeButton}
              onClick={() => handleButtonClick(activeButton)}
              className={'active'}
              style={{ width: containerWidth}}
            >
              <div className="left">
                <img src={icons[activeButton].path} alt={icons[activeButton].name} className="icon-img"/>
                <span>{icons[activeButton].name}</span>
              </div>
            </button>
          </div>
        )}
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
