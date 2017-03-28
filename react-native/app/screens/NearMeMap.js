import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Container from '../components/Container';
import Router from '../config/router';

class NearMe extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Near Me Map',
    },
  }

  static propTypes = {
    route: PropTypes.object,
    navigator: PropTypes.object,
  }

  goToLocationDetails = (location) => {
    this.props.navigator.push(Router.getRoute('locationDetails', { location }));
  };

  subTitle = (location) => {
    let subtitle = '';
    if (location.street_address) {
      subtitle = location.street_address;
    }

    if (location.access_days_time && subtitle.length) {
      subtitle = `${subtitle} - ${location.access_days_time}`;
    } else if (location.access_days_time) {
      subtitle = location.access_days_time;
    }

    return subtitle;
  };

  replaceScreen = () => {
    const { locations, position } = this.props.route.params;
    this.props.navigator.replace(Router.getRoute('nearMe', { locations, position }));
  };
  
  render() {
    const { locations } = this.props.route.params;

    return (
      <Container>
        <FloatingButton
          icon="list"
          onPress={this.replaceScreen}
        />
      </Container>
    );
  }
}

export default NearMe;
