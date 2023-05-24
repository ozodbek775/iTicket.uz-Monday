import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import './style.css'



function CheckOut() {
	const params = useParams()
	const [data, setData] = useState()
	const [econom, setEconom] = useState(0)
	const [fun, setFun] = useState(0)
	const [business, setBusiness] = useState(0)
	const [customer] = useState(JSON.parse(localStorage.getItem('user')))
	const [modal, setModal] = useState(false)
	const [phone, setPhone] = useState('')
	const [amount, setAmount] = useState(0)
	const [total, setTotal] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		axios.get(`http://localhost:1337/api/concerts/${params.id}?populate=*`)
			.then(res => setData(res.data.data))
	}, [])

	useEffect(() => {
		if (data) {
			setAmount(econom + fun + business)
			setTotal((econom * data.attributes.econom) + (fun * data.attributes.fun) + (business * data.attributes.business))
		}
	}, [econom, fun, business])

	const checkModal = () => {
		if (!customer) {
			navigate('/sign-in')
		} else {
			if (econom || fun || business) {
				setModal(true)
			} else {
				alert('Купите хотябы 1 билет')
			}
		}
	}

	const order = (e) => {
		e.preventDefault()
		axios.post('http://localhost:1337/api/order-tickets', {
			data: {
				customer: customer,
				concert: data,
				amount: amount,
				total: total,
				number: phone,
				econom: econom,
				fun: fun,
				business: business
			}
		}).then(res => {
			axios.post('http://localhost:1337/api/orders', {
				data: {
					order_ticket: res.data.data,
					customer: customer
				}
			}).then(res => {
				axios.put(`http://localhost:1337/api/concerts/${data.id}`, {
					data: {
						tickets: data.attributes.tickets - amount
					}
				}).then(res => {
					navigate('/my-orders')
				})
			})
		})
	}

	console.log(data)

	return (
		<Layout>
			{data ? (
				<>
					<div class="order__info">
						<div className="order__info-column">
							<h1>Место</h1>
							<p>{data.attributes.place.data.attributes.name}</p>
						</div>
						<div className="order__info-column">
							<h1>Дата</h1>
							<p>{data.attributes.data}</p>
						</div>
						<div className="order__info-column">
							<h1>Цена</h1>
							<p>{data.attributes.econom} - {data.attributes.business} UZS</p>
						</div>
					</div>
					<div className="orders">
						<h1 className='orders__head'>Всего билетов: {data.attributes.tickets}</h1>
						<div className="order__cards">
							<div className="order__card">
								<h1 className='order__card-title'>Эконом</h1>
								<p className='order__card-price'>Цена: {data.attributes.econom} сум</p>
								<div className='order__card-input'>
									<button onClick={() => setEconom(econom !== 0 ? econom - 1 : 0)}>-</button>
									<input type="number" value={econom} />
									<button onClick={() => setEconom(econom + 1)}>+</button>
								</div>
							</div>
							<div className="order__card">
								<h1 className='order__card-title'>Фан</h1>
								<p className='order__card-price'>Цена: {data.attributes.fun} сум</p>
								<div className='order__card-input'>
									<button onClick={() => setFun(fun !== 0 ? fun - 1 : 0)}>-</button>
									<input type="number" value={fun} />
									<button onClick={() => setFun(fun + 1)}>+</button>
								</div>
							</div>
							<div className="order__card">
								<h1 className='order__card-title'>Бизнес</h1>
								<p className='order__card-price'>Цена: {data.attributes.business} сум</p>
								<div className='order__card-input'>
									<button onClick={() => setBusiness(business !== 0 ? business - 1 : 0)}>-</button>
									<input type="number" value={business} />
									<button onClick={() => setBusiness(business + 1)}>+</button>
								</div>
							</div>
						</div>
						<button className='order__button' onClick={() => checkModal()}>Купить</button>
					</div>
				</>
			) : ''}

			{modal ? (
				<div className="shadow">
					<div className="modal">
						<h1 className='modal__title'>Потдвердите заказ</h1>
						<p>Пользователь: {customer.username}</p>
						<p>Концерт: {data.attributes.name}</p>
						<p>Количество: {amount}</p>
						<p>Эконом: {econom}</p>
						<p>Фан: {fun}</p>
						<p>Бизнес: {business}</p>
						<p>Общая сумма: {total} UZS</p>
						<form onSubmit={e => order(e)}>
							<input type="text" placeholder='Номер телефона' required value={phone} onChange={e => setPhone(e.target.value)} />
							<div className="modal__buttons">
								<button>Потдвердить</button>
								<button onClick={() => setModal(false)}>Отменить</button>
							</div>
						</form>
					</div>
				</div>
			) : ""}

		</Layout>
	)
}

export default CheckOut