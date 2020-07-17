import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Components
import MyButton from "../../util/MyButton";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// Icons
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.styles,
});

export class Logout extends Component {
  state = {
    open: false,
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    return (
      <Fragment>
        <MyButton tip="Logout" onClick={this.handleOpen}>
          <KeyboardReturn color="primary" />
        </MyButton>
        <Dialog maxWidth="sm" open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleLogout}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(withStyles(styles)(Logout));
