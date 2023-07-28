import logo from './logo.svg';
import './App.css';
import Events from './components/Events';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from "react-helmet-async";
import {BrowserRouter as Router,Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Organizer from './pages/Organizer';

function App() {

  return (
    <div className="App">
      <HelmetProvider>
        <Events />
      </HelmetProvider>
      

      {/* <Router>
        <Routes>
          <Route exact path="/" element={<Events/>}/>
          <Route exact path="/organizer/:uid" element={<Organizer />}/>
        </Routes>
      </Router> */}

    </div>
  );
}

export default App;
