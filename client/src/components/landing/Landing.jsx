import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import TextField from "components/common/TextField";

class Landing extends Component {
  state = {
    searchTerm: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/books/${this.state.searchTerm}`);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="landing container">
        <div className="landing__logo">
          <img src="assets/exchange-navy.png" alt="logo" />
        </div>
        <p className="landing__title">Texbex</p>
        <p className="landing__subtitle">Trading textbooks made simple.</p>
        <form className="landing__search" onSubmit={this.onSubmit}>
          <TextField
            placeholder="Search by title, author, course name, etc."
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onChange}
            error={errors.searchTerm}
          />
          <input
            className="landing__search__button"
            type="submit"
            value="Search"
          />
        </form>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(Landing);
