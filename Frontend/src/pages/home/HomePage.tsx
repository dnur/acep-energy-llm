import Header from "../../components/Header/Header";
import Chat from "../../components/Chat";
import "./HomePage.css";


export default function  HomePage() {
    return (
    <div className="min-h-screen bg-gray">
      <Header />
      <Chat />
    </div>
  );
}
