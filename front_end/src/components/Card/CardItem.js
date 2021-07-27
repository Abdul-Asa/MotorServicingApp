import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
    return (
        <>
            <Link className="cards__item__link" to={props.path}>
                <figure className="cards__item__pic-wrap" data-category={props.label}>
                    <img src={props.src} alt="car_pic" className="cards__item__img" />
                </figure>
                <div className="cards__item__info">

                    <h2 className="cards__item__text">
                        {props.title}
                    </h2>

                    <h5 className="cards__item__text">
                        {props.text}
                    </h5>

                    
                </div>
            </Link>
        </>
    )
}

export default CardItem