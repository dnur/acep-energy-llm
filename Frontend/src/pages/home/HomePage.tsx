import NavBar from "../../components/NavBar/NavBar"
import InfoButton from "../../components/InfoButton/InfoButton"
import Chat from "../../components/Chat/Chat"
import Personality from "../../components/Personality/Personality"
import "./HomePage.css"


export default function  HomePage() {
    return (
        <div className="min-h-screen bg-gray">
          <NavBar />
          <Chat />
          <InfoButton />
          <Personality />
        </div>
  );
}
