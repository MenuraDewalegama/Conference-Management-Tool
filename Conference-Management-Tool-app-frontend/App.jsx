import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './src/components/main/Main';
import NavigationBar from './src/components/navigation-bar/NavigationBar';
import { ToastContainer } from "react-toastify";

export default class App extends React.Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <Router>
                    <Switch>
                        <Route path="/">
                            <div>
                                {/* navigation bar component. */}
                                <NavigationBar />
                                <ToastContainer/>

                                {/* main component. */}
                                <Main />
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
