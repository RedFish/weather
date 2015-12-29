var React = require('react-native');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  MapView,
  TouchableHighlight
} = React;
var Api = require('./src/api.js');


//Declare UI elements
var Weather = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude:0,
        longitude:0
      },
      city: '',
      temperature: '',
      description: ''
    }
  },
  render : function() {
    return <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={[styles.map,this.border('yellow')]}
        >
      </MapView>
      <View style={[styles.footer,this.border('blue')]}>
        <Text style={styles.text}>{this.state.city}</Text>
        <Text style={styles.text}>{this.state.temperature}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
      </View>
    </View>
  },
  border: function(color) {
    return {
      //borderColor : color,
      //borderWidth : 4
    }
  },
  onRegionChangeComplete: function(region){
    console.log(region);
    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
});

//Let's make it looking good
var styles = StyleSheet.create({
  container: {
    flex : 1, //Fill the entire screen
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map : {
    flex : 9
  },
  footer :  {
    flex : 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18
  }
});

//Present element on screen
AppRegistry.registerComponent('weather', () => Weather);
