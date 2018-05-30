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
    primaryColor: COLOR.lightBlue500,
    accentColor: COLOR.snackbarColor,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20
    }
  }
}

export default class AgencyHome extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
 
        this.state = { active: 'Account', step: ''};
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
          />

          <View style={styles.container}>
            <Text style={styles.welcomeI}>
              i<Text style={styles.welcome}>Verify</Text> 
            </Text>
              <View style={styles.container}>
			      <Card>		
            <Button
              raised
              icon={{name: 'add-user', type: 'entypo'}}
              onPress={() =>
                  navigate('AddMember')
                }
            backgroundColor ='#03a9f4'
            title='Add a member' />	                 
		        </Card>
            <Card>
              <Button
              raised
              icon={{name: 'list', type: 'entypo'}}
              onPress={() =>
                  navigate('ListMembers')
                }
              backgroundColor ='#03a9f4'
              title='List members' />       
            </Card>
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
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#455A64',
  },
  welcome: {
    fontSize: 60,
    textAlign: 'center',
    margin: 10,
    color: '#03a9f4'
  },
  welcomeI: {
    fontSize: 40,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
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
    backgroundColor: '#F5FCFF',
  }
});