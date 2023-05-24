import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'

function Order() {

    const [orders, setOrders] = useState([])
    const [user] = useState(JSON.parse(localStorage.getItem('user')))
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:1337/api/orders?populate=customer&populate=order_ticket.concert&&filters[customer][username]=${user.username}`)
                .then(res => setOrders(res.data.data))
        } else {
            navigate('/sign-in')

        }
    }, [])

    return (
        <React.StrictMode>
            <Layout>
                <table>
                    <thead>
                        <tr>
                            <th>Заказ №</th>
                            <th>Концерт</th>
                            <th>Количество билетов</th>
                            <th>Сумма заказа</th>
                            <th>Номер</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length ? orders.map(order => (
                            <tr>
                                <td >#{order.id}</td>
                                <td><Link to={`/order-detail/${order.id}`} className='td_a'>{order.attributes.order_ticket.data.attributes.concert.data.attributes.name}</Link></td>
                                <td>{order.attributes.order_ticket.data.attributes.amount}</td>
                                <td>{order.attributes.order_ticket.data.attributes.total} UZS</td>
                                <td>+{order.attributes.order_ticket.data.attributes.number}</td>
                            </tr>
                        )) : ''}
                    </tbody>
                </table>
            </Layout>
        </React.StrictMode>
    )
}

export default Order