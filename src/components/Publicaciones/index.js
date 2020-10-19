import React , {Component} from 'react';
import {connect} from 'react-redux';
import Cargando from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions  from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner';
import Comentarios from './Comentarios';


const {traerTodos:usuariosTraerTodos} = usuariosActions;
const {
    traerPorUsuario:publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
    } = publicacionesActions;

class Publicaciones extends Component {

    async componentDidMount(){
        const{
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: {params:{key} }
        } = this.props;

        if(!this.props.usuariosReducer.users.length){
            await usuariosTraerTodos();
        }
        if(this.props.usuariosReducer.error){
            return ;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.users[key])){
            publicacionesTraerPorUsuario(key);
        }
        
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: {params:{key} }
        } = this.props;

        if(usuariosReducer.error){
            return <Fatal mensaje={usuariosReducer.error}/>;
        }
        

        if (!usuariosReducer.users.length || usuariosReducer.cargando){
                    
            return <Spinner />
        }

        const nombre = usuariosReducer.users[key].name;

        return (
                <h1>
                    Publicaciones de {nombre}
                </h1>
        )
    };

    ponerPublicaciones = () => {
        //code
        const {
            usuariosReducer,
            usuariosReducer: {users},
            publicacionesReducer,
            publicacionesReducer: {publicaciones},
            match: {params: {key}}
        } = this.props;

        //this.props.publicacionesReducer
        if(!users.length) return;
        if(usuariosReducer.error) return;

        if(publicacionesReducer.cargando){
            return <Spinner />;
        }
        
        if(publicacionesReducer.error) {
            return <Fatal mensaje={publicacionesReducer.error}/>
        }
        
        if(!publicaciones.length) return;       
            
        if (!('publicaciones_key' in users[key])) return;
        //console.log('Putito');

        const {publicaciones_key}= users[key];
        

        return this.mostrarInfo(publicacionesReducer.publicaciones[publicaciones_key],publicaciones_key);
    };

    mostrarInfo = (publicaciones,pub_key) =>(
        //publicaciones[publicaciones_key].map((publicacion) => (
        publicaciones.map((publicacion_putito,comment_key) => (    
            <div 
                className='pub_titulo' 
                key={publicacion_putito.id}
                onClick={ ()=> this.mostrarComentarios(pub_key,comment_key, publicacion_putito.comentarios)  }
            >
                <h2>
                    {publicacion_putito.title}
                </h2>
                <h3>
                    {publicacion_putito.body}
                </h3>
                {
                    (publicacion_putito.abierto)?
                    <Comentarios comentarios={publicacion_putito.comentarios} /> : ''
                }
            </div>
        ))
    );

    mostrarComentarios = (pub_key, comment_key, comentarios) => {
        //console.log('comentariosputito: ',comentarios);
        this.props.abrirCerrar(pub_key, comment_key);
        this.props.traerComentarios(pub_key, comment_key);
        if(!comentarios.length) {
            this.props.traerComentarios(pub_key, comment_key);
        }
    };

    componentWillUnmount(){

    }
    render(){
        console.log(this.props)
        //console.log(this.props.publicacionesTraerPorUsuario)
        return(
            <div>                
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
            );            
        }
}

const mapStateToProps = ({usuariosReducer,publicacionesReducer}) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps,mapDispatchToProps)(Publicaciones);