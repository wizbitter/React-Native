'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import {List, ListItem, Card, } from 'react-native-elements';
import * as Progress from 'react-native-progress';
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

export default class IDFinal extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
 
        this.state = { active: 'iVerified', step: ''};
        //this.displayMessage();
    };


  static navigationOptions = {
    title: 'Menu',
  };



  sideMenu () {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

 
navigate() {
    this.props.navigation.navigate('Docs'); // open drawer
  };


  render() {
    const { navigate } = this.props.navigation;

    return (
    	<ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.sideMenu()}
            style={{
                      leftElement: { color: COLOR.grey500 },
                  }}
          />
          <View style={styles.viewButton}>
          <View style={styles.container}>
          <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'start',
            justifyContent: 'center'
          }}
            
            onPress={this.navigate()}
          >
          <Image source={require('./assets/images/checkmark.png')} style={{top: 20, left: 0, bottom: 20, width: 200, height: 200}} />
          </TouchableOpacity>
          </View>
          </View>


          <View style={styles.container}>
            <View style={styles.container}>
			 <Text style={styles.welcomeI}>
              Next: Secondary Document
            </Text>
		      </View>
          </View>


        </Container>
      </ThemeProvider>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeI: {
    fontSize: 24,
    textAlign: 'center',
    color: '#A6A8AB',
    margin: 10,
    top: 20
  },
  viewButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioV:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});