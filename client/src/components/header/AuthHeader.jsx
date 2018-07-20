import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AuthHeader extends Component {
  state = {
    menuOpened: false
  };

  trackMenuOpen = event => {
    let path = event.composedPath();
    if (!path.includes(this.menu)) {
      this.setState({ menuOpened: false });
    }
  };

  componentDidMount() {
    window.addEventListener("click", this.trackMenuOpen);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.trackMenuOpen);
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return {
        menuOpened: !prevState.menuOpened
      };
    });
  };

  render() {
    const { user, logout } = this.props;
    const { menuOpened } = this.state;
    return (
      <Fragment>
        <Link
          className="header__link header__link--createListing"
          to="/createListing"
        >
          Create Listing
        </Link>
        <div
          className="header__user"
          onClick={this.toggleMenu}
          ref={menu => {
            this.menu = menu;
          }}
        >
          <img src={user.avatar} alt={user.name} />
          <i className="fas fa-sort-down" />
          {menuOpened && (
            <div className="header__user__menu">
              <div className="header__user__menu__label">
                Signed in as <strong>{user.name}</strong>
              </div>
              <div onClick={logout} className="header__user__menu__item">
                Logout
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

AuthHeader.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default AuthHeader;
