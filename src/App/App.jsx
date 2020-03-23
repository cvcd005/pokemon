import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {observer} from 'mobx-react';
import {Col} from 'antd';

import { PokemonList, PokemonFull } from '../Pokedex';
import Filter from '../Filters';

import 'antd/dist/antd.css';
import './App.scss';

const App = observer((props) => { 
  
  useEffect(() => { //componentDidMount create first full pokemons list
    props.store.getList();
  }, [])

  return (
    <BrowserRouter >
      <Col xs={20} md={16} md={{ span: 16, offset: 2 }}>
        <Route path="/pokemon" exact render={() => <Filter filterPokemons={props.store.filterPokemons} t={props.store.typesPokemon}/> } />
        <Route path="/pokemon" exact render={() => <PokemonList list={props.store.pokemons} store={props.store}/> }  /> 
        <Route exact path="/pokemon/:name" render={()=> <PokemonFull pokemon={props.store.pokemon}></PokemonFull>} />
        </Col>
    </BrowserRouter>
  );
});

export default App;
