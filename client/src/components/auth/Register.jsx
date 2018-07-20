import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { registerUser } from "actions/authActions";

// components
import TextField from "../common/TextField";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <h1 className="register__title">Sign Up</h1>
        <p className="register__subtitle">Create your Texbex account</p>
        <form className="register__form" noValidate onSubmit={this.onSubmit}>
          <TextField
            placeholder="Username"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextField
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextField
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            info="Passwords must be between 6 and 30 characters long."
          />
          <TextField
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
          <input type="submit" value="Submit" className="register__submit" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
