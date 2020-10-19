import React, {Component} from "react";
import {connect} from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';

import * as usuariosActions from '../../actions/usuariosActions';


//const App = () => {// cuando comienza con const y el nombre es un Stateless
class Users extends Component{ // cuando extiende a compornent es Stateful 


componentDidMount(){
// const respuesta = await Axios.get('https://jsonplaceholder.typicode.com/users');
// //console.log(respuesta.data);
//   this.setState({
//     users: respuesta.data,
//   })
  if(!this.props.users.length){
    this.props.traerTodos();
  }
}

ponerContenido = () => {
  if(this.props.cargando){
    return <Spinner />;
  }
  if(this.props.error){
    return <Fatal mensaje={this.props.error}/>
  }
  return( <Tabla /> )
}

  render(){   
    console.log(this.props)
    //console.log('render: ',this.state.users)
    return (
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    );
  }
  
};

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
};

export default connect(mapStateToProps,usuariosActions)(Users);
