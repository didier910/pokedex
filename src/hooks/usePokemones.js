import { useEffect } from 'react';
import { useState } from 'react';
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/'

export const usePokemones = () => {

  const [pokemones, setPokemones] = useState([]);
  const [siguienteUrl, setSiguienteUrl] = useState('');
  const [verMas, setVerMas] = useState(true);

  const fetchPokemones = async(url) => {
    const response = await fetch(url);
    const poke = await response.json();

    const abilities = poke.abilities.map(a => a.ability.name);
    const stats = poke.stats.map(s => { return { name: s.stat.name, base: s.base_stat } });
    const types = poke.types.map(t => t.type.name);

    return {
      id: poke.id,
      name: poke.name,
      img: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
      abilities,
      stats,
      types
    }
  }

  const getPokemones = async (url = URL_DEFAULT) => {
    // Recuperamos el listado de los pokemones
    const response = await fetch(url);
    const listaPokemones = await response.json();
    const { next, results } = listaPokemones;

    const newPokemones = await Promise.all(
      results.map( (pokemon) => fetchPokemones(pokemon.url) )
    )

    return { next, newPokemones };
  }

  const obtenerPokemones = async () => {
    const { next, newPokemones } = await getPokemones();
    setPokemones(newPokemones);
    setSiguienteUrl(next);
  }

  const masPokemones = async () => {
    const { next, newPokemones } = await getPokemones(siguienteUrl);
    setPokemones(prev => [...prev, ...newPokemones]);
    next === null && setVerMas(false);
    setSiguienteUrl(next);
  }

  const searchPokemon = async (busqueda) => {
    const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`
    return await fetchPokemones(url)
  }

  useEffect(() => {

    obtenerPokemones();

  }, []);

  return { pokemones, masPokemones, verMas, searchPokemon }
}
