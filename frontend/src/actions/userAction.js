import Axios from "axios";
import axios from "axios";
import Cookie from 'js-cookie';
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SAVE_FAIL, USER_SAVE_REQUEST, USER_SAVE_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";

const listUser=({userId, first, last, bio, email, password, searchKeyword=''})=> async (dispatch)=>{
  try{
      dispatch({type: USER_LIST_REQUEST,payload: {userId, first, last, bio, email, password}});
      const {data}=await Axios.get("/api/users?searchKeyword="  +
       searchKeyword );
      dispatch({type: USER_LIST_SUCCESS,payload: data});
  }
  catch(error){
      dispatch({type: USER_LIST_FAIL,payload: error.message});
  }
}

const update=({userId,first,last,bio,email,password})=>async (dispatch,getState)=>{
    const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, first, last, bio, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { first, last, bio, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}
const signin=(email,password)=>async (dispatch)=>{
    dispatch({type: USER_SIGNIN_REQUEST,payload: {email,password}});
    try{
        const {data}=await Axios.post("/api/users/signin",{email,password});
        dispatch({type: USER_SIGNIN_SUCCESS,payload: data});
        Cookie.set('userInfo',JSON.stringify(data));
    }
    catch(error){
        dispatch({type: USER_SIGNIN_FAIL,payload: error.message});
        
    }
}

const register=(first,last,bio,email,password)=>async (dispatch)=>{
    dispatch({type: USER_REGISTER_REQUEST,payload: {first,last,bio,email,password}});
    try{
        const {data}=await Axios.post("/api/users/register",{first,last,bio,email,password});
        dispatch({type: USER_REGISTER_SUCCESS,payload: data});
        Cookie.set('userInfo',JSON.stringify(data));
    }
    catch(error){
        dispatch({type: USER_REGISTER_FAIL,payload: error.message});
    }
}
const detailsUser=(first,last,bio,email,password)=>async(dispatch)=>{
  
  try
  {
      dispatch({type: USER_DETAILS_REQUEST,payload: first,last,bio,email,password});    
      const {data}=await fetch("/api/users").then(r=>r.json()).then(r=>r);
      dispatch({type: USER_DETAILS_SUCCESS,payload: data});
      //Cookie.set('userInfo',JSON.stringify(data));
  }
  catch(error)
  {
      dispatch({type: USER_DETAILS_FAIL,payload: error.message});
  }
}
const saveUser = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await Axios.post('/api/users', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/users/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: USER_SAVE_FAIL, payload: error.message });
  }
};

const logout=()=>(dispatch)=>{
    Cookie.remove("userInfo");
    dispatch({type: USER_LOGOUT})
}
export {signin,register,logout,update,listUser,detailsUser,saveUser};