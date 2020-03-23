import React from 'react';
import { 
  Form,
  Button,
  Checkbox,
  Input,
 } from 'antd';

 const typesList = [ 'bug',
 'dark',
 'dragon',
 'electric',
 'fairy',
 'fighting',
 'fire',
 'flying',
 'ghost',
 'grass',
 'ground',
 'ice',
 'normal',
 'poison',
 'psychic',
 'rock',
 'steel',
 'water' ]

const MyCheckBox = (props) => {
  return (
    <Checkbox
    value={props.value}
    style={{
      lineHeight: '32px',
    }}
  >
   {props.value}
  </Checkbox>
  )
}

const Filter = (props) => {
  const onFinish = values => {
    const {filterPokemons, t} = props;
    filterPokemons(values.name);
    t(values.checkboxg);
    console.log('Received values of form: ', values);
  };
  
  return (
    <Form
        name="validate_other"
        onFinish={onFinish}
    >
      <Form.Item label="Pokemon Name" name="name" >
        <Input />
      </Form.Item>

        <Form.Item name="checkboxg" label="Pokemons Type">
          <Checkbox.Group>
            {typesList.map(el => <MyCheckBox value={el} key={el} /> ) }              
          </Checkbox.Group>
        </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
     
      </Form>
    );
  };


export default Filter;