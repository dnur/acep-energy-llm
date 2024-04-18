import { useState } from 'react';
import axios from "axios";
import { Input } from "./Chat/input";
import { Button } from "./Chat/button";

export default function Searchbar() {
    const [userInput, setUserInput] = useState("");
    const [responses, setResponses] = useState([
        {
        text: "Welcome to the ACEP Research Chatbot! I am your personalized research assistant. How can I help you?",
        sender: "bot",
        sources: [] // Initialize sources for each response
        },
    ]);


  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async () => {
    const userMessage = userInput;
    try {
      const response = await axios.post("http://127.0.0.1:5000/sendquery", { text: userInput });
      setResponses((prevResponses) => [
        {
          text: response.data.response,
          sender: "bot",
          sources: response.data.sources // Include sources with the response
        },
        { text: userMessage, sender: "user" , sources: []},
        ...prevResponses,
      ]);
      setUserInput(""); // Clear input after sending
    } catch (error) {
      setResponses((prevResponses) => [
        { text: "Failed to get responses from LLM.", sender: "bot", sources: [] },
        { text: userMessage, sender: "user", sources: [] },
        ...prevResponses,
      ]);
      console.error("Error sending message:", error);
    }
  };

    return (
      <main className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="mt-6 mb-12 w-full rounded-md bg-white p-6 shadow" style={{ maxWidth: 'screen', maxHeight: '1050px', overflowY: 'auto' }}>
            <div className="flex flex-col-reverse " style={{ minHeight: '100%' }}>
              {responses.map((response, index) => (
                <div key={index} className={`flex items-center space-x-4 ${response.sender === "user" ? "justify-end" : ""}`}>
                  <div className={`rounded-md p-4 mb-2 ${response.sender === "bot" ? "bg-gray-100" : "bg-blue-100"}`}>
                    <p className={`text-sm ${response.sender === "bot" ? "text-gray-900" : "text-blue-800"}`}>{response.text}</p>
                    {response.sender === "bot" && response.sources.length > 0 && (
                      <div className="source-list">
                        <br />
                        <p className="text-sm text-gray-600"> Sources: </p>
                        {response.sources.map((source, index) => (
                        <p key={index} className="text-sm text-gray-600" style={{ textDecoration: 'underline' }}>
                          <a href={source[0] === "text_file_1.pdf" ? `https://drive.google.com/file/d/19_zABcxMESJdeNwcqsvgP9sfR-YhSvod/view?usp=drive_link` : 'https://drive.google.com/file/d/1Vwo1UwaWrY3KViHvKbATBYDYAOk6imsy/view?usp=drive_link'} rel="noopener noreferrer" target="_blank">{source[0]} on page {source[1]}</a>
                        </p> ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 mt-6 w-full rounded-md bg-white p-6 shadow" style={{ maxWidth: '1200px'}}>
            <div className="flex items-center space-x-4">
              <Input value={userInput} onChange={handleInputChange} placeholder="Type your message here..." />
              <Button onClick={handleSend} disabled={!userInput.trim()}>Send</Button>
            </div>
          </div>
        </div>
      </main>
    ); 
}