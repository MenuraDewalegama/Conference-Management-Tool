import React from 'react';
import { Link } from "react-router-dom";
import { ExternalUserContext } from '../../../../../context/externalUser.context';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
// import Prompt from '../prompt/Prompt';

export default class CreateEditExternalUserView extends React.Component {
    static contextType = ExternalUserContext;

    constructor(props) {
        super(props);

        this.state = {
            isAdding: true, // true = dealing with an insertion operation.
            name: '',
            contactNo: '',
            email: '',
            type: 'Writer',
            password: '',
            externalUserId: 0,
            isExternalUserIdValid: false,
            externalUserRecord: null, // if matching record found, then we can store it here
            imagePath: '',
            imageFile: null
        }
    }

    /* life cycle. */
    componentDidMount() {

        /* get the internalUser id from the URL and assign it to state(internalUserId). */
        // const internalUserIDFromURL = this.props.match.params?.internalUserID;
        const internalUserIDFromURL = this.props.match.params?.externalUserID;
        if (externalUserIDFromURL) {
            /* set isAdding to false because we deal with updating a record. */
            this.setState({
                isAdding: false, // false = we deal with a update operation
            });

            // TODO: validate internalUserId
            if (/^[A-Za-z0-9]{24}$/.test(externalUserIDFromURL)) {
                this.setState({
                    isExternalUserIdValid: true,
                    externalUserId: externalUserIDFromURL
                });

                // TODO: getinternalUserId.
                /* find the a matching record by given ID,
                * if no matching record found set the state(internalUserIdRecord) to null,
                * if matching record is found. */
                // TODO: set state(imagePath), if found matching record.
                this.context.getExternalUserByID(externalUserIDFromURL).then(externalUserElem => {
                    this.setState({
                        externalUserRecord: externalUserElem,
                        externalUserId: externalUserElem?._id,
                        name: internalUserElem?.name,
                        contactNo: internalUserElem?.contactNo,
                        email: internalUserElem?.email,
                        type: internalUserElem?.type,
                        password: internalUserElem?.password,
                        imagePath: (internalUserElem?.imagePath) ? internalUserElem?.imagePath : '',
                        imageFile: null
                    });
                }).catch(reason => {
                    console.error(reason);
                });

            }
        }
    }

    /** set user input to state 
             *   @param event */
    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    /** Set image file to the component state when user upload a image file.
    * @param event */
    onChangeExternalUserFormFile(event) {
        const imageFile = event.target.files[0];
        this.setState({ imageFile: (imageFile) ? imageFile : null });
    }

    /* Remove Image button process - we just remove the imagePath. */
    removeImagePath() {
        this.setState({
            imagePath: ''
        });
    }

    /** perform save or update operation.
    * @param saveOrUpdate addInternalUser method or updateInternalUser method. */
    performSaveOrUpdate(saveOrUpdate) {
        const externalUserObject = {
            name: this.state.name,
            contactNo: this.state.contactNo,
            email: this.state.email,
            type: this.state.type,
            password: '123qwe'
        };
        // this.context?.addInternalUser(internalUser);

        /* if image is uploaded, then assign it to internalUserObject. */
        if (this.state.imageFile) {
            externalUserObject.externalUserImage = this.state.imageFile;
        } else {
            /* existing imagePath is assigned to the internalUserObject.
            * That means no image update happens. */
            externalUserObject.imagePath = this.state.imagePath;
        }

        if (this.state.isAdding) {
            /* add a new internal User. */
            if (externalUserbject.hasOwnProperty('imagePath') && externalUserObject.imagePath.length === 0) {
                delete internalUserObject.imagePath;
            }
            saveOrUpdate(externalUserObject).then(value => {
                // TODO: display insert successful or not
                // display insertion successful
                console.log('External User added successfully!');
                window.location = '/dashboard/externalUsers';
            }).catch(reason => {
                console.error(reason);
            });
        } else {
            /* update operation. */
            externalUserObject.id = this.state.externalUserId;
            saveOrUpdate(externalUserObject).then(value => {
                // TODO: display update successful or not
                // display updated successfully
                console.log('External User updated successfully!');
                window.location = '/dashboard/externalUsers';
            }).catch(reason => {
                console.error(reason);
            });
        }
        this.setState({
            name: '',
            contactNo: '',
            email: '',
            type: '',
            password: '123qwe',
            externalUserId: 0,
            isExternalUserIdValid: false,
            externalUserRecord: null,
            imagePath: '',
            imageFile: null
        });
    };

