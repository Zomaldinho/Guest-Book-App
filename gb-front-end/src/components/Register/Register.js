import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  //handling name change
  nameChange = (txt) => {
    this.setState({ name: txt.target.value });
  };

  //handling email change
  emailChange = (txt) => {
    this.setState({ email: txt.target.value });
  };

  //handling password change
  passwordChange = (txt) => {
    this.setState({ password: txt.target.value });
  };

  //handling retyped password change
  password2Change = (txt) => {
    this.setState({ password2: txt.target.value });
  };

  submit = () => {
    if (this.state.password !== this.state.password2) {
      return window.alert('Re-Typed Password is Not Matching');
    }
    fetch(`http://localhost:3000/register`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.routeChange('home');
        } else if (data === 'Worng Inputs') {
          window.alert('Please Fill All The Fields With Proper Credintals ');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <fieldset>
          <legend>Register</legend>
          <label>Name:</label>
          <input type="text" onChange={(txt) => this.nameChange(txt)}></input>
          <br></br>
          <br></br>
          <label>Email:</label>
          <input
            type="email"
            onChange={(txt) => this.emailChange(txt)}
          ></input>
          <br></br>
          <br></br>
          <label>password:</label>
          <input
            type="password"
            onChange={(txt) => this.passwordChange(txt)}
          ></input>
          <br></br>
          <br></br>
          <label>Re-type Password:</label>
          <input
            type="password"
            onChange={(txt) => this.password2Change(txt)}
          ></input>
          <br></br>
          <br></br>
          <button> Register</button>
          <br></br>
          <button>Signin</button>
        </fieldset>
      </div>
    );
  }
}

export default Register;