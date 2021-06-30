import React, { Component } from 'react'

export class DownloadsHolder extends Component {
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header card-header-primary card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">download</i>
                        </div></div>
                    <h2 style={{ textAlign: 'center' }}>Use these templates at Registration</h2>
                    <div className="row p-5">
                        <div className="col-md-6">
                            <h3 style={{ textAlign: 'center' }}>Research Paper Template</h3>
                            <object width="100%" height="600" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf"></object>
                        </div>
                        <div className="col-md-6">
                            <h3 style={{ textAlign: 'center' }}>Workshop Proposal Template</h3>
                            <object width="100%" height="600" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf"></object>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadsHolder
