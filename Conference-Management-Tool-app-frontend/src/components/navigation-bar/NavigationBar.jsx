import React, { useContext, useEffect } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Bell, PencilSquare } from 'react-bootstrap-icons';
import { Route, Link, Switch } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { DashboardContext } from '../../context/dashboard.context';
import Register from '../Register/Register';
import './NavigationBar.css';

const NavigationBar = () => {
    /* state. */
    // const [currentUser, setCurrentUser] = useState({ id: 'U001', name: 'John Doe', type: 'ADMIN'});
    const { loginUser } = useContext(DashboardContext);

    useEffect(() => {
        console.log('use effect hook is working!');
        // console.log(loginUser);
    });

    const performLogOut = () => {
        /* log out current user. */
        // logOutUser();
        console.log('user is logging out.');
        localStorage.clear();
        window.location = '/login';
        /* redirect to main page. */

    };


    return (
        <div>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to="/" className="nav-link">
                        <Navbar.Brand className='header_font' style={{ color: 'white' }}>Code 4 Conference</Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>

                        {     // if user logged in
                            (localStorage.getItem('UserType') == 'ATTENDEE' || localStorage.getItem('UserType') == 'PRESENTER' || localStorage.getItem('UserType') == 'RESEARCHER') ?
                                <Nav>

                                    <Link style={{ margin: 'auto' }} to="/" className="nav-link">
                                        <h6 className="user_name">Home</h6>
                                    </Link>

                                    <Link style={{ margin: 'auto' }} to="/workshops" className="nav-link">
                                        <h6 className="user_name">Workshops</h6>
                                    </Link>

                                    <Link style={{ margin: 'auto' }} to="/research-papers" className="nav-link">
                                        <h6 className="user_name">Research Papers</h6>
                                    </Link>


                                    <Link style={{ margin: 'auto' }} to="/downloads" className="nav-link">
                                        <h6 className="user_name">Downloads</h6>
                                    </Link>

                                    <Link style={{ margin: 'auto' }} to="/members" className="nav-link">
                                        <h6 className="user_name">Committee</h6>
                                    </Link>

                                    <Link style={{ margin: 'auto' }} to="/contact-us" className="nav-link">
                                        <h6 className="user_name">Contact Us</h6>
                                    </Link>


                                    <h6 className="user_name">Hi {localStorage.getItem('User')}</h6>


                                    <Button className="nav-link" variant="danger" style={{ marginRight: '3%' }}
                                        onClick={() => performLogOut()}>Logout</Button>
                                </Nav>

                                //if user is not logged in
                                : (localStorage.getItem('UserType') == 'Editor') ?

                                    <Nav>
                                        <h6 className="user_name">Hi {localStorage.getItem('User')}</h6>

                                        <Link style={{ margin: 'auto' }} to="/" className="nav-link">
                                            <h6 className="user_name">Home</h6>
                                        </Link>

                                        <Button className="nav-link" variant="danger" style={{ marginRight: '3%' }}
                                            onClick={() => performLogOut()}>Logout</Button>

                                    </Nav>


                                    : (localStorage.getItem('UserType') == 'Reviewer') ?
                                        <Nav>
                                            <h6 className="user_name">Hi {localStorage.getItem('User')}</h6>


                                            <Link style={{ margin: 'auto' }} to="/review" className="nav-link">
                                                Reviewer
                                            </Link>

                                            <Button className="nav-link" variant="danger" style={{ marginRight: '3%' }}
                                                onClick={() => performLogOut()}>Logout</Button>

                                        </Nav>


                                        : (localStorage.getItem('UserType') == 'Admin') ?
                                            <Nav>

                                                <Link style={{ margin: 'auto' }} to="/dashBoard" className="nav-link"> Dashboard    </Link>
                                                <Link style={{ margin: 'auto' }} to="/add-members" className="nav-link"> Add Committee members </Link>
                                                <Link style={{ margin: 'auto' }} to="/internal/members" className="nav-link"> View Committee members </Link>

                                                <Button className="nav-link" variant="danger"
                                                    onClick={() => performLogOut()}>Logout</Button>

                                            </Nav>
                                            :
                                            <Nav>
                                                <Link style={{ margin: 'auto' }} to="/downloads" className="nav-link">
                                                    <h6 className="user_name">Downloads</h6>
                                                </Link>
                                                <Link to="/login" className="nav-link navigation_property">Login</Link>
                                                <Link style={{ margin: 'auto' }} to="/register-home" className="nav-link">
                                                    Register
                                                </Link>
                                            </Nav>
                        }

                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>

                </Switch>
            </div>
        </div>
    );
};

export default NavigationBar;

