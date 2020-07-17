import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
// MUI
import Grid from "@material-ui/core/Grid";
// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      this.setState({ profile: null });
      this.getUserData(nextProps);
    }
  }
  componentDidMount() {
    this.getUserData(this.props);
  }
  getUserData = (props) => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;
    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null || screams.length === 0 ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : this.state.profile.handle ===
            this.props.user.credentials.handle ? (
            <Profile />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getUserData })(user);
