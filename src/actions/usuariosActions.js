import Axios from "axios";
import { TRAER_TODOS, CARGANDO , ERROR } from "../types/usuariosTypes";

export const traerTodos = () => async dispatch => {
    
    dispatch({
        type:CARGANDO,
    })



  try {
    const respuesta = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data
    });
  } catch (error) {
      console.log('PUTITO ERROR: ',error.message);
      dispatch({
          type:ERROR,
          payload: `Informacion de usuario no disponible. ${error.message}`,
      })
  }

};