    render() {
        const { saveOrUpdate } = this.props;
        /* if we deal with updating a internalUser and the internalUser id is not valid.
      Then, display invalid.*/
        if (!this.state.isExternalUserIdValid && !this.state.isAdding) {
            const message = 'Internal User ID is invalid';
            // return (
            //     <><Prompt message={message} /></>
            // );
        }

        /* if no matching record found. */
        // TODO: if no matching record is found then, display 'no matching record is found'
        if (!this.state.externalUserRecord && !this.state.isAdding) {
            const message = 'No matching Internal User record found.';
            // return (
            //     <><Prompt message={message} /></>
            // );
        }

        return <div>
            <div className="container">
                <h1 className="center bg-dark text-light">welcome to create User Page</h1>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-info card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">manage_accounts</i>
                                </div>
                                <p className="card-category">Users</p>
                            </div>
                            <div className="card-body">
                                <div className="container">
                                    <form>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <Form.Control type="text" className="form-control" value={this.state.name} name="name" onChange={event => { this.onChange(event) }} id="exampleFormControlInput1" placeholder="ex:- Jone Deo" />
                                        </div>
                                        <div className="form-group">
                                            <label>ContactNo:</label>
                                            <input type="number" className="form-control" value={this.state.contactNo} name="contactNo" onChange={event => { this.onChange(event) }} id="exampleFormControlInput1" placeholder="ex:- 0371234567" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control" value={this.state.email} name="email" onChange={event => { this.onChange(event) }} id="exampleFormControlInput1" placeholder="name@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label>select Type</label>
                                            <select className="form-control" name="type" value={this.state.type} onChange={event => { this.onChange(event) }} id="exampleFormControlSelect1">
                                                <option>Writer</option>
                                                <option>Reviewer</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            {(this.state.isAdding) ? '' :
                                                <><Image
                                                    style={{ width: '300px' }}
                                                    src={(this.state?.imagePath) ?
                                                        `http://localhost:3000${this.state.imagePath}` :
                                                        `https://via.placeholder.com/300`}
                                                    alt={`${this.state.name} externalUser image`}
                                                    rounded />

                                                    <div>
                                                        <Button variant="secondary"
                                                            style={{
                                                                marginTop: '1.2rem'
                                                            }}
                                                            onClick={this.removeImagePath.bind(this)}>Remove Image</Button>
                                                    </div>
                                                </>
                                            }
                                            <Form.File id="id_externalUserImage"
                                                label="Upload External User Image"
                                                onChange={event => this.onChangeExternalUserFormFile(event)} />
                                        </div>
                                        <button type="button" className="btn btn-info"
                                            onClick={event => {
                                                event.preventDefault();
                                                this.performSaveOrUpdate(saveOrUpdate);
                                            }}>{
                                                (this.state.isAdding) ? 'Save' : 'Edit'
                                            } {/* <Link to="/dashboard/internalusers">Submit</Link> */}
                                        </button>
                                        <button type="button" className="btn btn-warning">
                                            <Link to="/dashboard/externalUser">Cancel</Link></button>
                                    </form>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-danger">highlight_off</i><p className="text-danger">Invalied...!</p>
                                    <i className="material-icons text-success">check_circle_outline</i><p className="text-success">Valied...!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}