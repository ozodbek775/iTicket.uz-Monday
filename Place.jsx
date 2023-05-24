import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

function Place({ place }) {
  return (
    <div className='place'>
      <Link to={`/detail/places/${place.id}`}>
      <img src={"http://localhost:1337" + place.attributes.image.data[0].attributes.url} />
        </Link>
      <div className='place__content'>
        <h1>{place.attributes.name}</h1>
        <p>{place.attributes.street}</p>
      </div>
    </div>
  )
}

export default Place