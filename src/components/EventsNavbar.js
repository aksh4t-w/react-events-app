import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

function EventsNavbar({events, setEvents}) {
  const [searchText, setSearchText] = useState("");
  const [searchedEvents, setSearchedEvents] = useState(events);
  const navigate = useNavigate()


  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" ) {
      event.preventDefault();
      handleSearch();
    }
  }

  const goToHome = () => {
    navigate(`/`)
  }

  const goToOrgs = () => {
    navigate(`/organizer/`, { state: null, sendOrg: false })
  }

  const handleSearch = (e) => {
    
    const x = events?.entries?.filter((value) => value?.title?.toLowerCase().includes(searchText.toLowerCase()))
    setEvents({entries: x})

    // Update the state with filtered values

    // You can perform other actions based on filteredValues if needed
  };

  return (
    
    // <Router>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand to="/">Events</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link to="/" onClick={goToHome}>Home</Nav.Link>
              <Nav.Link to="/organizer/" onClick={goToOrgs}>Organizers</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onKeyDown={(e)=>handleKeyDown(e)}
              />
              <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    // </Router>
  );
}

export default EventsNavbar;