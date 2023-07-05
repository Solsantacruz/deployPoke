import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearDetail, deletePokemons} from "../../redux/actions";
import { useEffect } from "react";
import style from './Detail.module.css';
import imgPokeDex from '../../assets/pokedexNew.png';
import imgAsh from '../../assets/ashandpokedexNew.png';
import loading from '../../assets/pokeBall.gif';

const Detail = (props) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    let detalle = useSelector((state)=> state.detail)
//  const {name, image, life, attack, defense, speed, } = detalle;




    useEffect(()=>{
        dispatch(getById(id))
        return () =>{
            dispatch(clearDetail()) //Setea lo renderizado anteriormene para que se desmonte al volver de detail a home
        }
    }, [dispatch, id])

    function handleDelete(id){
        dispatch(deletePokemons(id) );
        navigate('/home')
    }
return(
    <div className={style.contenedorP}>
        <div className={style.ash}>
            <img src={imgAsh} alt="ash" />
        </div>
        
        <div className={style.contenedorPokeDex}>
        <Link to='/home'>
        <button className={style.delete}> Back </button>
        </Link>
            <img src={imgPokeDex} alt="pokedex" className={style.imgPokedex}/>
            <div className={style.data}>
            <p className={style.pData}>Data: </p>
            </div>   
        </div>
        <div>
        {detalle.length > 0 ?
        <div>
             {typeof detalle[0].id === 'string' && (
             <button className={style.deletePoke} onClick={() => handleDelete(detalle[0].id)}> X </button>)}
             {typeof detalle[0].id === 'string' && (
             <p className={style.deleteP}>Delete</p>)}
            <h1 className={style.namePoke}> {detalle[0].name}</h1>
            <p className={style.typePoke}>Types: {detalle[0].types.join(' | ')}</p>
            <img src={detalle[0].image} alt="poke" className={style.imgPoke}/>
            <p className={style.life}>Life: {detalle[0].life}</p>
            <p className={style.attack}>Attack: {detalle[0].attack}</p>
            <p className={style.defense}>Defense: {detalle[0].defense}</p>
            <p className={style.speed}>Speed: {detalle[0].speed}</p>
            <p className={style.height}>Height: {detalle[0].height}</p>
            <p className={style.weight}>Weight: {detalle[0].weight}</p>
        </div>
            :
            (<div>
                <img src={loading} alt="loading" className={style.loading}/>
                <h1 className={style.h1Loading}>Loading...</h1>
            </div>)
        }

        </div>
    </div>

)}

export default Detail;