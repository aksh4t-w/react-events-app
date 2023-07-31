import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import Events from './components/Events';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from "react-helmet-async";
import {BrowserRouter as Router,Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Organizer from './pages/Organizer';
import config from "./contentstack_config.json"
import EventsNavbar from './components/EventsNavbar';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const [events, setEvents] = useState(null)

  const base_url = config.values[0].value
  const environment = config.values[1].value
  const landing = config.values[4].value
  const event_blog = config.values[5].value
  const event_organizer = config.values[6].value

  const url1 = `${base_url}/v3/content_types/${landing}/entries?environment=${environment}`;
  const url2 = `${base_url}/v3/content_types/${event_blog}/entries?environment=${environment}`;
  const url3 = `${base_url}/v3/content_types/${event_organizer}/entries?environment=${environment}`;

  const getData = async() => {
    const options = {
      method: "GET",
      headers : {
        api_key: config.values[2].value,
        access_token: config.values[3].value,
      }
    }
    try {
      const response2 = await fetch(url2, options)
      const results2 = await response2.text()

      // console.log(JSON.parse(results2))
      setEvents(JSON.parse(results2))

    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  },[])


  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <HelmetProvider>
        {/* <Events darkMode={darkMode}/> */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode?<BsSunFill size={20} className="moon-icon"/> : <BsMoonFill size={20} className="moon-icon" />}
        </button>
      </HelmetProvider>
      
      <HelmetProvider>
      <Router>
      <EventsNavbar events={events} setEvents={setEvents}/>
        <Routes>
          <Route exact path="/" element={<Events darkMode={darkMode} events={events} setEvents={setEvents}/>}/>
          <Route exact path="/organizer/" element={<Organizer darkMode={darkMode}/>}/>
        </Routes>
      </Router>
      </HelmetProvider>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Events Aggregator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
