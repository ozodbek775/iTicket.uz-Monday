import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Consert from '../../components/Consert/Consert'
import Layout from '../../components/Layout/Layout'
import './style.css'
import Place from '../../components/Places/Place'

function Detail() {
  const params = useParams()
  const [data, setData] = useState([])
  const [concerts, setConcerts] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:1337/api/${params.event}/${params.id}?populate=image&populate=concerts.image&populate=concerts.place&populate=concert`)
      .then(res => {
        setData(res.data.data)
        if (params.event === 'performers') {
          setConcerts(res.data.data.attributes.concerts.data)
        }
        setLoad(true)
      })
  }, [params])

  console.log(data)


  return (
    <Layout>
      {load ? (
        <section className='performer__detail'>
          {params.event === 'performers' ? (
            <>
              <div className="performer__box">
                <img src={`http://localhost:1337${data.attributes.image.data[0].attributes.url}`} alt="" />
                <h1>{data.attributes.name} {data.attributes.surname}</h1>
              </div>
              <div className="performer__concerts-box">
                <h1>Концерты</h1>
                <div className="performer__concerts">
                  {concerts.map(item => (
                    <Consert concert={item} />
                  ))}
                </div>
              </div>
            </>
          ) : ''}
          {params.event === 'places' ? (
            <Place place={data}/>
          ) : ''}

        </section>
      ) : ''}
    </Layout>
  )
}

export default Detail;