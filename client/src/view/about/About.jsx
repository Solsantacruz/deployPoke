import style from './About.module.css';
import title from '../../assets/logo-loader.png';


export default function About () {
    return(
        <>
        <div className={style.contenedorAbout}>
            <div className={style.titleImg}>
                <img src={title} alt="titulo" />
            </div>
                <h1 className={style.titleH1}>Poke-Dex</h1>
            <div className={style.contenedorParrafo}>
                <p className={style.titleParr}>¡Bienvenido a nuestra increíble Pokedex en línea!</p>
                <p className={style.texto1}>En nuestro sitio, podrás sumergirte en el fascinante mundo de los Pokémon y explorar
                   una amplia variedad de criaturas sorprendentes. Nuestra Pokedex combina la emoción
                   de descubrir nuevos Pokémon, la nostalgia de los clásicos y la posibilidad de 
                   crear tu propio Pokémon único.</p>
                <p className={style.texto1}>Sumérgete en un mar de colores, formas y habilidades mientras navegas por nuestras tarjetas de Pokémon bellamente diseñadas. Obtén información detallada sobre cada Pokémon, incluyendo su tipo, habilidades, estadísticas y mucho más. Si buscas a un Pokémon en particular, simplemente usa nuestra práctica función de búsqueda por nombre y encuentra a tu favorito al instante.</p>

                <p className={style.texto1}> Pero eso no es todo. ¡En nuestra Pokedex, tú también puedes convertirte en un entrenador Pokémon y crear tu propio compañero de aventuras! Personaliza tu Pokémon eligiendo su nombre, imagen, atributos y tipo. ¡Da vida a tu imaginación y diseña un Pokémon único que se destacará entre los demás!</p>

                <p className={style.texto2}> Así que, ¿estás listo para embarcarte en una aventura Pokémon inolvidable? ¡Explora, descubre, crea y hazte con todos en nuestra increíble Pokedex en línea</p>
            </div>
        </div>
        </>
    )
}