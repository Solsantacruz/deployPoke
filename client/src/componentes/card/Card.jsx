import React from 'react';
import style from './Card.module.css';
import {Link} from 'react-router-dom';

const Card = (props)=>{
    const { id, name, image, types, attack} = props;
    // console.log(id);
    const primaryType = types[0];

    const cardClasses = `${style.card} ${types.map((type) => style[primaryType.toLowerCase()]).join(' ')}`;
return(
    <>
    <Link to={`/detail/${id}`} className={style.link}>
    <div className={cardClasses}>
        
        <div className={style.imgContenedor}>
        <img src={image} alt='foto' className={style.img} height="100" width={100}/>
        </div>
        <h3 className={style.name}>{name}</h3>
        <p className={style.p}>{types.join(' | ')}</p>
        <div>
        <p className={style.pAttk}>Attk {attack}</p>
        </div>
        
    </div>
    </Link>
    </>
)
};

export default Card;