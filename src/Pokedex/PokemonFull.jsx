import React from 'react';
import { withRouter } from 'react-router-dom';
import {observer} from 'mobx-react';

const PokemonFull = observer((props) => {
 const {name, sprites: { front_default }, types, stats} = props.pokemon;
  const defense = stats.find(el => el.stat.name === 'defense');
  const attack = stats.find(el => el.stat.name === 'attack');
  const hp = stats.find(el => el.stat.name === 'hp');

  const closeButton = (evt) => {
    evt.preventDefault();
    const { history } = props;
    history.push('/');
  }

  return (
    <div className="pokemon-lite">
      <button onClick={closeButton} className="closeButton">X</button>
      <h2 className="pokemon-lite_title">{name}</h2>
      <div className="pokemon-lite_body">
        <img src ={front_default} alt={`avatar ${name}`} />
        <div className="pokemon-lite_stats">
          <p>def {defense.base_stat} </p>
          <p>att {attack.base_stat} </p>
          <p>hp {hp.base_stat} </p>
        </div>
      </div>
      <div className="pokemon-lite_types">
        {types.map(el => <span key={`${name}${el.type.name}`}>{el.type.name}</span>)}
      </div>
    </div>
  );
});

export default withRouter(PokemonFull);
