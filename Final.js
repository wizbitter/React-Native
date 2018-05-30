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

export default class Final extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
 
        this.state = { active: 'Confirmation'};
    };


  static navigationOptions = {
    title: 'Menu',
  };



  sideMenu () {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }
  

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
          <View style={styles.container}>
          
            <Text style={styles.welcomeI}>
              You are all done
            </Text>
            <View style={styles.viewButton}>
              <View style={styles.progressV}>
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progressL} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />                
              </View>
            </View>
            <View style={styles.cardS}><Text style={styles.message}>We will review your documents and get back to you shortly.</Text></View>
          </View>

        </Container>
      </ThemeProvider>

      
    );
  }
}

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
  message: {
  	fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
    progress: {
    marginLeft: 10
  },
  progressL: {
    marginLeft: 10,
    marginRight: 10
  },

  progressV: {
    flexDirection: 'row',
    marginRight: 10
  }, 

  cardS: {
    width: '100%',
    marginLeft: 10,
    marginRight: 10
  }
});