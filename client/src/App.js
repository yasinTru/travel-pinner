import * as React from 'react';
import { useState, useEffect } from 'react';
import "./App.css"
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Star from '@mui/icons-material/StarRate';
import {format} from 'timeago.js'
import axios from "axios";
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins,setPins]= useState([])
  const [newPlace, setNewPlace] = useState(null)
  const [currentPlace, setCurrentPlace]= useState(null)
  const [title, setTitle]= useState(null)
  const [comment, setCommnent]= useState(null)
  const [rating, setRating]= useState(0)
  const [showRegister, setShowRegister]= useState(false)
  const [showLogin, setShowLogin]= useState(false)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 39,
    longitude:37,
    zoom: 5
  }); 


  useEffect(()=>
  {
    const getPins = async ()=>
    {
        try
        {
          const res= await axios.get("http://localhost:4000/api/pins");
          
          setPins(res.data)
         
        }
        catch (err)
        {
            console.log(err);
        }
    };
    getPins();
  },[])

const handleIconClick= (id, latitude, longitude)=>
{
  setCurrentPlace(id)
  setViewport({
    ...viewport,
    latitude: latitude,
    longitude: longitude,
})
}

 const handleAdd = (e) =>
 {
    const [longitude, latitude]= e.lngLat;
    setNewPlace({
      latitude,
      longitude,
    });
 }
 
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      comment,
      rating,
      latitude: newPlace.latitude,
      longitude: newPlace.longitude,
    };

    try
    {
      const res= await axios.post("http://localhost:4000/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);

    }
    catch (err) 
    {
      console.log(err);
    }

  }

  const handleLogout = () => 
  {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }


  return (
    <div className="App">
  
  <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoic2lubmhhcnRoYSIsImEiOiJja3lxcTI0aTMwZm1pMnd0Z2FydWVpajY2In0.qlkruxgWYbJo7yW65d-RzA" //called api open bc no need de hide i think.
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/sinnhartha/ckyrtld3jt2gp14ruwz55xnbr"
      onDblClick={handleAdd}
      transitionDuration="150"
      
      >
         
       {pins.map((pin, index)=>(

        <>
  
      <Marker 
      
      latitude={pin.latitude}
       longitude={pin.longitude}
      
       offsetLeft={-viewport.zoom*7/3.5}
       offsetTop={-viewport.zoom*7}>
         
        <LocationOnIcon style={{fontSize:viewport.zoom*7, color: pin.username===currentUser ? "darkblue" : "red", cursor:"pointer"}}
        onClick={()=> handleIconClick(pin._id, pin.latitude, pin.longitude)}

        />

         </Marker>
        
        {pin._id=== currentPlace &&

          <Popup
          
          latitude={pin.latitude}
          longitude={pin.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setCurrentPlace(null)}
          anchor="right" >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{pin.title}</h4>
            <label>Review</label>
            <p className="desc">{pin.comment}</p>
            <label>Rating</label>
            <div className="stars">
            {Array(pin.rating).fill(<Star className='star'/>)}
           
            

            </div>
            <label>Details</label>
            <span className="username">Owner: <b>{pin.username}</b></span>
            <span className="date">Date: <b>{format(pin.createdAt)}</b></span>
          </div>
        </Popup> }
        </>
        ))}  

{newPlace && (
<Popup
          latitude={newPlace.latitude}
          longitude={newPlace.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setNewPlace(null)}
          anchor="right" >
            
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input type="text" className="title" placeholder="Enter Title" 
              onChange={(e)=>setTitle(e.target.value)}/>
              <label>Review</label>
              <textarea placeholder="Enter Review"
              onChange={(e)=>setCommnent(e.target.value)}/>
              <label>Rating</label>
              <select onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

              </select>
              <button className='submitButton' type='submit'>Add Pin</button>
            </form>
          </div>
            </Popup>
            
)}

  {currentUser ? (<button className="button logout" onClick={handleLogout}>Log out</button>) : (<div className='logs'>
  <button className="button Login" onClick={()=>setShowLogin(true)}  >Login</button>
  <button className="button Register" onClick={()=>setShowRegister(true)}>Register</button>
  </div>)}
  
  {showRegister && <Register cancelRegister ={setShowRegister}></Register>}
  {showLogin && <Login cancelLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}  ></Login>}
    </ReactMapGL>
    </div>
  );
}

export default App;
