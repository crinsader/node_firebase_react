import { useState } from "react";
import { authService } from "fbase";

const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange=(event)=>{
        //console.log(event.target.name)
        //console.log(event.target.value)
        //setEmail(event.target.value)
        const{
            target : {name, value}
        }=event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }

    }

    const onSubmit=(event)=>{
        event.preventDefault();//submit 일시정지 기능
        if(newAccount){
            //새로 만드는것
        }else{
            // 로긴
        }

    }

    const toggleAccount=(event)=>{

    }

    const onSocialClick=(event)=>{

    }

    return (
        <div>
          <form onSubmit={onSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
            />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
          </form>
          <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
          </span>
          <div>
            <button onClick={onSocialClick} name="google">
              Continue with Google
            </button>
            <button onClick={onSocialClick} name="github">
              Continue with Github
            </button>
          </div>
        </div>
      );
}

export default Auth;