import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Consert from '../../components/Consert/Consert'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Performer from '../../components/Performer/Performer'
import Place from '../../components/Places/Place'


function Category() {
  const params = useParams()
  const [concerts, setConcerts] = useState([])
  const [performers, setPerformers] = useState([])
  const [places, setPlaces] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:1337/api/concerts?populate=*").then(res => setConcerts(res.data.data))
    axios.get("http://localhost:1337/api/performers?populate=*").then(res => setPerformers(res.data.data))
    axios.get("http://localhost:1337/api/places?populate=*").then(res => setPlaces(res.data.data))
    setLoad(true)
  }, [])

  const search = (value) => {
    axios.get("http://localhost:1337/api/concerts?populate=*" + `&filters[name][$contains]=${value}`).then(res => setConcerts(res.data.data))
    axios.get("http://localhost:1337/api/performers?populate=*" + `&filters[name][$contains]=${value}`).then(res => setPerformers(res.data.data))
    axios.get("http://localhost:1337/api/places?populate=*" + `&filters[name][$contains]=${value}`).then(res => setPlaces(res.data.data))
  }

  return (
    <React.StrictMode>
      <Navbar search={search}/>
      {params.event === 'concerts' ? (
        <section className='section-block'>
          <h1>Концерты</h1>
          <div className="section-block__row">
            {load && concerts.map(concert => (
              <Consert concert={concert} />
            ))}
          </div>
        </section>
      ) : ''}
      {params.event === 'performers' ? (
        <section className='section-block'>
          <h1>Испольнители</h1>
          <div className="section-block__row">
            {load && performers.map(performer => (
              <Performer performer={performer} />
            ))}
          </div>
        </section>
      ) : ''}
      {params.event === 'places' ? (
        <section className='section-block'>
          <h1>Месты</h1>
          <div className="section-block__row">
            {load && places.map(place => (
              <Place place={place} />
            ))}
          </div>
        </section>
      ) : ''}
      <Footer />
    </React.StrictMode>
  )
}

export default Category