import React from "react";
import "./App.css";
import axios from "axios";
import token from "./secrets";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      aid: [],
      comments: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleToggle(event) {
    console.log("event.target.name: ", event.target.name);
    if (this.state.aid.includes(event.target.name)) {
      const nextStateAid = this.state.aid.filter(
        (aid) => aid !== event.target.name
      );
      this.setState({ aid: nextStateAid });
    } else {
      this.setState({ aid: [...this.state.aid, event.target.name] });
    }
  }

  async handleSubmit(event) {
    console.log("process.env.AIRTABLE_TOKEN: ", process.env.AIRTABLE_TOKEN);
    event.persist();
    console.log("submitting");
    console.log("event: ", event);
    var data = JSON.stringify({
      fields: {
        Name: this.state.name,
        Email: this.state.email,
        Address: this.state.address,
        Phone: this.state.phone,
        Comments: this.state.comments,
        Aid_Offered: this.state.aid,
      },
    });

    var config = {
      method: "post",
      url: "https://api.airtable.com/v0/apppQVoatt5Y8xAkW/Volunteers",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <h3>Sample Form for Airtable</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="formElement">
            <span>Name: </span>
            <input
              type="text"
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
            ></input>
          </div>
          <div className="formElement">
            <span>Email: </span>
            <input
              type="email"
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
            ></input>
          </div>
          <div className="formElement">
            <span>Address: </span>
            <input
              type="text"
              onChange={this.handleChange}
              name="address"
              value={this.state.address}
            ></input>
          </div>
          <div className="formElement">
            <span>Phone: </span>
            <input
              type="text"
              onChange={this.handleChange}
              name="phone"
              value={this.state.phone}
            ></input>
          </div>
          <div className="formElement">
            <span>Types of Aid You Can Provide: </span>
            <div className="multipleCheckboxes">
              <div className="singleCheckbox">
                <input
                  type="checkbox"
                  id="grocery-trips"
                  name="grocery trips"
                  onChange={this.handleToggle}
                ></input>
                <label htmlFor="grocery=trips">Grocery Trips</label>
              </div>
              <div className="singleCheckbox">
                <input
                  type="checkbox"
                  id="cash"
                  name="petty cash"
                  onChange={this.handleToggle}
                ></input>
                <label htmlFor="cash">Petty Cash</label>
              </div>
              <div className="singleCheckbox">
                <input
                  type="checkbox"
                  id="medicinePick-up"
                  name="medicine pick-up"
                  onChange={this.handleToggle}
                ></input>
                <label htmlFor="medicinePick-up">Medicine Pick-Up</label>
              </div>
              <div className="singleCheckbox">
                <input
                  type="checkbox"
                  id="dog-walking"
                  name="dog walking"
                  onChange={this.handleToggle}
                ></input>
                <label htmlFor="dog-walking">Dog Walking</label>
              </div>
            </div>
          </div>
          <div className="formElement">
            <span>Comments: </span>
            <input
              type="textArea"
              onChange={this.handleChange}
              name="comments"
              value={this.state.comments}
            ></input>
          </div>
          <div className="formElement">
            {" "}
            <button type="button" onClick={this.handleSubmit}>
              Submit Form
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
