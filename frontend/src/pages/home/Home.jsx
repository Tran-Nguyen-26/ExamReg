import Header from "../../components/header/Header";
import Notification from "../../components/notification/Notification";
import Subject from "../../components/subject/Subject";
import './Style-Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <Header/>
      <div className="notification-wrapper">
        <Notification/>
      </div>
      <div className="subjects">
        <Subject/>
        <Subject/>
        <Subject/>
        <Subject/>
      </div>
    </div>
  )
}

export default Home;