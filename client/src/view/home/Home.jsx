import React from 'react';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPokemon,filterByAttack, filterByTypes, sortByCreated, sortByOrderName } from '../../redux/actions';
import Card from '../../componentes/card/Card';
import Paginado from '../../componentes/paginado/Paginado';
import './Home.css'



const Home = () => {

    const dispatch = useDispatch()
    const pokemons = useSelector((state) => state.allPokemons);
    const loadingState = useSelector((state) => state.loading);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePage] = useState(12);
    const indexOfLastPoke = currentPage * pokePage;
    const indexFirstPoke = indexOfLastPoke - pokePage;
    const currentPoke = pokemons.slice(indexFirstPoke,indexOfLastPoke)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
      if(loadingState){
        return;
      }  else {
        dispatch(getAllPokemon())
      }
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getAllPokemon());
      
    }

    function handleFilterAttack(e) {
        dispatch(filterByAttack(e.target.value));
        setCurrentPage(1);
      }

    function handleFilterType(e) {
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1);
    }

    function handleSortCreated(e) {
        dispatch(sortByCreated(e.target.value))
        setCurrentPage(1);
    }

    function handleSortName(e) {
        dispatch(sortByOrderName(e.target.value))
        setCurrentPage(1);
    }

    return(
        <div className='contenedor'>
          <div className='contenidoElementos'>
            <button onClick={e=>{handleClick(e)}} className='boton'> Reset </button>
        <div className='filtros'>
        <select onChange={handleSortName} className='select'>
            <option value="filtro"> A-Z:</option>
            <option value="asc">Aa-Zz</option>
            <option value="desc">Zz-Aa</option>
          </select>
          <select name="selects" onChange={e=>{handleFilterAttack(e)}}className='select'>
            <option value="Fuerza"> Attack </option>
            <option value="Mayor fuerza"> + Attk </option>
            <option value="Menor fuerza"> - Attk </option>
          </select>
          <select onChange={handleFilterType} className='select'>
            <option value="tipo"> Type </option>
            <option value="normal"> Normal </option>
            <option value="flying"> Flying </option>
            <option value="poison"> Poison </option>
            <option value="ground"> Ground </option>
            <option value="bug"> Bug </option>
            <option value="fire"> Fire </option>
            <option value="water"> Water </option>
            <option value="grass"> Grass </option>
            <option value="electric"> Electric </option>
            <option value="fairy"> Fairy </option>
            <option value="ice"> Ice </option>
            <option value="dragon"> Dragon </option>
            <option value="unknown"> Unknown </option>
            <option value="shadow"> Shadow </option>
            <option value="dark"> Dark </option>
            <option value="steel"> Steel </option>
            <option value="rock"> Rock </option>
            <option value="fairy"> Fairy </option>
            <option value="ghost"> Ghost </option>
            <option value="fighting"> Fighting </option>
          </select>
          <select onChange={handleSortCreated} className='select'>
            <option value="Todos"> All </option>
            <option value="Creados"> Created </option>
            <option value="Existentes"> Existing </option>
          </select>
          </div>
         <div className='paginado'>
            <Paginado 
            pokePage={pokePage}
            pokemons={pokemons.length}
            paginado={paginado}
            currentPage={currentPage}
            />
            </div>
            <div className='contenedor-card'>
            {currentPoke?.map((poke)=>{
                // console.log(poke)
                return(
                <Card 
                key={poke.id} 
                id={poke.id}
                name={poke.name}  
                image={poke.image}
                types={poke.types}
                attack={poke.attack}
                />
                );
            })
            }
            
        </div>
     </div>
    </div>


)}

export default Home;