import imgLoader from '../../assets/logo-loader.png';
// import style from './Loader.module.css'


const Loader = () => {
  return (
    <div>
      <img src={imgLoader} alt='Loading' />
    </div>
  );
};

export default Loader;