import "./Register.css"
import  {useState , useRef} from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios"
import CancelIcon from '@mui/icons-material/Cancel';

const Register =({cancelRegister}) => {

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const nameRef= useRef();
  const emailRef= useRef();
  const passwordRef= useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser= 
    {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

try
{
  await axios.post("http://localhost:4000/api/users/register", newUser)
  setError(false)
  setSuccess(true)
}
catch(err)

{
  setError(true)
  //setSuccess(false)
}
  }

  return(
   <div className="register">
        <div className="logo">
        <LocationOnIcon></LocationOnIcon>
        Travel Pinner
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" ref={nameRef} />
            <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
            
            <button className="registerButton">Register</button>
            {success && 
            <span className="success">Successful. Can Login now.</span>
            }
            
            {error &&
            <span className="failure">Something went wrong.</span>
            }
       
        </form>
        <CancelIcon className="cancelIcon" onClick={()=>cancelRegister(false)}></CancelIcon>
  </div>
  )
}

export default Register;
