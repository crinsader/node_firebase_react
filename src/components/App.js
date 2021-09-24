import {useState} from "react";
import FirebaseComponent from "./fire_base";
import AppRouter from "./Router";
import '../App.css';
import Wrapper from "./Wrapper";

function App() {
  // 상수 선언, ES6문번의 구조 분해 할당
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const name = "park";
  const style = {
    backgroundColor: 'black',
    color:'red',
    fontSize: '200%',
    padding: 5
  };
  return (
    <Wrapper>
      <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
      <FirebaseComponent name="park" color="red" isSpecial={true}/>
      <FirebaseComponent color="pink"/>
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
      <br/>
      <footer>&copy; {new Date().toDateString()} twitter</footer>
    </Wrapper>
  );
}

export default App;