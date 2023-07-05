import { Link } from "react-router-dom";
import pokeVideo from '../../assets/video/videoPoke.mp4';
import style from './Landing.module.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemon } from "../../redux/actions";
import imgLoad from '../../assets/loader-logoo.png';




export default function LandinPage() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout (() => {
            setLoading(false);
            dispatch(getAllPokemon());
        },5000);
    }, [dispatch])

    return(
    <div className={style.contenedorPage}>
        <div className={style.videoContenedor}>
        <video
          src={pokeVideo}
          autoPlay
          muted
          loop
          className={style.video}
        ></video>
        </div>
        {loading ? (
            <div className={style.imgContenedor}>
                <img src={imgLoad} alt="pokemon" className={style.imgLoader}/>
            </div>
        ):(
            <div>
          <Link to="/home">
          <div className={style.contenedor}>
            <div className={style.pokeball}>
          <h1 className={style.h1}> GO </h1>
            </div>
          </div>
          </Link>
            </div>
        )}
          <h3 className={style.creador}>By Sol Santa Cruz</h3>
     </div>

    )
}