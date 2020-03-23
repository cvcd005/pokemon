import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { observer } from 'mobx-react';

const PokemonLite = observer((props) => {
  const {name, sprites: { front_default }, types, stats} = props.pokemon;
  const defense = stats.find(el => el.stat.name === 'defense');
  const attack = stats.find(el => el.stat.name === 'attack');
  const hp = stats.find(el => el.stat.name === 'hp');

  const openFullPokemonCard = () => { 
    const { history } = props; /* достаем объект хистори из WithRouter */ 
    const { addPokemon } = props;
    addPokemon(props.pokemon);
    history.push(`${name}`);
  }

  return (
    <div className="pokemon-lite" onClick={openFullPokemonCard}>
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
      <Modal
          title="Basic Modal"
          visible={props.showModal}
          onOk={props.changeModal}
          okButtonProps="disabled"
      ></Modal>
    </div>
  );
});

export default withRouter(PokemonLite);
