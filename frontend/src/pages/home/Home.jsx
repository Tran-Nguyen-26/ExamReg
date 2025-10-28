import Header from "../../components/header/Header";
import Notification from "../../components/notification/Notification";
import Subject from "../../components/subject/Subject";
import './Style-Home.css'
import { useContext } from "react";
import MyContext from "../../context/MyContext";

const Home = () => {

  const {subjects} = useContext(MyContext)

  return (
    <div className="home-container">
      <Header/>
      <div className="notification-wrapper">
        <Notification/>
      </div>
      <div className="subjects">
        {
          subjects.map(subject => (
            <Subject key={subject.id} data={subject} />
          ))
        }
      </div>
    </div>
  )
}

export default Home;