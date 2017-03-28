import React, { Component } from 'react';
import Container from '../components/Container';
import { Header } from '../components/Text';
import { Card } from 'react-native-elements';
import { Input, PrimaryButton, SecondaryButton } from '../components/Form';
import Router from '../config/router';
import config from '../config/config';
import { Accounts } from 'react-native-meteor';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  static route = {
    navigationBar: {
      visible: true,
      title: 'Sign Up',
    },
  }

  handleChangeEmail = (email) => {
    const { username } = this.state;
    const update = { email };
    const inferredUsername = email.split('@')[0];
    if (username === inferredUsername.slice(0, inferredUsername.length - 1)) {
      update.username = inferredUsername;
    }
    this.setState(update);
  };

  goToSignIn = () => {
    this.props.navigator.push(Router.getRoute('signIn'));
  };

  signUp = () => {
    const { email, username, password, confirmPassword } = this.state;

    if (email.length === 0) {
      return this.props.navigator.showLocalAlert('Email is required.', config.errorStyles);
    }

    if (username.length === 0) {
      return this.props.navigator.showLocalAlert('Username is required.', config.errorStyles);
    }

    if (password.length === 0 || password !== confirmPassword) {
      return this.props.navigator.showLocalAlert('Passwords must match.', config.errorStyles);
    }

    this.setState({ loading: true });
    return Accounts.createUser({ username, email, password }, (err) => {
      if (err) {
        this.props.navigator.showLocalAlert(err.reason, config.errorStyles);
      } else {
        this.props.navigator.immediatelyResetStack([Router.getRoute('profile')]);
      }
    });
  };


  render() {
    return (
      <Container scroll>
        <Card>
          <Input
            label="Email"
            placeholder="Please enter your email..."
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            label="Username"
            placeholder="Please enter your username..."
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <Input
            label="Password"
            placeholder="Please enter your password..."
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <Input
            label="Confirm Password"
            placeholder="Please enter confirm your password..."
            secureTextEntry
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
          />
          <PrimaryButton
            title="Sign Up"
            onPress={this.signUp}
            loading={this.state.loading}
          />
        </Card>

        <SecondaryButton
          title="Sign In"
          onPress={this.goToSignIn}
        />
      </Container>
    );
  }
}

export default SignUp;
