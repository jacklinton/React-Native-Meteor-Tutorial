import React, { Component } from 'react';
import Container from '../components/Container';
import { Header } from '../components/Text';
import Router from '../config/router';
import { List, ListItem, View } from 'react-native-elements';
import FloatingButton from '../components/FloatingButton';

class NearMe extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Near Me',
    },
  }
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

  goToLocationDetails = (location) => {
    this.props.navigator.push(Router.getRoute('locationDetails', { location }));
  };

  replaceScreen = () => {
    const { locations, position } = this.props.route.params;
    this.props.navigator.replace(Router.getRoute('nearMeMap', { locations, position }));
  };

  render() {
    const { locations } = this.props.route.params;

    return (
      <View>
        <Container scroll>
          <List>
            {
              locations.map((l) => (
                <ListItem
                  key={l._id}
                  title={l.station_name}
                  subtitle={this.subTitle(l)}
                  onPress={() => this.goToLocationDetails(l)}
                />
              ))
            }
          </List>
        </Container>
        <FloatingButton
          icon="map"
          onPress={this.replaceScreen}
        />
      </View>
    );
  }
}


export default NearMe;
