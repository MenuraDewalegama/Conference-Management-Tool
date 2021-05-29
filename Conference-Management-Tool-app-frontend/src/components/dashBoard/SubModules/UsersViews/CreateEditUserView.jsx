import React from 'react';

export default class CreateEditUserView extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
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
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Full Name</label>
                                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ex:- Jone Deo" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">ContactNo:</label>
                                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="ex:- 0371234567" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Email address</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlSelect1">select Type</label>
                                        <select class="form-control" id="exampleFormControlSelect1">
                                            <option>Writer</option>
                                            <option>Reseacher</option>
                                        </select>
                                    </div>
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