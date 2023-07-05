import notFound from '../../assets/notFound.png';
import style from './NotFound.module.css';

const NotFoundPage = () =>{
    return(
        <div className={style.contenedorNot}>
            <h1 className={style.h1Not}> Error 404: No se encontro la pagina </h1>
            <img src={notFound} alt="not found" className={style.imgNot}/>
        </div>
    )

}

export default NotFoundPage;