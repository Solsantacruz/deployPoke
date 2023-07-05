import './Paginado.css';

export default function Paginado({ pokePage, pokemons, paginado, currentPage }) {
    const pagNumber = [];
  
    for (let i = 1; i <= Math.ceil(pokemons / pokePage); i++) {
      pagNumber.push(i);
    }
  
    return (
      <nav>
            <button className='fijo' onClick={() => paginado(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
          {pagNumber?.map((number) => (
              <button
                key={number}
                onClick={() => paginado(number)}
                className={currentPage === number ? 'active' : 'fijo'}>
                {number}
              </button>
          ))}
            <button
              className='fijo'
              onClick={() => paginado(currentPage + 1)}
              disabled={currentPage === pagNumber.length}>
              Next
            </button>
      </nav>
    );
  }
  