/*
@author : Dhanusha Perera
@date : 26/06/2021
*/

import React, { Component } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

class AddKeySpeaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      description: "",
      imageOfKeySpeaker: "",
    };

    this.executeOnSubmit = this.executeOnSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setOnSubmitClick(this.executeOnSubmit);
  }

  /** Set other user inputs in the form to the component state.
   * @param event */
  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(`${name}:`, value);
  }

  onChangeKeySpeakerImageFormFile(event) {
    // console.log(event.target.files[0]);
    const imageFile = event.target.files[0];
    this.setState({ imageOfKeySpeaker: imageFile });
    console.log("onChangeKeySpeakerImage: ", imageFile);
  }

  executeOnSubmit() {
    console.log("Child executeOnSubmit() !");
    this.props.getKeySpeakerDetails({
      ...this.state,
    });
  }

  render() {
    return (
      <Container
        style={{
          marginTop: "1rem",
          padding: "2rem",
          border: "1px solid lightgrey",
          borderRadius: "10px",
        }}
      >
        <Form>
          <Row>
            <Col>
              <h5>Key Speaker {this.props.idx}</h5>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="nameFG">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  style={formControlStyles}
                  name={"name"}
                  value={this.state?.name}
                  onChange={(event) => this.onChange(event)}
                  type="text"
                  placeholder="Enter Name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="titleFG">
                <Form.Label>Title of the Key Speaker</Form.Label>
                <Form.Control
                  style={formControlStyles}
                  name={"title"}
                  value={this.state.title}
                  onChange={(event) => this.onChange(event)}
                  type="text"
                  placeholder="Enter Title"
                  as={"textarea"}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="descriptionFG">
                <Form.Label>Description for the Key Speaker</Form.Label>
                <Form.Control
                  style={formControlStyles}
                  name={"description"}
                  value={this.state.description}
                  onChange={(event) => this.onChange(event)}
                  type="text"
                  placeholder="Enter Description"
                  as={"textarea"}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Key Speaker Image Uploading. */}
          <Row>
            <Col>
              <Form.Group controlId="imageOfTheKeySpeakerFG">
                <Form.Label>Image of the Key Speaker</Form.Label>
                <Form.Group>
                  <Form.File
                    id="imageOfTheKeySpeakerFF"
                    label="Upload Image of the Key Speaker"
                    onChange={(event) =>
                      this.onChangeKeySpeakerImageFormFile(event)
                    }
                  />
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddKeySpeaker;

const formControlStyles = {
  maxWidth: "40%",
};
