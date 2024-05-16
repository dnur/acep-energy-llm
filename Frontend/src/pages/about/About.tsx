import { useState } from 'react'
import NavBar from "../../components/NavBar/NavBar"
import InfoButton from "../../components/InfoButton/InfoButton"
import "./About.css"
import najibPicture from "../../images/headshots/Haidar_Najib_headshot.jpeg"
import aaronPicture from "../../images/headshots/Hong_Aaron_headshot.jpeg"
import akashPicture from "../../images/headshots/Shetty_Akash_headshot.png"
import ichiroPicture from "../../images/headshots/Nakata_Gerald_headshot.jpeg"
import benjaminPicture from "../../images/headshots/Jiang_Benjamin_headshot.jpeg"
import whitneyPicture from "../../images/headshots/Waldinger_Whitney_headshot.jpeg"
import joniPicture from "../../images/headshots/Nguyen_Joni_headshot.jpeg"
import brianPicture from "../../images/headshots/Han_Brian_headshot.jpeg"

// Sets up the paragraph style when closed
const paragraphStyles = {
  maxHeight: '4.5em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
}

export default function About() {
  // Sets up the constants for when each individual paragraph is open or closed
  const [isOpenNajib, setIsOpenNajib] = useState(false)
  const [isOpenAaron, setIsOpenAaron] = useState(false)
  const [isOpenAkash, setIsOpenAkash] = useState(false)
  const [isOpenIchiro, setIsOpenIchiro] = useState(false)
  const [isOpenBenjamin, setIsOpenBenjamin] = useState(false)
  const [isOpenWhitney, setIsOpenWhitney] = useState(false)
  const [isOpenJoni, setIsOpenJoni] = useState(false)
  const [isOpenBrian, setIsOpenBrian] = useState(false)

  return (
    <div>
      {/* Inserts other components onto the page */}
      <div>
        <NavBar />
        <InfoButton />
      </div>

      {/* Page content component */}
      <div className="container">

        {/* Page Introduction block */}
        <div className="overview">
          <h1 className="heading1">About</h1>
          <p>The Alaska Center for Energy and Power (ACEP) has initiated a project
          titled "Efficient Energy Research: Building an Advanced Language Model and Interface" with the
          objective of developing an advanced Language Model (LLM) Chatbot tailored specifically to the
          field of energy research. Over a dedicated period of three months, the ACEP team has focused
          their efforts on designing and implementing this innovative solution aimed at revolutionizing
          the process of data discovery for energy researchers.</p>
          <p>The project's scope encompasses the development and deployment of the
          LLM Chatbot, which is intended to streamline data discovery from dense academic works.
          By harnessing open-source technology, the Chatbot will enable researchers at the University
          of Alaska to access relevant information and citations efficiently, thus addressing the challenge
          of data discovery in energy research.</p>
          <p>Recognizing the significant time and effort researchers invest in searching
          for relevant materials, the initiative aims to alleviate this burden by providing a user-friendly
          interface for prompt and accurate information retrieval. Moreover, the project aspires to extend
          its impact beyond the University of Alaska by evolving into an open-source solution that benefits
          multiple universities or even multiple different industries.</p>
          <p>Through fostering collaborative knowledge sharing, the project seeks to
          advance research endeavors in the field of energy. The ACEP team's ultimate goal is to contribute
          to the enhancement of energy research efficiency and effectiveness, thereby driving advancements
          and addressing critical energy-related challenges.</p>
        </div>

        {/* Team Overview block */}
        <div className="overview">
          <h1 className="heading1">Team Overview</h1>
          <p className="paragraph">Introducing our exceptional team, comprised of driven individuals with
          a shared passion for excellence. With diverse backgrounds and expertise, we unite under a common
          goal, leveraging our unique strengths to achieve remarkable results together.</p>

          {/* Individual introduction block */}
          {/* Creates a container to place the image and text side-by-side */}
          <div className="flex-container">
            {/* Creates a container to hold the headshot */}
            <div className="flex-img">
              <img alt="Najib" src={najibPicture} />
            </div>
            {/* Creates a container for the text */}
            <div className="flex-text">
              <h2 className="heading2">Najib Haidar</h2>
              {/* Determines how the paragraph should display depending on if the button is clicked or not */}
              <p style={isOpenNajib ? {} : paragraphStyles}>
                Najib is part of the backend team and has had a part in all aspects
                of it. Initially, he spearheaded the creation of the initial OCR pipeline. To elaborate, he
                tested and deployed Google's DocumentAI and FormParser for text and table extraction respectfully.
                After making these processes work locally, he shifted them into a single pipeline function call
                that would allow this process to work remotely over Google Drive, whereby the 3 storage buckets
                were created. In addition to the OCR pipeline, he worked with Whitney and Akash in allowing the
                LLM respond with the sources from which it is pulling the information and link it to the
                corresponding PDFs. Najib also worked with Ichiro on creating a web scraper that could extract
                PDFs from web pages and download them locally, saving plenty of time. This webscraper was
                later expanded by Najib to extract the PDFs from the ISER dataset that was provided by Dhaha.
                In addition, Najib worked with Ben and Aaron on details with the connector such as Zapier and
                AirByte and later sat down with Ben and figured out how autonomously extract metadata from PDFs
                using their corresponding DOI.
              </p>
              {/* When the button is clicked, the paragraph opens */}
              <button onClick={() => setIsOpenNajib(!isOpenNajib)}>
                {isOpenNajib ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Aaron" src={aaronPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Aaron Hong</h2>
              <p style={isOpenAaron ? {} : paragraphStyles}>
                Aaron is part of the backend team. He was responsible for the design
                and implementation of the now obsolete Airbyte data pipeline, as well as the decision to use
                Google Drive as the main form of pipeline cloud storage. He conducted extensive research on
                ways to automatically transfer data across services and developed an early data pipeline prototype
                using Airbyte. Using his deployments of Airbyte and Elasticsearch, documents processed by the OCR
                pipeline were sent to a user endpoint for the first time ever. When the backend design iterated
                past using Airbyte and Elasticsearch, Aaron worked with the rest of the backend team to refine
                the new entirely Pythonic data pipeline. In specific, he worked with Najib on his OCR pipeline
                to refine the JSON output of Google’s DocumentAI, leading to a 99% reduction in JSON file size
                with negligible loss of information.
              </p>
              <button onClick={() => setIsOpenAaron(!isOpenAaron)}>
                {isOpenAaron ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Akash" src={akashPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Akash Shetty</h2>
              <p style={isOpenAkash ? {} : paragraphStyles}>
                Akash is part of the backend team for the ACEP Captstone team. In his
                role contributing to the design of ACEP, Akash had the unique opportunity to bridge the realms
                of both frontend and backend development, for a cohesive user experience. His main accomplishment
                was spearheading the creation of the actual chatbot, a task that combined the efforts of creating
                the processed data and creating a RAG model using MILVUS as his vector database, an embedding
                model from Hugging face, and the underlying LLM using OPENAI gpt-3.5-turbo. Collaborating closely
                with the backend team, Akash contributed to the robust architecture that underpins the chatbot's
                functionality, ensuring reliability, scalability, and performance. This holistic approach enabled
                him to ensure that the chatbot not only meets the immediate needs of users but also integrates
                smoothly with the backend systems, laying a foundation for future enhancements and features. Throughout
                the project Akash was able to collaborate and develop with both the front and backend team.
              </p>
              <button onClick={() => setIsOpenAkash(!isOpenAkash)}>
                {isOpenAkash ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Ichiro" src={ichiroPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Ichiro (Gerald) Nakata</h2>
              <p style={isOpenIchiro ? {} : paragraphStyles}>
                Ichiro is the project manager for the ACEP Capstone team. He organized
                backend group meetings and documentation as well as organizing overall group meetings. In addition,
                he helped to update and maintain the internal documentation for the team. This included creating
                graphics as needed for the team pertaining to the overall project structure, the backend project
                structure, as well as the Gantt chart. All biweekly reports were also his responsibility, alongside
                setting up documents for the weekly individual and group reports for the faculty/TA meetings.
                Additionally, he contributed to the start of the backend PDF pipeline with a web scraper that
                was used to pull PDFs from websites. The scraper pulls the HTML and parses through the REGEX to
                find all of the links to documents and subsequently downloads them.
              </p>
              <button onClick={() => setIsOpenIchiro(!isOpenIchiro)}>
                {isOpenIchiro ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Benjamin" src={benjaminPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Benjamin Jiang</h2>
              <p style={isOpenBenjamin ? {} : paragraphStyles}>
                Benjamin is part of the backend team, notably in data management and
                processing. His contributions include advocating for the adoption of Google Drive for its
                cost-effectiveness and flexibility, enhancing data manipulation methods, and recommending
                Amazon Textract for superior table parsing performance over Google Form Parser. He spearheaded
                the design and implementation of a data pipeline that facilitated seamless data transfers
                between cloud storage and Elasticsearch, incorporating research into solutions like Meltano,
                Airbyte, and Zapier for effective data integration. With the shift towards using a vector
                database, now the effort has been transferred to calling Milvus api using python code. Furthermore,
                in collaboration with team members Nijib and Aaron, he improved metadata acquisition and refined
                JSON outputs from Document AI OCR, contributing to the quality of document processing. Currently,
                he's focused on refining Python-based data pipelines alongside the backend team, aiming to bolster
                our data processing capabilities and ensure the scalability of our backend infrastructure.
              </p>
              <button onClick={() => setIsOpenBenjamin(!isOpenBenjamin)}>
                {isOpenBenjamin ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Whitney" src={whitneyPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Whitney Waldinger</h2>
              <p style={isOpenWhitney ? {} : paragraphStyles}>
                Whitney is the communication manager for the ACEP Capstone team. She
                handled the communication between Rose Johnson (TA), Rajesh Subramayan (Faculty Mentor), Dhaha
                Nur (Industry Mentor) and the rest of the capstone team. This included helping to schedule weekly
                meetings and reserving meeting locations. She also acted as the project manager for the frontend
                team. She helped to create, design, code, and improve the UI. She worked with Dhaha and iterated
                through various different designs for the frontend. At first, she implemented an App Search
                utilizing Elasticsearch. She created a Search Engine in the Elastic Cloud to do so. This UI
                allowed the users to filter the search results and returned a list of all documents fitting
                the criteria. Then, once the team chose to focus on a Chatbot integration rather than search
                engine, she helped to alter Akash’s chatbot UI to fit the design guidelines set by Dhaha. She
                also worked with Najib and Akash to incorporate not only the summarized answer but also the
                data sources, with links, under each response from the LLM.
              </p>
              <button onClick={() => setIsOpenWhitney(!isOpenWhitney)}>
                {isOpenWhitney ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Joni" src={joniPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Joni Nguyen</h2>
              <p style={isOpenJoni ? {} : paragraphStyles}>
                Joni is the budget manager for the ACEP Capstone team. She is responsible for
                overseeing project budget, and communicating with the team and mentors about necessary purchases.
                Currently, there are no purchases that need to be made but if there are, she is the point of contact
                for all things finance for this team. Joni is also a part of the frontend team for the ACEP Capstone
                team. Her primary responsibilities include collaborating and communicating with the frontend team and
                the rest of the ACEP team, and implementing the static website. To develop the user interface (UI),
                Joni used the React.js framework to implement the various components and pages. With Dhaha’s guidance
                and direction, Joni, alongside the rest of the frontend team, curated the website’s design, layout,
                and style. Furthermore, Joni took charge of documenting the UI by outlining its structure, component
                functionalities, and usage guidelines. This documentation encompasses detailed descriptions of each
                component, their functions, and how they interact with one another. Additionally, Joni documented the
                project's setup instructions, coding conventions, and best practices, ensuring clarity and consistency
                in the development process.
              </p>
              <button onClick={() => setIsOpenJoni(!isOpenJoni)}>
                {isOpenJoni ? "less" : "more"}
              </button>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-img">
              <img alt="Brian" src={brianPicture} />
            </div>
            <div className="flex-text">
              <h2 className="heading2">Brian Han</h2>
              <p style={isOpenBrian ? {} : paragraphStyles}>
                Brian is part of the frontend team for the ACEP Capstone team, primarily
                responsible for the implementation of the static websites. In the development process, he utilized
                the React.js framework to write robust code for various components and pages. Concurrently, Brian
                collaborated with Whitney and Joni to discuss and design the webpage’s layouts, styles, and
                distribution of pages, as per Daha's specifications. Based on these requirements, Brian has
                programmed the CSS styles for several components and improved the functionality of the search bar
                and chat box. Importantly, Brian also manages the codebase and architecture of the front-end project.
                Leveraging the component-based philosophy of the React framework, he has outlined the project workspace,
                breaking down the front-end implementation into discrete components and further refining the page layout
                hierarchy. This approach decouples individual code contributions, preventing unnecessary conflicts, providing a seamless development workflow for future expansions.
              </p>
              <button onClick={() => setIsOpenBrian(!isOpenBrian)}>
                {isOpenBrian ? "less" : "more"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Creates a white space between the page content and the bottom of the page */}
      <div className="whiteSpace"></div>
    </div>
  );
};
