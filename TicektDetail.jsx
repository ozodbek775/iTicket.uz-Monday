import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { FcPlanner } from 'react-icons/fc'
import { IoLocation } from 'react-icons/io5'
import { GiArmadilloTail } from 'react-icons/gi'
import { BsTicketDetailed } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import { ImWhatsapp } from 'react-icons/im'
import { AiOutlineTwitter } from 'react-icons/ai'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'

const TicektDetail = () => {

  const [concert, setConcert] = useState(null)
  const params = useParams()

  useEffect(() => {
    axios.get(`http://localhost:1337/api/concerts/${params.id}?populate=image&populate=performer&populate=place.image`)
      .then(res => setConcert(res.data.data))
  }, [])

  console.log(concert)
  return (
    <Layout>
      {concert && (
        <div className="detail__container">
          <div className="detail__column">
            <div className="detail__row">
              <div className="detail__consert-box">
                <div className="detail__consert-img">
                  <img src={`http://localhost:1337${concert.attributes.image.data[0].attributes.url}`} alt="" />
                </div>
                <div className="detail__consert-content">
                  <h1 className='detail__consert-title'>{concert.attributes.name}</h1>
                  <p className='detail__consert-time'><FcPlanner /> {concert.attributes.data}</p>
                  <p className='detail__consert-location'><IoLocation fill='red' />{concert.attributes.place.data.attributes.name}</p>
                  <p className='detail__consert-price'>Цена: {concert.attributes.econom} - {concert.attributes.business} so'm</p>
                  <p className='detail__consert-warning'><GiArmadilloTail /> Билеты возврату не подлежат.</p>
                  <Link to={`/buy-ticket/${concert.id}`}>
                    <button className='detail__consert-button'><BsTicketDetailed />Купить билет</button>
                  </Link>
                  <div className='detail__socials'>
                    <a className='detail__social detail__social_tg'><FaTelegramPlane />Telegram</a>
                    <a className='detail__social detail__social_fc'><BsFacebook />Facebook</a>
                    <a className='detail__social detail__social_wh'><ImWhatsapp />Whatsap</a>
                    <a className='detail__social detail__social_tw'><AiOutlineTwitter />Twintter</a>
                  </div>
                </div>
              </div>

              <div className='detail__description'>
                <h1>ОПИСАНИЕ МЕРОПРИЯТИЯ</h1>
                <hr />
                <p className='detail__description-content'>{concert.attributes.description}</p>
              </div>
            </div>

            <div className='detail__place'>
              <h1 className='detail__place-header'>МЕСТО ПРОВЕДЕНИЯ</h1>
              <img src={`http://localhost:1337${concert.attributes.place.data.attributes.image.data[0].attributes.url}`} />
              <div className="detail__place-content">
                <h1>{concert.attributes.place.data.attributes.name}</h1>
                <br />
                <p>Адрес: <span>{concert.attributes.place.data.attributes.street}</span></p>
                <br />
                <p>Телефон: <span>(+998 71) 245 02 67</span></p>
              </div>
            </div>

          </div>
        </div>
      )}
    </Layout>
  )
}

export default TicektDetail 