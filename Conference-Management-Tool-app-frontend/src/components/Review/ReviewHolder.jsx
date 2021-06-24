import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

export class ReviewHolder extends Component {
    render() {
        return (
            <div className="container" style={{ marginTop: 'auto-align', textAlign: 'center' }}>

                <h2>Manage User Research Paper and Worksop Proposals</h2>

                <div style={{ margin: 'auto-align' }}>
                    <Button href="/review/research-papers">Research Papers</Button>
                    <Button href="/review/project-proposals">Project Proposals</Button>
                </div>
            </div>
        )
    }
}

export default ReviewHolder
