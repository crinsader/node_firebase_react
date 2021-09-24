import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import List from "../routes/List.js";
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn}) => {

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route exact path="/Profile">
                        <Profile></Profile>
                    </Route>
                    <Route exact path="/list">
                        <List></List>
                    </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth></Auth>
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;