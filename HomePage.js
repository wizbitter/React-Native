import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View, Image
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon, Card } from 'react-native-material-ui';
import {IMEI} from 'react-native-imei';
import {Button } from 'react-native-elements';
import Container from './Container';




const uiTheme = {
  palette: {
    primaryColor: COLOR.grey100,
    accentColor: COLOR.grey900,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20,      
    },
    titleText: {
      color: '#212121',
    }
  }
}



export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      active: 'Home',
    };
  }

  static navigationOptions = {
    title: 'Menu',
  };

  navigate() {
    this.props.navigation.navigate('Register'); // open drawer
  };

  loginNavigate() {
    this.props.navigation.navigate('Login'); // open drawer
  }

  agencyNavigate() {
    this.props.navigation.navigate('AgencyHome'); // open drawer
  }

  componentDidMount(){
    const IMEI = require('react-native-imei');
    //console.log(IMEI.getImei());
  }
  
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar centerElement={this.state.active} />

          <View style={styles.container}>
            <Image source={require('./assets/images/logo-w200px.png')} style={{top: 20, left: 0, bottom: 20, width: 200, height: 111}} />
            <Text style={styles.welcomeI}>
              iVerified
            </Text>
            <View style={styles.buttonContainer}>
                <View style={styles.flowRight}>
                <Button
                raised
                icon={{name: 'lock-open'}}
                onPress={() =>
                    this.loginNavigate()
                  }
                  backgroundColor ='#8B8E9E'
                title='LOGIN' />      
              </View>
              <View style={styles.flowRight}>
               <Button
                raised
                icon={{name: 'add-user', type: 'entypo'}}
                onPress={() =>
                    this.navigate()
                  }
                  backgroundColor ='#8B8E9E'
                title='Register' />  
            </View>            
          </View>
          </View>


        </Container>
      </ThemeProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeI: {
    fontSize: 32,
    textAlign: 'center',
    color: '#A6A8AB',
    margin: 10,
    top: 20
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  flowRight: {
  justifyContent: 'space-around',
  alignItems: 'center',
  flex: 1,
    marginTop: 40
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});