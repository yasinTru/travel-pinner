import "./Login.css"
import  {useState , useRef} from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios"
import CancelIcon from '@mui/icons-material/Cancel';

const Login =({cancelLogin, myStorage, setCurrentUser}) => {

  const [error, setError] = useState(false)
  const nameRef= useRef();
  const passwordRef= useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user= 
    {
      username: nameRef.current.value,
      password: passwordRef.current.value
    };

try
{
  const res =await axios.post("http://localhost:4000/api/users/login", user)
  myStorage.setItem("user", res.data.username)
  setCurrentUser(res.data.username)
  cancelLogin(false)
  setError(false)
  
}
catch(err)

{
  setError(true)
  //setSuccess(false)
}
  }

  return(
   <div className="login">
        <div className="logo">
        <LocationOnIcon></LocationOnIcon>
        Travel Pinner
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" ref={nameRef} />
            <input type="password" placeholder="Password" ref={passwordRef}/>
            
            <button className="loginButton">Login</button>
            
            {error &&
            <span className="failure">Something went wrong.</span>
            }
       
        </form>
        <CancelIcon className="cancelIcon" onClick={()=>cancelLogin(false)}></CancelIcon>
  </div>
  )
}

export default Login;
