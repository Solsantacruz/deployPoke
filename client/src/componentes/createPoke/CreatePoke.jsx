import {Link} from 'react-router-dom';
import { createPokemon, getAllPokemon, getTypes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import validate from './validation';
import { useNavigate } from 'react-router-dom';
import style from './CreatePoke.module.css';
import imgSelec from './imgSelect';


const CreatePoke = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types)
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [imgSele, setImgSele] =useState("");
    const [error, setError] = useState({required: true});
    const [input, setInput] = useState({
        name: "",
        image:"",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: []
    });

    function handleChange(e) {
        if(e.target.name === 'image'){
            setInput({
                ...input,
                [e.target.name]: imgSele || e.target.value,
              });
        } else {
            setInput({
                ...input,
                [e.target.name] : e.target.value
            })
        }
        let objError = validate({
            ...input, [e.target.name] : e.target.value
        })
        setError(objError)
          // Verificar si todos los campos están completos
        const isComplete = Object.values(objError).every((value) => !value);
        if(input.image.length > 0){
            setIsFormComplete(isComplete);
        }
    }

    //Imagen select
    function handleImageClick(image) {
        setImgSele(image);
        setInput({
          ...input,
          image: image,
        })
    }
     
    //Types
    function handleSelect(e){
        if(e.target.checked) {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        } else if(!e.target.checked){
            setInput({
                ...input,
                type: input.type.filter((el) => el !== e.target.value),
            })
        }
        let objError = validate({
            ...input,
                type: [...input.type, e.target.value]
        })
        setError(objError)
          // Verificar si todos los campos están completos
        const isComplete = Object.values(objError).every((value) => !value);
            setIsFormComplete(isComplete);
    }

    function handleSubmit(e){
        if(error.required){
            e.preventDefault();
            alert("Complete todos los campos para continuar")
        } else {
            e.preventDefault();
        dispatch(createPokemon(input))
            alert('¡Pokemon creado exitosamente!')
            setInput({
                name: '',
                image:'',
                life:0,
                attack:0,
                defense:0,
                speed:0,              
                height:0,
                weight:0,
                type: [],
            })
        }
        navigate('/home');
        dispatch(getAllPokemon())
    }
    
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    function handleRefresh() {
        window.location.reload();
      }

    return(
    <div className={style.contenedor}>
    <h1 className={style.h1Title}> Create your pokemon </h1>
    <div className={style.dexForm}>
    <Link to='/home'><button className={style.btnVolver}> Back </button></Link>
    <button onClick={handleRefresh} className={style.btnRefresh}> Refresh </button>
    </div>
    <div className={style.column}>
        <div className={style.conteImg}> 
        <div className={style.imgList}>
        {imgSelec.map((image) => (
        <img
        src={image}
        alt='newPoke'
        key={image}
        className={style.imgMuestra}
        onClick={() => handleImageClick(image)}/>
       ))}
      </div>
      {!imgSele ? (
     <label> 
      <input //Si no elige img brindada puede pasar url
      type="text"
      value={input.image}
      name="image"
      placeholder="URL image: https://www.example..."
      onChange={handleChange}
      className={style.input}/>
       {/* <div className={style.conteMuestra}>
            {input.image && (
            <img 
            className={style.conteImgCargada}
            src={input.image}
            alt='Imagen seleccionada'/>
         )}
        </div> */}
    </label>
       )  : null}
        </div>
        <div className={style.containerTypes}>
            <div className={style.checkTypes}>
                {types?.map((ty) => (
                    <div className={style.checkOptions} key={ty}>
                        <input value={ty.name} type='checkbox' name='type' id={ty.name} onChange={handleSelect} className={style.ckeck} />
                        <label className={style.typesLabels} htmlFor={ty.name}>{ty.name} </label>
                    </div>
                ))
                
                }
            </div>
           {!error.type ? null : (<span className={style.span}>{error.type}</span>)}
        </div>
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.contenedorForm}>
        <div>
            <label className={style.nombre}> Name </label>
            <input type='text' value={input.name} name="name" placeholder='Ingresa el nombre' onChange={handleChange} className={style.input} />
            {!error.name ? null : (<span className={style.span}>{error.name}</span>)}
        </div>
        <div className={style.contenedorRange}>
        <div>
            <label> Life </label>
            <input type='range' min='0' max='150' value={input.life} name="life"  onChange={handleChange} className={style.range} style={
                          error.life ? { boxShadow: 'inset 0 0 6px #ff1f1f'} : null
                        }/>
            <span className={style.contador}> {input.life}</span>
            {!error.life ? null : (<span className={style.span}>{error.life}</span>)}
        </div>
        <div>
            <label> Attack </label>
            <input type='range' min='0' max='150' value={input.attack} name="attack"  onChange={handleChange} className={style.range} style={
                          error.attack ? { boxShadow: 'inset 0 0 6px #ff1f1f'} : null
                        }/>
                        <span className={style.contador}> {input.attack}</span>
            {!error.attack ? null : (<span className={style.span}>{error.attack}</span>)}
        </div>
        <div>
            <label> Defense </label>
            <input type='range' min='0' max='150'value={input.defense} name="defense"  onChange={handleChange} className={style.range} style={
                          error.defense ? { boxShadow: 'inset 0 0 6px #ff1f1f'} : null
                        }/>
                        <span className={style.contador}> {input.defense}</span>
            {!error.defense ? null : (<span className={style.span}>{error.defense}</span>)}
        </div>
        <div>
            <label> Speed </label>
            <input type='range' min='0' max='150' value={input.speed} name="speed"  onChange={handleChange} className={style.range} style={
                          error.speed ? { boxShadow: 'inset 0 0 6px #ff1f1f'} : null
                        }/>
                        <span className={style.contador}> {input.speed}</span>
            {!error.speed ? null : (<span className={style.span}>{error.speed}</span>)}
        </div>
        <div>
            <label> Height </label>
            <input type='range' min='0' max='150' value={input.height} name="height"  onChange={handleChange} className={style.range} style={
                          error.height ? { boxShadow: 'inset 0 0 6px #ff1f1f'} : null
                        }/>
                        <span className={style.contador}> {input.height}</span>
            {!error.height ? null : (<span className={style.span}>{error.height}</span>)}
        </div>
        <div>
            <label> Weight </label>
            <input type='range' min='0' max='150' value={input.weight} name="weight" onChange={handleChange} className={style.range} style={
                          error.weight ? { boxShadow: 'inset 0 0 6px #ff1f1f'} : null
                        }/>
                        <span className={style.contador}> {input.weight}</span>
            {!error.weight ? null : (<span className={style.span}>{error.weight}</span>)}
        </div>
        </div>
        <button type='submit' className={style.btnCrear} disabled={!isFormComplete} style={!isFormComplete ? {backgroundColor:'whitesmoke', color:"black"} : null }> Create Pokemon </button>
        </div>
    </form>
    </div>
</div>
         
)}

export default CreatePoke;