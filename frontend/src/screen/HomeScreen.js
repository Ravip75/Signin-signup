// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { detailsUser } from '../actions/userAction';
function HomeScreen(props){
    const [searchKeyword,setSearchKeyWord]=useState('');
    const [data1,setData1]=useState([]);
    const [output,setOutput]=useState([]);
    //const category=props.match.params.id?props.match.params.id:'';
    
   // const detailsUser=useSelector(state=>state.detailsUser);
    //const {loading,error}=detailsUser;
    const dispatch=useDispatch();
    //useEffect(()=>{
      //  dispatch(listUser(category));
       // return ()=>{
//
        //};
    //},[category])
    const sent=()=>{
        alert("Message Sent");
    }
    const list1=()=>{
        //console.log(funds);
        //console.log(input);
        //const per=funds.map(d=>{d.filter(child=>child.input.includes(input))})
       const per= data1.filter(d=>{
         if(searchKeyword==='')
         {
           return d
         }
         else if(d.first.includes(searchKeyword))
         {
           return d
         }
       }).map(d=><ul><div className="product-name">
       <Link to={'/user/' + d._id}>{d._id}</Link>
   </div>
   <div className="product-name">First: {d.first}</div>
   <div className="product-name">Last: {d.last}</div>
   <div className="product-name">Bio: {d.bio}</div>
   <div className="product-name">Email: {d.email}</div>
   <button onClick={sent}>Sent Request</button></ul>) 
       setOutput(per);
       
       
       console.log(JSON.stringify(per));
      }
    useEffect(()=>{
        fetch("/api/users").then(r=>r.json()).then(r=>setData1(r));
    })

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(detailsUser(searchKeyword));
    }
    //const sortHandler=(e)=>{
      //  setSortOrder(e.target.value);
       // dispatch(listProducts(category,searchKeyword));
    //}
    return <>
    

      <ul className="filter">
          <li>
              <form onSubmit={submitHandler}>
                  <input name="searchKeyword" onChange={(e)=>setSearchKeyWord(e.target.value)} />
                  
                  <button type="submit" onClick={list1}>Search</button>
              {output.map(d=><div>{d}</div>)}
              </form>
          </li>
          
      </ul>
      
        <ul className="products">
            {
            data1.map(product=>
                <li key={product._id}>
                    <div className="product">
                        
                        <div className="product-name">
                            <Link to={'/user/' + product._id}>{product._id}</Link>
                        </div>
                        <div className="product-name">First: {product.first}</div>
                        <div className="product-name">Last: {product.last}</div>
                        <div className="product-name">Bio: {product.bio}</div>
                        <div className="product-name">Email: {product.email}</div>
                        
                    </div>
                </li>)}</ul>
    </>
    //<div>HomeScreen</div>
}
export default HomeScreen;