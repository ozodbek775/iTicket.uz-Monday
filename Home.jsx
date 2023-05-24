import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
import Data from '../../components/Data/Data';
import './style.css'

function Home() {
    const [concerts, setConcerts] = useState([])
    const [places, setPlaces] = useState([])
    const [performers, setPerformers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:1337/api/concerts?populate=*").then(res => setConcerts(res.data.data))
        axios.get("http://localhost:1337/api/performers?populate=*").then(res => setPerformers(res.data.data))
        axios.get("http://localhost:1337/api/places?populate=*").then(res => setPlaces(res.data.data))
    }, [])

    const search = (value) => {
        axios.get("http://localhost:1337/api/concerts?populate=*" + `&filters[name][$contains]=${value}`).then(res => setConcerts(res.data.data))
        axios.get("http://localhost:1337/api/performers?populate=*" + `&filters[name][$contains]=${value}`).then(res => setPerformers(res.data.data))
        axios.get("http://localhost:1337/api/places?populate=*" + `&filters[name][$contains]=${value}`).then(res => setPlaces(res.data.data))
    }

    return (
        <Layout search={search}>
            <div className='banner'>
                <img src={`https://cdn.iticket.uz/event/slider/0oBJiXmocWf5FtiWUGZUteYa793lswnB.png`} />
            </div>
            <Data concerts={concerts} places={places} performers={performers} />
        </Layout>
    )
}


export default Home
