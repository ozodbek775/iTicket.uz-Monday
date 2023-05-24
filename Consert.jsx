import React from 'react'
import { GiShoppingCart } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import './style.css'


const Consert = ({ concert }) => {
    console.log(concert)
    return (
        <div className="concert">
            {concert.attributes.isHit ? (
                <div class="concert__is-hit">
                    <p>ХИТ ПРОДАЖ</p>
                </div>
            ) : ''}
            <div className="concert__image">
                <Link to={`/ticket/${concert.id}`}>
                    <img src={"http://localhost:1337" + concert.attributes.image.data[0].attributes.url} />
                </Link>
            </div>
            <div class="concert__content">
                <div className="concert__content__texts">
                    <p className='concert__content-title'>{concert.attributes.name}</p>
                    <p className='concert__content-place'>{concert.attributes.place.data.attributes.name}</p>
                </div>
                <Link to={`/ticket/${concert.id}`}>
                    <button className='concert__content-button'><GiShoppingCart />Bilet</button>
                </Link>
            </div>
        </div>
    )
}

export default Consert