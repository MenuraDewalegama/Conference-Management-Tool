import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import Countdown from './countdown';

const performRegister = () => {
    window.location = '/register';
};
const slideProperties = {
    duration: 2500,
    scale: 0.8,
    arrows: false
}

const slideImages = [
    'https://www.techedt.com/wp-content/uploads/2019/03/Your-guide-to-top-7-tech-conferences-in-2019.png',
    'https://motorimpairment.org/wp-content/uploads/2019/02/cropped-conference-attenders-1.jpg',
    'https://www.afd.fr/sites/afd/files/styles/visuel_principal/public/2018-12-06-00-52/conf-inegalites-goulard-home.jpg?itok=qzDq4oef'

];

export class RegisterHome extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '0%' }}>
                <div className="slide-container" style={{ width: 'auto', height: 'auto', marginRight: '20%', marginLeft: '20%' }}>
                    <Slide  {...slideProperties}>
                        <div className="each-slide">
                            <div style={{ 'backgroundImage': `url(${slideImages[0]})`, width: '100%', height: '10cm', objectFit: "inherit", textAlign: "center" }}>
                                <span>Slide 1</span>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{ 'backgroundImage': `url(${slideImages[1]})`, width: '100%', height: '10cm', objectFit: "inherit", textAlign: "center" }}>
                                <span>Slide 2</span>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{ 'backgroundImage': `url(${slideImages[2]})`, width: '100%', height: '10cm', objectFit: "inherit" }}>
                                <span>Slide 3</span>
                            </div>
                        </div>
                    </Slide>
                </div>
                <br></br>
                <h1>
                    Hurry Up! Reserve your Seat Now!
                </h1>
                <hr></hr>
                <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                    <Countdown />
                </div>
                <hr></hr>
                <br></br>
                {/* <img style={{ marginTop: '1%', marginBottom: '2%', objectFit: "inherit", textAlign: "center", width: "15cm", height: '5cm', borderRadius: "10px" }} src="https://www.marsdd.com/wp-content/uploads/2020/01/blog-tech-conferences.jpg"></img> */}


                <div className="slide-container">

                </div>
                <Button style={{ fontSize: '25px' }} onClick={() => performRegister()}>
                    Register
                </Button>

                <div className="container" style={{marginTop:'2%'}}>

                    <Table striped borderless variant="dark" >
                        <thead style={{ backgroundColor: 'purple' }}>
                            <tr>
                                <th>User Type</th>
                                <th>Registration Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Attendee</td>
                                <td>Rs 1000/=</td>

                            </tr>
                            <tr>
                                <td>Presenter</td>
                                <td>Rs 3000/=</td>
                            </tr>

                        </tbody>
                    </Table>
                </div>

                <br/>


            </div>
        )
    }
}

export default RegisterHome
