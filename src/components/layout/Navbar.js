import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Components
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
// MUI
import AppBar from "@material-ui/core/AppBar";
import Skeleton from "@material-ui/lab/Skeleton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import HomeIcon from "@material-ui/icons/Home";
// Redux
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    const { authenticated, loading } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {loading ? (
            <Fragment>
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="circle" width={48} height={48} />
            </Fragment>
          ) : authenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loading: state.user.loading,
});

export default connect(mapStateToProps)(Navbar);
