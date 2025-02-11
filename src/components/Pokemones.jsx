
import { usePokemones } from '../hooks/usePokemones';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Pokemones.css';
import { Cargando } from './Cargando';
import { DetallePokemon } from './DetallePokemon';
import { Buscador } from './Buscador';
import { useState } from 'react';


export const Pokemon = ({ id, name, img, verPokemon }) => {
  return (
    <div key={id} className='pokemon-card' onClick={ verPokemon }>
      <img src={img} alt={name} className='pokemon-imagen' />
      <p className='pokemon-titulo'>
        <span>#{id}</span>
        <span>{name}</span>
      </p>
    </div>
  )
}


export const Pokemones = () => {

  const { pokemones, masPokemones, verMas, searchPokemon } = usePokemones();
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });
  const [busqueda, setBusqueda] = useState('');

  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });

  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {} });
    setBusqueda('');
  }

  const buscarPokemon = async (e) => {
    e.preventDefault();

    if (!busqueda) return

    const pokemon = await searchPokemon(busqueda);

    setMostrar({ mostrar:true, pokemon });
  }

  return (
    <>
      <DetallePokemon { ...mostrar } cerrar={noVerPokemon}/>
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon}/>
      <InfiniteScroll
        dataLength={pokemones.length}
        next={masPokemones}
        hasMore={verMas}
        loader={<Cargando />}
        endMessage={
          <h3 className='titulo' style={{ gridColumn: '1/6' }}>Lo siento, no hay mas pokemones por mostrar</h3>
        }
        className='pokemon-container' >
        {
          pokemones.map(pokemon => {
            return (
              <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)}/>
            )
          })
        }

      </InfiniteScroll>
    </>
  )
}
