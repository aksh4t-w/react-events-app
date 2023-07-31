import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import EventBlog from '../pages/EventBlog'
import { Helmet, HelmetProvider } from "react-helmet-async";

const EventCard = ({events, event, cart, darkMode}) => {
  const [show, setShow] = useState(false);

  const [newEvent, setNewEvent] = useState(event);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Router>
        <Routes>
          <Route exact path="/" element={<App />}></Route>
          <Route path="/pages/eventblog" element={<EventBlog event={event} show={show} />}></Route>
        </Routes>
        <Link to="/pages/eventblog" style={{textDecoration: "none"}}></Link>
      </Router> */}
        <Helmet>
            {
              <>
                <title>{event.seo.title}</title>
                <meta name="description" content={event.seo.meta_description} />
              </>
            }
        </Helmet>

        <Card className={`event-card ${darkMode ? 'dark-mode' : ''}`} style={{ width: '18rem', margin: '3rem' }}>
          <Card.Img variant="top" src={event.poster.url} height={"180rem"} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{__html : event.event_details.description.slice(0,100) + "..."}}>
            </Card.Text>
            <Card.Text>Location: {event.location}</Card.Text>
            {/* Button to open a Modal showing more details about the event. */}
            <Button variant="primary" onClick={handleShow}>See event</Button>
          </Card.Body>
        </Card>
        {show && <EventBlog handleClose={handleClose} events={events} event={newEvent} show={show} cart={cart} setNewEvent={setNewEvent} darkMode = {darkMode}/>}
    </>
  )
}

export default EventCard