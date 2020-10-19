import Axios from "axios";
import {
    ACTUALIZAR ,
    CARGANDO ,
    ERROR,
    COM_ERROR,
    COM_CARGANDO,
    COM_ACTUALIZAR
} from '../types/publicacionesTypes';

import * as usuariosTypes from '../types/usuariosTypes';

const {TRAER_TODOS:USUARIOS_TRAER_TODOS} = usuariosTypes;

export const traerPorUsuario = (key) => async(dispatch,getState) =>{
    dispatch({
        type:CARGANDO,
    })

    const {users} = getState().usuariosReducer;
    const {publicaciones} = getState().publicacionesReducer;
    const usuario_id = users[key].id;

    try{
        const respuesta = await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

        const nuevas = respuesta.data.map((publicacion)=>({
            ...publicacion,
            comentarios: [],
            abierto: false
        }
        ));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];
            
        dispatch({
            type:ACTUALIZAR,
            payload:publicaciones_actualizadas
        });

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...users];

        usuarios_actualizados[key] = {
            ...users[key],
            publicaciones_key
            //or publicaciones_key nada mas cuando tienen el mismo nombre
        }
    
        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });

    }
    catch (error)
    {
        console.log('ERROR'+error)
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles. '+ error
        })
    }
    

}



export const abrirCerrar = (pub_key,comment_key) =>(dispatch,getState) =>{
    const {publicaciones} = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][comment_key];

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][comment_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    });

    //console.log(pub_key,comment_key);
}


export const traerComentarios = (pub_key,com_key) => async (dispatch,getState) => {
    dispatch({
        type:COM_CARGANDO,        
    })

    const {publicaciones} = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    try{
        const respuesta = await Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

        const actualizada = {
            ...seleccionada,
            comentarios : respuesta.data
        };

        const publicaciones_actualizadas = [...publicaciones];
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];
        publicaciones_actualizadas[pub_key][com_key] = actualizada;

        dispatch({
            type:COM_ACTUALIZAR,
            payload:publicaciones_actualizadas
        });

    }catch (error){
        console.log(error);
        dispatch({
            type:COM_ERROR,
            payload:'Comentarios no disponibles'
        })
    }

}