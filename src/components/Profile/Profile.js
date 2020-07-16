import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// Components
import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Icons
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.styles,
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  handleClose = () => {
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
      UI: { errors },
    } = this.props;

    let profileMarkup =
      !loading || errors ? (
        authenticated ? (
          <Fragment>
            <Paper className={classes.paper}>
              <div className={classes.profile}>
                <div className="image-wrapper">
                  <img src={imageUrl} alt="profile" className="profile-image" />
                  <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                  />
                  <MyButton
                    tip="Edit profile picture"
                    onClick={this.handleEditPicture}
                    btnClassName="button"
                  >
                    <EditIcon color="primary" />
                  </MyButton>
                </div>
                <hr />
                <div className="profile-details">
                  <MuiLink
                    component={Link}
                    to={`/users/${handle}`}
                    color="primary"
                    variant="h5"
                  >
                    @{handle}
                  </MuiLink>
                  <hr />
                  {bio && <Typography variant="body2">{bio}</Typography>}
                  <hr />
                  {location && (
                    <Fragment>
                      <LocationOn color="primary" /> <span>{location}</span>
                      <hr />
                    </Fragment>
                  )}
                  {website && (
                    <Fragment>
                      <LinkIcon color="primary" />
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {website}
                      </a>
                      <hr />
                    </Fragment>
                  )}
                  <CalendarToday color="primary" />{" "}
                  <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
                <MyButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="primary" />
                </MyButton>
                <EditDetails />
              </div>
            </Paper>
            {errors && errors.imageUrl && (
              <Dialog maxWidth="sm" open={true} onClose={this.handleClose}>
                <DialogTitle>
                  <Typography color="error">{errors.imageUrl}</Typography>
                </DialogTitle>
                <DialogActions>
                  <Button color="primary" onClick={this.handleClose}>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </Fragment>
        ) : (
          <Paper className={classes.paper}>
            {errors && errors.auth ? (
              <Typography variant="body2" align="center">
                Session has expired. Please login again.
              </Typography>
            ) : (
              <Typography variant="body2" align="center">
                No profile found. <br />
                Please login or create an account.
              </Typography>
            )}
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Paper>
        )
      ) : (
        <ProfileSkeleton />
      );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage, clearErrors };

Profile.propTypes = {
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
