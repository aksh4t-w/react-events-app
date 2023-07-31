import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import config from "../contentstack_config.json"

const PromotedCard = ({handleClose, relatedEvents, setNewEvent, darkMode}) => {
  // const navigate = useNavigate()
  // navigate('/eventblog/')


  useEffect(()=>{
    // console.log(relatedEvents ? relatedEvents[0] : null)
    // getData()
    
  })

  const handleClick = () => {
    setNewEvent(relatedEvents[0])
  }

  // const getData = async() => {
  //   const options = {
  //     method: "GET",
  //     headers : {
  //       api_key: config.values[2].value,
  //       access_token: config.values[3].value,
  //     }
  //   }

  //   try {
  //     const response2 = await fetch(`https://cdn.contentstack.io/v3/content_types/event_blog/entries/${relatedEvents[0].uid}?environment=preview`, options)
  //     const results2 = await response2.text()

  //     console.log(JSON.parse(results2))
  //     // setData(JSON.parse(results1))
  //     // setEvents(JSON.parse(results2))

  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
    {
      relatedEvents?.slice(0,1)?.map((item,index) => (
        <Card key={index} className={`promoted-card event-card ${darkMode ? 'dark-mode' : ''}`} style={{ width: '18rem', margin: '3rem' }} >
          <Card.Img variant="top" src={item?.poster?.url} height={"180rem"} />
          <Card.Body>
            <Card.Title>{item?.title}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{__html : item?.event_details?.description.slice(0,50) + "..."}}>
            </Card.Text>
            <Card.Text>Location: {item?.location}</Card.Text>
            {/* Button to open a Modal showing more details about the event. */}
            <Button style={{margin: 'auto'}} variant="primary" onClick={handleClick}>See event</Button>
          </Card.Body>
        </Card>
      ))
    }
  </>
  )
}

export default PromotedCard
