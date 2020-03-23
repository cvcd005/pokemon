import React from 'react';
import PokemonLite from './PokemonLite';
import { observer } from 'mobx-react';
import { Pagination } from 'antd';

const PokemonList = observer((props) => {
	const onShowSizeChange = async (current, pageSize) => {
		props.store.setOffset((current - 1) * pageSize);
		props.store.setLimit(pageSize);
		props.store.createPokemons();
	}

	const onChange = async (evt) => {
		props.store.setOffset((evt - 1) * props.store.limit);
		await props.store.createPokemons();
	}

	return (
		<>
			<div className="pokemon-list">
				{props.store.pokemons.map(el => <PokemonLite pokemon={el} key={el.name} addPokemon={props.store.addPokemon}/>)}
			</div>
			<Pagination
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				total={props.store.pokemonList.length}
				defaultCurrent={1}
				onChange={onChange}
			/>
		</>
	)
});

export default PokemonList;
