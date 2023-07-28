import React, { useEffect, useState } from 'react'
import config from "../contentstack_config.json"
import EventCard from './EventCard'
import {BsCart} from 'react-icons/bs'
import Cart from './Cart'
import EventsNavbar from './EventsNavbar'
import { Helmet } from "react-helmet-async";
import {BrowserRouter as Router,Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { Nav } from 'react-bootstrap'

const Events = () => {
  const [data, setData] = useState(null)
  const [events, setEvents] = useState(null)
  const [organizer, setOrganizer] = useState('')
  const [cart, setCart] = useState([])

  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

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
    <>
    <EventsNavbar events={events} setEvents={setEvents}/>
    <div className='events'>
      <button className='cart' onClick={handleShowCart}><BsCart size={'40px'} /><span className="cart-items">{cart.length}</span></button>
      <Cart handleCloseCart={handleCloseCart} showCart={showCart} cart={{cart, setCart}}/>

      {/* Displaying multiple event cards with image and title. */}
      <div className='events-container'>
        {events?.entries?.map((event, index) => (
          <>
            <Helmet>
            {
              <>
                <title>{event.seo.title}</title>
                <meta name="description" content={event.seo.meta_title} />
              </>
            }
            </Helmet>
            <EventCard key={index} events={events} event={event} setOrganizer={setOrganizer} cart={{cart, setCart}}/>
          </>
          ))}
      </div>
    </div>
    </>
  )
}

export default Events