import React from 'react';
import "./style.css"
import Consert from "../Consert/Consert";
import Performer from '../Performer/Performer';
import Place from '../Places/Place';

function Data({ concerts, performers, places }) {
    return (
        <React.StrictMode>
            {concerts.length ? (
                <section className='section-block'>
                    <h1>Концерты</h1>
                    <div className="section-block__row">
                        {concerts && concerts.map(concert => (
                            <Consert concert={concert} />
                        ))}
                    </div>
                </section>
            ) : ''}
            {performers.length ? (
                <section className='section-block'>
                    <h1>Испольнители</h1>
                    <div className="section-block__row">
                        {performers && performers.map(performer => (
                            <Performer performer={performer} />
                        ))}
                    </div>
                </section>
            ) : ''}
            {places.length ? (
                <section className='section-block'>
                    <h1>Месты</h1>
                    <div className="section-block__row">
                        {places && places.map(place => (
                            <Place place={place} />
                        ))}
                    </div>
                </section>
            ) : ''}
        </React.StrictMode>
    );
}

export default Data;