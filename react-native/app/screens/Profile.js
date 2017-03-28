import React, { Component } from 'react';
import Container from '../components/Container';
import { Header } from '../components/Text';
import { PrimaryButton } from '../components/Form';
import Meteor from 'react-native-meteor';
import Router from '../config/router';

class Profile extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Profile',
    },
  }

  signOut = () => {
    Meteor.logout;
    this.props.navigator.immediatelyResetStack([Router.getRoute('signUp')]);
  };

  render() {
    return (
      <Container>
        <Header>
          Profile
        </Header>
        <PrimaryButton
          title="Sign Out"
          onPress={this.signOut}
        />
      </Container>
    );
  }
}

export default Profile;
