import { useState } from 'react'
import "./InfoButton.css"
import infoLogo from "../../images/information-button.png";
import xLogo from "../../images/x-mark.png";

const hidden = {
  display: 'none'
}

export default function InfoButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* Displays or does not display the information box */}
      <p className='information-box' style={isOpen ? hidden : {}}>
        <b>Disclaimer:</b> Note that this is a pilot. Generated content may be inaccurate or false. Please check important data.
      </p>
      {/* When the button is clicked, the information opens */}
      <button className='info-button' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <img alt="Info" className="info-logo" src={infoLogo} /> : <img alt="X" className="x-logo" src={xLogo} />}
      </button>
    </div>
  )
}
