import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

function Performer({ performer }) {
  return (
    <div className="performer">
      <Link to={`/detail/performers/${performer.id}`}>
        <div className="performer__image">
          <img src={"http://localhost:1337" + performer.attributes.image.data[0].attributes.url} />
        </div>
      </Link>
      <div class="performer__content">
        <p>{performer.attributes.name} {performer.attributes.surname}</p>
      </div>
    </div>
  )
}

export default Performer;