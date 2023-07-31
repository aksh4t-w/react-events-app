import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, Modal, Nav } from 'react-bootstrap'
import config from "../contentstack_config.json"
import PromotedCard from '../components/PromotedCard'
import { PiSpeakerHighFill, PiSpeakerXDuotone } from 'react-icons/pi';
import {BrowserRouter as Router,Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Organizer from './Organizer';




const EventBlog = ({events, event, show, handleClose, cart, setNewEvent, darkMode}) => {
  const [organizer, setOrganizer] = useState("")
  const [promotedEvents, setPromotedEvents] = useState(null)
  const [relatedEvents, setRelatedEvents] = useState(null)
  const [read, setRead] = useState(false)
  const [synth, setSynth] = useState(null)

  const navigate = useNavigate()
  const blogRef = useRef(null)

  const date = new Date(event.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Adding 1 since months are zero-based (0 for January, 1 for February, and so on).
  const day = date.getDate();

  // Format the date as "YYYY-MM-DD"
  const normalDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const addToCart = () => {
    const cartEvent = {title: event.title, price: event.ticket_price}
  
    // Check if cart has the current event then increment its quantity 
    cart.setCart([...cart.cart, cartEvent])
    // handleClose()
  }

  const openOrganizer = () => {
    navigate(`/organizer/?id=${event.organizer_details[0].uid}`, { state: organizer, sendOrg: true })
  }

  useEffect(()=>{
    blogRef.current.focus();
    setSynth(new SpeechSynthesisUtterance())
    const temp1 = events.entries
      .filter((item) => item.uid !== event.uid && item.tags[0] === event.tags[0])
    setRelatedEvents(temp1);

    const temp2 = events.entries
      .filter((item) => item.uid !== event.uid && item.tags[1] === "promoted")
    setPromotedEvents(temp2);
    getOrganizer()
  }, [event])

  
  // useEffect(() => {
  //   // Navigate to the EventBlog page when selectedId is not null
  //   if (props.selectedId !== "") {
  //     navigate(`/event_blog/?id=${props.selectedId}`, {
  //       state: { id: props.selectedId },
  //     });
  //     props.setSelectedId("");
  //   }

  // }, [props.selectedId, navigate]);



  const screenReader = () => {
    if (!read) {
      setRead(true)
      synth.text = event.event_details.description
      window.speechSynthesis.speak(synth)
    }
    else {
      window.speechSynthesis.cancel(synth)
      setRead(false)
    }
  }

  const getOrganizer = async() => {
    const base_url = "graphql.contentstack.com"
    const environment = config.values[1].value
    const uid = event.organizer_details[0].uid
    
    const query = `{
      event_organizer(uid: "${uid}") {
        contact_number
        description
        organizer_imageConnection {
          edges {
            node {
              url
            }
          }
        }
        title
      }
    }`
    const url = `https://${base_url}/stacks/${config.values[2].value}?environment=${environment}&query=${query}`

    const options = {
      method: "GET",
      headers : {
        access_token: config.values[3].value,
      }
    }

    try {      
      const response = await fetch(url, options)
      const results = await response.text()

      setOrganizer(JSON.parse(results).data.event_organizer) 
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div ref={blogRef} id="modal-title" aria-modal="true" aria-labelledby="modal-title" aria-required="true">
      

    <Modal className={`event-blog ${darkMode ? 'dark-mode' : ''}`} show={show}  onHide={handleClose} size='xl' >
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{display: "flex", justifyContent: "center", borderBottom: "1px solid lightgray"}}>
        <Image style={{margin: "auto"}} src={event.poster.url} rounded width="75%" />
      </Modal.Body>

      <div className='description'>
        {/* SCREEN READER BUTTON */}
        <Button className="speaker" onClick={screenReader}>
          {!read ? <PiSpeakerHighFill size={25}/>:<PiSpeakerXDuotone size={25}/>}
        </Button>

        <Modal.Body style={{fontSize: 18, width: "80%", margin: "auto", borderBottom: "1px solid lightgray"}} dangerouslySetInnerHTML={{__html : event.event_details.description}}></Modal.Body>
      </div>
      <Modal.Body style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:"space-around", borderBottom: '1px solid lightgray'}}> 
        
        {/* EVENT ORGANIZER */}
        <div style={{borderRadius:"10%", maxWidth:"35%", display: "flex", alignItems: "center", padding:"0.2rem", justifyContent: "space-between"}}>
          <h5>Organized By: <div className='organizer-link' onClick={openOrganizer}>{event.organizer}</div> </h5>
          {/* <Image src={organizer?.organizer_imageConnection?.edges[0].node.url} style={{width:"8rem"}} rounded width="30%" /> */}
        </div>
        
        
        <div>
          <h4>Location: {event.location}</h4>  
          <h4>Date: {normalDate}</h4>
          <h4>Ticket Price: ${event.ticket_price}</h4>  
        </div>
      </Modal.Body>

      <div style={{display: 'flex', margin: 'auto', marginTop: "1rem", marginBottom: "-1rem"}}>
        <div >
          <h3 style={{textAlign: 'center', marginBottom: "-1.5rem"}}>Promoted Event</h3>
          <PromotedCard relatedEvents={promotedEvents} setNewEvent={setNewEvent}/>
        </div>
        <div>
        <h3 style={{textAlign: 'center', marginBottom: "-1.5rem"}}>Related Event</h3>
          <PromotedCard handleClose={handleClose} relatedEvents={relatedEvents} setNewEvent={setNewEvent}/>
        </div>
      </div>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addToCart}>
          Add to cart
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default EventBlog