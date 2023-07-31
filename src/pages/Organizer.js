import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MdCall } from 'react-icons/md'
import config from "../contentstack_config.json"


const Organizer = ({darkMode}) => {
  const { state } = useLocation()
  const [organizers, setOrganizers] = useState([])

  const getOrganizers = async() => {
    const base_url = "graphql.contentstack.com"
    const environment = config.values[2].value
    
    const url = `https://graphql.contentstack.com/stacks/blt3815e63116cffb83?environment=preview&query={
      all_event_organizer {
        total
        items {
          description
          contact_number
          title
          url
          organizer_imageConnection {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }`
    // console.log(url)
    const options = {
      method: "GET",
      headers : {
        access_token: "cs7be79a265bc2248e20fa30c3",
      }
    }

    try {      
      const response = await fetch(url, options)
      const results = await response.text()

      setOrganizers(JSON.parse(results).data.all_event_organizer.items)

    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(organizers)
    if (!state) 
      getOrganizers()
    else 
      setOrganizers([state])
  },[])

  // console.log(organizers);
  return (
    <div className="organizer-container">
      <h2>Organizers</h2>
    {organizers?.map((item, index) => (

      <div className={`organizer ${darkMode ? 'dark-mode' : ''}`} key={index}>
            <img className="profile-image" src={item?.organizer_imageConnection?.edges[0]?.node.url} />
          <div className="profile-main">
            <h2 className="profile-name">{item?.title}</h2>
            <div>
              <p
                className="profile-body"
                dangerouslySetInnerHTML={{
                  __html: item?.description,
                }}
              ></p>

              <span><MdCall style={{color: "darkblue"}} size={25}/>{item?.contact_number}</span>
            </div>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default Organizer