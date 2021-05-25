import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './src/components/main/Main';
import NavigationBar from './src/components/navigation-bar/NavigationBar';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        {/* navigation bar component. */}
                        <NavigationBar />
                        {/* main component. */}
                        <Main />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
