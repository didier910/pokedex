import './Buscador.css';
import { Buscar } from './Icons';

export const Buscador = ({ busqueda, setBusqueda, buscarPokemon }) => {
  return (
    <>
        <h3 className='titulo'>Mas de 800 pokemones, elige tu favorito</h3>
        <form className='container-buscador' onSubmit={buscarPokemon}>
            <input type="text" placeholder='Encuentra tu pokemon' className='input-buscar' value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
            <button className='btn-buscar' type='submit'>
                <Buscar />
                Buscar pokemon
            </button>
        </form>
    </>
  )
}
