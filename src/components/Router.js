import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Auth from "../routes/Auth"
import Home from "../routes/Home"
import Profile from "../routes/Profile"
import List from "../routes/List.js"
import Navigation from "./Navigation"

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn
          ? <div>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/Profile">
                <Profile />
              </Route>
              <Route exact path="/list">
                <List />
              </Route>
            </div>
          : <Route exact path="/">
              <Auth />
            </Route>}
        {/*<Redirect from="*" to="/"/>*/}
      </Switch>
    </Router>
  )
}

export default AppRouter
