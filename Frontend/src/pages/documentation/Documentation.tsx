import NavBar from "../../components/NavBar/NavBar"
import "./Documentation.css"
import systemOverview from "../../images/flowcharts/system-overview.png"
import dataInput from "../../images/flowcharts/datainput-flowchart.png"
import queryResponse from "../../images/flowcharts/queryresponse-flowchart.png"
import frontEnd from "../../images/flowcharts/frontend-flowchart.png"

export default function Documentation() {
  return (
    <div>
      {/* Inserts other components onto the page */}
      <div>
        <NavBar />
      </div>

      {/* Container to hold page content */}
      <div className="container">

        {/*  System Overview Information */}
        <div className="overview">
          <h1 className="heading1">ACEP LLM for Energy Research Papers</h1>
          <p>The ACEP Capstone Project is dedicated to developing a specialized Large Language Model
            (LLM) for the energy sector, designed to enhance the analysis and extraction of insights
            from energy-related documents. Emphasizing open-source development, this initiative
            addresses the significant challenges energy researchers face in data access and
            interpretation by implementing an advanced LLM capable of semantic search, information
            retrieval, and data summarization. Additionally, the project will create a user-friendly
            web application integrated with the LLM, providing intuitive chatbot functions tailored
            specifically to answer energy related questions.</p>

          <div className="subcontent">
            <h2 className="heading2" id="system">System Overview</h2>
            <p>This documentation page serves as an invaluable resource for both new users and seasoned
            developers alike. It offers comprehensive guidance on installing, configuring, and maximizing
            the features of our chatbot. Figure 1 provides a step-by-step system overview of our project.
            Throughout this page, we will highlight each step in hopes of creating clear and thorough
            instructions.
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h4>Figure 1: System Overview: Step-By-Step Breakdown.</h4>
            <p>To help you navigate through this document, we've included a comprehensive Table of
              Contents below. Whether you're looking for specific information, need to jump to a
              particular section, or simply want to explore what's covered, the Table of Contents
              serves as your guide.
              <ol type="1">
                <li className="table"><a href="#system">1. System Overview</a></li>
                <li className="table"><a href="#backend">2. Back-End Development</a></li>
                <li className="table"><a href="#frontend">3. Front-End Development</a></li>
                <li className="table"><a href="#references">4. References</a></li>
              </ol>
            </p>
          </div>
        </div>

        {/* Back-End Development Information */}
        <div className="overview">
          <h1 className="heading1" id="backend">Back-End Development</h1>
          <p>Our backend development documentation is structured into two main sections: the
            <b><a href="#datainput"> data input workflow</a></b> and
            <b><a href="#query"> query response generation</a></b>.
            The data input workflow outlines processes
            for ingesting and preparing data, including parsing PDFs and extracting text. Meanwhile,
            the query response generation section details how user queries are interpreted, relevant
            information retrieved, and responses generated using advanced natural language processing
            techniques. Together, these sections provide insights into the core functionalities of
            our backend system, enabling a deeper understanding of its inner workings
          </p>
          <p>As mentioned previously, our first section outlines the data input workflow. Following
            the figure below, we will outline the usage and functionality of each component used.
          </p>
          <img className="data-input" alt="Data Input" src={dataInput}/>
          <h4>Figure 2: Data Input Flow Chart.</h4>

          {/* Subsection: Data Input Workflow */}
          <div className="subcontent" id="datainput">
            <h2 className="heading2">Data Input Workflow</h2>

            <h3 className="heading3">PDFs</h3>
            <p>PDFs are the primary format for input documents in the data processing pipeline.
              The system accepts PDF files, which are then processed to extract the necessary
              textual information for further analysis and storage.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Widely used and standardized format for documents.</li>
                <li>Supports text, images, and various types of content.</li>
                <li>Easily accessible and shareable.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Serves as the initial data input for the pipeline.</li>
                <li>Provides the raw content that will be processed by OCR and other components.</li>
              </ul>
            </ul>

            <h3 className="heading3">DOI (Digital Object Identifier)</h3>
            <p>The Digital Object Identifier (DOI) is a unique alphanumeric string assigned to
              documents, providing a persistent link to their location on the internet. The
              system queries the DOI database to retrieve metadata associated with each document,
              ensuring accurate identification and contextual information.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Provides a unique identifier for academic and professional documents.</li>
                <li>Facilitates easy retrieval of metadata such as author, publication date, and title.</li>
                <li>Ensures the integrity and authenticity of document references.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Queries the DOI database to gather metadata for input documents.</li>
                <li>Enhances the contextual understanding and organization of the documents.</li>
              </ul>
            </ul>

            <h3 className="heading3">OCR (Optical Character Recognition)</h3>
            <p>Optical Character Recognition (OCR) is a technology used to convert different types of
              documents, such as scanned paper documents or PDFs, into editable and searchable data.
              The system uses the Tesseract OCR model to extract text from the PDF documents.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Converts images of text into machine-encoded text.</li>
                <li>Supports multiple languages and various types of content.</li>
                <li>Provides accurate and efficient text extraction.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Extracts textual data from PDF documents.</li>
                <li>Converts scanned images and non-editable text into a machine-readable format.</li>
              </ul>
            </ul>

            <h3 className="heading3">Chunker</h3>
            <p>The Chunker is a component that breaks down large texts into smaller, manageable chunks.
               This is essential for complying with token limitations in Large Language Models (LLMs),
                enabling efficient processing and analysis.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Splits text into smaller, coherent segments.</li>
                <li>Ensures that text chunks fit within token limits for LLM prompts.</li>
                <li>Maintains the logical flow and context of the original document.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Processes the extracted text from OCR to create smaller text files.</li>
                <li>Facilitates efficient handling and analysis by the LLM.</li>
              </ul>
            </ul>

            <h3 className="heading3">JSONs</h3>
            <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that is
              easy for humans to read and write, and easy for machines to parse and generate. The
              system creates composite JSON files containing textual data from the OCR and Chunker,
              as well as metadata retrieved from the DOI database.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Simple and flexible data format.</li>
                <li>Supports nested data structures and various data types.</li>
                <li>Widely used in web applications and data interchange.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Combines textual data and metadata into a structured format.</li>
                <li>Facilitates easy storage, retrieval, and processing of document information.</li>
              </ul>
            </ul>

            <h3 className="heading3">Embedding Creation</h3>
            <p>Embedding creation involves converting textual data into numerical vectorized formats
               that can be processed by machine learning models. The system uses the m2-bert-80M-
               8k-retrieval model by Together AI to generate these embeddings.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Transforms text into high-dimensional vectors.</li>
                <li>Captures semantic meaning and contextual information.</li>
                <li>Enables efficient similarity searches and information retrieval.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Converts text from JSON files into vectorized embeddings.</li>
                <li>Prepares data for storage in the vector database and subsequent analysis.</li>
              </ul>
            </ul>

            <h3 className="heading3">Vector Database</h3>
            <p>The vector database is used to store and reference the vectorized embeddings of the
              JSON files. The system utilizes MongoDB Atlas for this purpose, providing a scalable
               and efficient solution for managing large volumes of vector data.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Supports high-performance storage and retrieval of vector data.</li>
                <li>Scalable to handle large datasets and high query volumes.</li>
                <li>Integrates with various data processing and machine learning tools.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Stores vectorized embeddings generated from the text.</li>
                <li>Facilitates fast and efficient retrieval of similar documents or information.</li>
              </ul>
            </ul>

          </div>

          <p>The second section we will go over is the query response generation. The figure below
             describes how our system is able to generate a response based on the users prompt.
          </p>
          <img className="query-response" alt="Query Response" src={queryResponse}/>
          <h4>Figure 3: Query Response Generation Flow Chart.</h4>

          {/* Subsection: Query Response Generation */}
          <div className="subcontent" id="query">
            <h2 className="heading2">Query Response Generation</h2>

            <h3 className="heading3">Query</h3>
            <p>A query is the question or prompt submitted by the user. In our system, queries are
              sent to the backend using Axios, a promise-based HTTP client for the browser and Node.js.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Allows users to input questions or prompts.</li>
                <li>Transmits data securely and efficiently to the backend.</li>
                <li>Supports asynchronous requests for seamless user experience.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Acts as the initial input from the user.</li>
                <li>Sent to the backend via Axios for further processing.</li>
              </ul>
            </ul>

            <h3 className="heading3">Vector Database</h3>
            <p>The vector database stores embeddings that are compared to the query embedding to find
              the most similar chunk of text. This comparison helps in retrieving relevant information
              that can be used to generate an accurate response.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>High-performance storage and retrieval of vector data.</li>
                <li>Scalable to handle large datasets and high query volumes.</li>
                <li>Integrates seamlessly with the embedding creation and retrieval processes.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Stores embeddings of processed text chunks.</li>
                <li>Facilitates fast and efficient comparison to find the most similar embeddings to the user's query.</li>
              </ul>
            </ul>

            <h3 className="heading3">Most Similar Chunk</h3>
            <p>The most similar chunk is the piece of text retrieved from the vector database that
              closely matches the query. This chunk is returned in JSON format and contains the most
              relevant information needed to address the user's query.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Represents the closest match to the user's query based on vector similarity.</li>
                <li>Delivered in a structured JSON format for easy integration.</li>
                <li>Ensures relevant information is retrieved for prompt construction.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Retrieved from the vector database based on the query embedding.</li>
                <li>Used as part of the prompt to generate a response from the LLM.</li>
              </ul>
            </ul>

            <h3 className="heading3">Prompt</h3>
            <p>The prompt is a composite block of information that includes the user's query, the
              most similar chunk of text, and additional statements designed to guide the LLM in
              generating a coherent and relevant response.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Combines multiple sources of information for context-rich prompts.</li>
                <li>Tailored to optimize the performance of the LLM.</li>
                <li>Enhances the relevance and accuracy of the generated responses.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Constructed from the query, the most similar chunk, and additional tuning statements.</li>
                <li>Provided to the LLM as input for response generation.</li>
              </ul>
            </ul>

            <h3 className="heading3">LLM (Large Language Model)</h3>
            <p>The Large Language Model (LLM) generates responses based on the given prompt. In our
              system, we use Llama3, a sophisticated model designed for natural language understanding and generation.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Advanced natural language processing capabilities.</li>
                <li>Generates contextually relevant and coherent responses.</li>
                <li>Continuously trained and improved for better performance.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Receives the constructed prompt as input.</li>
                <li>Generates a response based on the provided information and context.</li>
              </ul>
            </ul>

            <h3 className="heading3">Response</h3>
            <p>
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Provides direct answers to user queries.</li>
                <li>Delivered through a user-friendly interface.</li>
                <li>Reflects the processing and analysis of the query by the entire system.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Generated by the LLM based on the prompt.</li>
                <li>Sent back to the user via the website, completing the query-response cycle.</li>
              </ul>
            </ul>

          </div>

          <p>In conclusion, our backend development documentation provides a comprehensive overview
            of the system's functionality, divided into two key sections: the data input workflow
            and query response generation. By outlining processes for data ingestion, preparation,
            and advanced natural language processing techniques for response generation, this
            documentation offers valuable insights into the backend infrastructure's operations.
            Through understanding these components, users can gain a deeper appreciation of the
            system's capabilities and its ability to efficiently process user queries and deliver
            contextually relevant responses.
          </p>
        </div>

        {/* Front-End Development Information */}
        <div className="overview">
          <h1 className="heading1" id="frontend">Front-End Development</h1>
          <p>This section provides an in-depth overview of the key technologies and components used
            in our project. Each tool plays a crucial role in the development, deployment, and
            functionality of our system. From the backend framework managing interactions between the
            user interface and the Large Language Model (LLM) to the frontend libraries facilitating
            seamless user interaction. Below, we detail each technology's purpose, features, and specific
            usage within the project to give a comprehensive understanding of how they contribute to the system.
          </p>
          <img className="front-connections" alt="Front-End Connections" src={frontEnd}/>
          <h4>Figure 4: Front-End Connections Flow Chart.</h4>
          <p>Figure 4 describes the connections made between the technologies and components we used
            to create a working and functioning UI.
          </p>

          <div className="subcontent">
            <h2 className="heading2">Tools & Operations</h2>

            <h3 className="heading3">Flask</h3>
            <p>Flask is a micro web framework for Python that is used as the backend framework in this
              project. It is responsible for handling HTTP requests, processing data, and serving the
              necessary responses to the frontend. Flask facilitates the interaction between the frontend
              and the Large Language Model (LLM), ensuring that user inputs are processed and appropriate
              responses are generated and returned.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Lightweight and modular, allowing for flexible development.</li>
                <li>Supports extensions for various functionalities such as database integration, form validation, and authentication.</li>
                <li>Provides tools for routing, request handling, and templating.</li>
                <li>Easily integrates with other Python libraries and frameworks.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Handles API requests from the frontend.</li>
                <li>Manages communication with the LLM.</li>
                <li>Processes and responds to user inputs.</li>
              </ul>
            </ul>

            <h3 className="heading3">Axios</h3>
            <p>Axios is a promise-based HTTP client for the browser and Node.js. It is used within
              the React application to send asynchronous HTTP requests to the Flask backend. Axios
              helps in making GET, POST, and other HTTP requests, and handling the responses.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Supports request and response interception.</li>
                <li>Provides features for automatic transformation of JSON data.</li>
                <li>Offers a simple API for making HTTP requests.</li>
                <li>Supports cancellation of requests and error handling.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Sends user input data from the React frontend to the Flask backend.</li>
                <li>Retrieves responses from the backend to update the UI accordingly.</li>
                <li>Handles API errors and manages loading states.</li>
              </ul>
            </ul>

            <h3 className="heading3">React.js</h3>
            <p>React.js is a JavaScript library for building user interfaces, particularly single-page
              applications where rendering performance is crucial. In this project, React.js is used to
              construct the dynamic and responsive interface of the website, enabling seamless user interactions.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Component-based architecture for reusable UI components.</li>
                <li>Virtual DOM for efficient updates and rendering.</li>
                <li>One-way data binding for predictable data flow.</li>
                <li>Extensive ecosystem with numerous libraries and tools for state management, routing, and more.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Builds and manages the website's user interface.</li>
                <li>Handles user interactions and updates the UI based on user input and backend responses.</li>
                <li>Integrates with Axios to communicate with the Flask backend.</li>
              </ul>
            </ul>

            <h3 className="heading3">Cloudflare Pages</h3>
            <p>Cloudflare Pages is a platform for deploying static and JAMstack websites directly from
              a Git repository. It offers seamless integration with Git for continuous deployment and
              provides built-in security features to protect the website.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>Git-based workflow for automatic deployment on code commits.</li>
                <li>Global CDN for fast content delivery.</li>
                <li>Built-in security features such as DDoS protection and SSL certificates.</li>
                <li>Support for custom domains and redirects.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Deploys the static frontend of the website.</li>
                <li>Automatically updates the live site upon commits to the Git repository.</li>
                <li>Ensures secure and fast access to the website for users.</li>
              </ul>
            </ul>

            <h3 className="heading3">Website</h3>
            <p>he website serves as the user access point for interacting with the system. It provides
              a user-friendly interface built with React.js, allowing users to input data, receive
              responses from the backend, and interact with the LLM.
            </p>
            <ul className="first-bullet">
              <li>Key Features</li>
              <ul className="second-bullet">
                <li>User-friendly interface designed for intuitive interactions.</li>
                <li>Responsive design for accessibility across different devices.</li>
                <li>Integration with backend services to provide dynamic content and responses.</li>
                <li>Secure and reliable access facilitated by Cloudflare Pages.</li>
              </ul>
              <li>Usage in Project</li>
              <ul className="second-bullet">
                <li>Acts as the primary interface for user interactions.</li>
                <li>Collects user inputs and displays backend responses.</li>
                <li>Provides a seamless and responsive user experience.</li>
              </ul>
            </ul>
          </div>

          <p>The overall combination of Flask, Axios, React.js, Cloudflare Pages, and the website
            itself creates an efficient and user-friendly system. Flask serves as the backbone,
            managing the complex interactions between the frontend and the LLM, while Axios ensures
            seamless communication by handling HTTP requests. React.js empowers the development of a
            dynamic and responsive user interface, enhancing user experience. Cloudflare Pages offers
            a reliable and secure deployment platform, ensuring that updates are seamlessly integrated
            and the website remains fast and secure. Together, these technologies form a cohesive system
            that allows users to interact effortlessly with the LLM, providing a smooth and effective
            solution to meet their needs.
          </p>
        </div>

        <div className="overview">
          <h1 className="heading1" id="references">References</h1>
          <ul>
            <li>[1] <i>pdf2doi</i>, PyPi, (n.d.). [Online]. Available: https://pypi.org/project/pdf2doi/</li>
            <li>[2] <i>Document AI</i>, Google Cloud, (n.d.). [Online]. Available: https://cloud.google.com/document-ai/docs</li>
            <li>[3] <i>Tesseract</i>, Tesseract OCR, (n.d.). [Online]. Available: https://tesseract-ocr.github.io/ </li>
            <li>[4] <i>Form Parser</i>, Google Cloud, (n.d.). [Online]. Available: https://cloud.google.com/document-ai/docs/form-parser</li>
            <li>[5] <i>Milvus Docs</i>, Milvus, (n.d.). [Online]. Available: https://milvus.io/docs</li>
            <li>[6] <i>MongoDB</i>, MongoDB, (n.d.). [Online]. Available: https://www.mongodb.com/docs/atlas/getting-started/ </li>
            <li>[7] <i>GPT-3.5 Turbo</i>, OpenAI, (n.d.). [Online]. Available: https://platform.openai.com/docs/models/gpt-3-5-turbo</li>
            <li>[8] <i>Llama 3 (LLM)</i>, Hugging Face, (n.d.). [Online]. Available: https://huggingface.co/docs/transformers/main/en/model_doc/llama3 </li>
            <li>[9] <i>Flask</i>, Pallets Projects, (n.d.). [Online]. Available: https://flask.palletsprojects.com/en/3.0.x/</li>
            <li>[10] <i>llmware</i>, GitHub, (n.d.). [Online]. Available: https://github.com/llmware-ai/llmware</li>
            <li>[11] <i>React Router</i>,  W3Schools, (n.d.). [Online]. Available: https://www.w3schools.com/react/react_router.asp </li>
            <li>[12] <i>REST API Introduction</i>, Geeks for Geeks, (n.d.). [Online]. Available: https://www.geeksforgeeks.org/rest-api-introduction/ </li>
            <li>[13] <i>How to Consume REST APIs in React – a Beginner's Guide</i>, Free Code Camp, (n.d.). [Online]. Available: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/ </li>
            <li>[14] <i>Elasticsearch Guide, Elastic</i>, (n.d.). [Online]. Available: https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html </li>
            <li>[15] <i>Cloudflare Pages, Cloudflare Docs</i>, (n.d.). [Online]. Available: https://developers.cloudflare.com/pages/  </li>
            <li>[16] <i>laska</i>, Perplexity AI, (n.d.). [Online]. Available: https://www.perplexity.ai/search/alaska-8CXjdo1RTH2uNwSWRofY7g </li>
          </ul>
        </div>

      </div>

      {/* Creates a white space between the end of the page content and the bottom of the page */}
      <div className="white-space"></div>
    </div>
  );
};