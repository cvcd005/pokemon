import { observable, decorate, action } from 'mobx';
import { getPokemons, getPokemon, getType } from '../Api/Api';

class Pokedex {
  pokemonList = [];

  pokemons = [];

  offset = 0;

  limit = 10;

  showModal = false;

  pokemon = {};

  getList = async () => {
    try {
      const response = await getPokemons(0, 965);
      this.pokemonList = [...response.data.results];
      this.createPokemons(); // create first pokemons data list
    } catch (err) {
      /* console.log('err'); */
    }
  };

  createPokemons = async () => {
    const names = this.pokemonList.slice(this.offset, this.offset + this.limit); // create array of names
    const results = await Promise.all(names.map(el => getPokemon(el.name))); // create array of promises and await results
    this.pokemons = [...results.map(el => el.data)]; // create pokemons data list
  };

  filterPokemons = name => {
    if (!name) {
      return this.createPokemons();
    }
    const ar = this.pokemonList.slice();
    this.pokemonList = [...ar.filter(el => el.name.includes(name))];
    return this.createPokemons();
  };

  typesPokemon = async (ar = []) => {
    if (ar.length === 0) {
      this.getList();
      return 1;
    }
    if (ar.length > 2) {
      return [];
    }
    const results = await Promise.all(ar.map(el => getType(el)));
    const cr = results.map(el => el.data);
    const first = cr[0].pokemon.map(el => el.pokemon.name) || [];
    if (ar.length === 1) {
      this.pokemonList = first.map(el => ({ name: el }));
    } else {
      const second = cr[1].pokemon.map(el => el.pokemon.name) || [];
      const res = first.filter(el => second.includes(el));
      this.pokemonList = res.map(el => ({ name: el }));
    }
    return 'aga';
  };

  setOffset = value => {
    this.offset = Number(value);
  };

  setLimit = value => {
    this.limit = Number(value);
  };

  addPokemon = obj => {
    this.pokemon = { ...obj };
  };
}

decorate(Pokedex, {
  pokemonList: observable,
  pokemons: observable,
  offset: observable,
  limit: observable,
  pokemon: observable,
  getList: action,
  createPokemons: action,
  setOffset: action,
  setLimit: action,
  addPokemon: action,
  filterPokemons: action,
  typesPokemon: action,
});

const store = new Pokedex();

export default store;
