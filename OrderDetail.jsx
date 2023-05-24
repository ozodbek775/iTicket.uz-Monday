import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './orderdetail.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'




function OrderDetail() {
    const params = useParams()
    const [tickets, setTickets] = useState([])
    const [load, setLoad] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:1337/api/orders/${params.id}?populate=order_ticket.concert.image`)
            .then(res => {
                setTickets(res.data.data.attributes.order_ticket.data.attributes)
                setLoad(true)
            })
        // .catch(console.log)

    }, [])
    console.log(tickets)

    let makeArray = (count) => {
        let arr = []
        for (let i = 0; i < count; i++) {
            arr.push(i)
        }
        return arr
    }

    return (
        <React.StrictMode>
            <Navbar />
            {tickets && load ? (
                <div className='order__tickets'>
                    <div className="tickets1">
                        {Number(tickets.econom) ? <h1>Эконом билеты</h1> : ''}
                        <div className="tickets">
                            {makeArray(Number(tickets.econom)).map(item => (
                                <div className="ticket__img"></div>
                            ))}
                        </div>
                        {Number(tickets.fun) ? <h1>Фан билеты</h1> : ''}
                        <div className="tickets">
                            {makeArray(Number(tickets.fun)).map(item => (
                                <div className="ticket__img"></div>
                            ))}
                        </div>
                        {Number(tickets.business) ?    <h1>Бизнес билеты</h1> : ''}

                     
                        <div className="tickets">
                            {makeArray(Number(tickets.business)).map(item => (
                                <div className="ticket__img"></div>
                            ))}
                        </div>
                    </div>
                    <div className='const'>
                        <div className='const__img'>
                            <img src={`http://localhost:1337${tickets.concert.data.attributes.image.data[0].attributes.url}`} width={350} alt="" />
                        </div>
                        <h1>{tickets.concert.data.attributes.name}</h1>
                    </div>
                </div>
            ) : ''}

            <Footer />
        </React.StrictMode>
    )
}

export default OrderDetail