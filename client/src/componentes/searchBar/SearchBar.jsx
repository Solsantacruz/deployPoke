import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getSearchName} from '../../redux/actions';
import style from './SearchBar.module.css';
import charLoad from '../../assets/charGirando.gif';


const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [load, setLoad] = useState(false);
    // console.log(name)

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
   
     function handleSubmit(e){
        e.preventDefault();
        if(!name) {
            alert(`Ingrese un nombre valido.
 No puede contener numeros ni caracteres especiales.
 No debe contener mayusculas.`);
        } else {
            setLoad(true);
             dispatch(getSearchName(name))
             .then(() => {
                setLoad(false);
             setName("")
             })
          } 
}
    return(
    <div>
        {
            !load ? 
                <div>
                <input type='text' placeholder="Search..." value={name} onChange={handleInputChange} className={style.input} />
        <button type="submit" onClick={handleSubmit} className={style.boton}> Search </button>
        </div> : (
            <div className={style.contenedorSearch}>
                <img src={charLoad} alt="search" />
                <h2>Searching...</h2>
            </div>
        )}
    </div>
)}

export default SearchBar;