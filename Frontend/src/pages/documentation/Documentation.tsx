import NavBar from "../../components/NavBar/NavBar"
import InfoButton from "../../components/InfoButton/InfoButton"
import "./Documentation.css"
import systemOverview from "../../images/system-overview.png"

export default function Documentation() {
  return (
    <div>
      {/* Inserts other components onto the page */}
      <div>
        <NavBar />
        <InfoButton />
      </div>

      {/* Container to hold page content */}
      <div className="container">

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
            <h2 className="heading2">System Overview</h2>
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
                <li className="table"><a href="#backend">1. Back-End Development</a></li>
                <li className="table"><a href="#frontend">2. Front-End Development</a></li>
                <li className="table"><a href="#deployment">3. Deployment</a></li>
                <li className="table"><a href="#troubleshooting">4. Troubleshooting</a></li>
                <li className="table"><a href="#references">5. References</a></li>
              </ol>
            </p>
          </div>
        </div>

        <div className="overview">
          <h1 className="heading1" id="backend">Back-End Development</h1>
          <p>(words)
          </p>

          <div className="subcontent">
            <h2 className="heading2">PDF OCR Pipeline</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <div className="subcontent">
            <h2 className="heading2">LLM Pipeline</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <p>(words)
          </p>
        </div>

        <div className="overview">
          <h1 className="heading1" id="frontend">Front-End Development</h1>
          <p>(words)
          </p>

          <div className="subcontent">
            <h2 className="heading2">React App</h2>
            <p>(words)
            </p>
            <h3 className="heading3">Framework</h3>
            <p>(words)
            </p>
            <h3 className="heading3">Axios</h3>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <div className="subcontent">
            <h2 className="heading2">Usage</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h4>Figure 1: System Overview: Step-By-Step Breakdown.</h4>
            <p>(words)
            </p>
          </div>

          <p>(words)
          </p>
        </div>

        <div className="overview">
          <h1 className="heading1" id="deployment">Deployment</h1>
          <p>(words)
          </p>

          <div className="subcontent">
            <h2 className="heading2">Back-End: Flask</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <div className="subcontent">
            <h2 className="heading2">Front-End: Cloudflare Docs</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <p>(words)
          </p>
        </div>

        <div className="overview">
          <h1 className="heading1" id="troubleshooting">Troubleshooting</h1>
          <p>(words)
          </p>

          <div className="subcontent">
            <h2 className="heading2">(Topic 1)</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <div className="subcontent">
            <h2 className="heading2">(Topic 2)</h2>
            <p>(words)
            </p>
            <img className="system-overview" alt="System Overview" src={systemOverview}/>
            <h3>Figure 1: System Overview: Step-By-Step Breakdown.</h3>
            <p>(words)
            </p>
          </div>

          <p>(words)
          </p>
        </div>

        <div className="overview">
          <h1 className="heading1" id="references">References</h1>
          <ul>
            <li>[1] <i>pdf2doi</i>, PyPi, (n.d.). [Online]. Available: https://pypi.org/project/pdf2doi/</li>
            <li>[2] <i>Document AI</i>, Google Cloud, (n.d.). [Online]. Available: https://cloud.google.com/document-ai/docs</li>
            <li>[3] <i>Form Parser</i>, Google Cloud, (n.d.). [Online]. Available: https://cloud.google.com/document-ai/docs/form-parser</li>
            <li>[4] <i>Milvus Docs</i>, Milvus, (n.d.). [Online]. Available: https://milvus.io/docs</li>
            <li>[5] <i>GPT-3.5 Turbo</i>, OpenAI, (n.d.). [Online]. Available: https://platform.openai.com/docs/models/gpt-3-5-turbo</li>
            <li>[6] <i>Flask</i>, Pallets Projects, (n.d.). [Online]. Available: https://flask.palletsprojects.com/en/3.0.x/</li>
            <li>[7] <i>llmware</i>, GitHub, (n.d.). [Online]. Available: https://github.com/llmware-ai/llmware</li>
            <li>[8] <i>React Router</i>,  W3Schools, (n.d.). [Online]. Available: https://www.w3schools.com/react/react_router.asp</li>
            <li>[9] <i>REST API Introduction</i>, Geeks for Geeks, (n.d.). [Online]. Available: https://www.geeksforgeeks.org/rest-api-introduction/</li>
            <li>[10] <i>How to Consume REST APIs in React – a Beginner's Guide</i>, Free Code Camp, (n.d.). [Online]. Available: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/</li>
            <li>[11] <i>Elasticsearch Guide</i>, Elastic, (n.d.). [Online]. Available: https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html</li>
            <li>[12] <i>Cloudflare Pages</i>, Cloudflare Docs, (n.d.). [Online]. Available: https://developers.cloudflare.com/pages/</li>
          </ul>
        </div>

      </div>

      {/* Creates a white space between the end of the page content and the bottom of the page */}
      <div className="white-space"></div>
    </div>
  );
};