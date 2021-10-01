import { useEffect, useState } from "react"
import FirebaseComponent from "./fire_base"
import AppRouter from "./Router"
import "../App.css"
import Wrapper from "./Wrapper"
import { authService } from "fbase"

function App() {
  // 상수 선언, ES6문번의 구조 분해 할당

  const [init, setInit] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  // 현재 접속자 확인
  useEffect(() => {
    //console.log(authService.currentUser)
    //setIsLoggedIn(authService.currentUser)
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(user)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
    }) //이벤트 핸들러 - 인증 정보 변겨오디면 실행 됨
  }, [])

  const name = "park"
  const style = {
    backgroundColor: "black",
    color: "red",
    fontSize: "200%",
    padding: 5
  }
  return (
    <Wrapper>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing ..."}
      <FirebaseComponent name="park" color="red" isSpecial={true} />
      <FirebaseComponent color="pink" />
      <div style={style}>
        {name}
      </div>
      <div className="gray-box" />
      <br />
      <footer>
        &copy; {new Date().toDateString()} Nwitter
      </footer>
    </Wrapper>
  )
}

export default App
