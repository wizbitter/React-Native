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

export default class Account extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
 
        this.state = { active: 'Account', step: ''};
        //this.displayMessage();
    };


  static navigationOptions = {
    title: 'Menu',
  };



  sideMenu () {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  
  componentWillMount = () =>
    {
        this.displayMessage().then((data) => {
        this.setState({
          step: data
        })  
      });
        
    }

  displayMessage =  async () =>{
      let userObj = await AsyncStorage.getItem('user');
      let user = JSON.parse(userObj);
      let goTo = '';

        if (user.onBoard=='0') {
          if(user.step1=='0'){
            goTo = 'step1';
          }
          if(user.step2=='0'){
            goTo = 'step2';
          }
          if(user.step3=='0'){
            goTo = 'step3';
          }
            
        } else {
          if(user.pendingV=='0'){
            goTo = 'pending';
          }
          if(user.pendingV=='1'){
            goTo = 'approved';         
          }
            
        }

        return goTo;
  }



  render() {
    const { navigate } = this.props.navigation;
    //const {step} = this.displayMessage();
    console.log(this.state.step);
    let stepGo;
    if(this.state.step == 'step1'){
 		stepGo = <Button
      raised
      icon={{name: 'home', type: 'entypo'}}
      onPress={() =>
          navigate('myAccountPage')
        }
    backgroundColor ='#8B8E9E'
  	title='Complete application' /> 
 	}
 	if(this.state.step == 'step2'){
 		stepGo = <Button
      raised
      icon={{name: 'home', type: 'entypo'}}
      onPress={() =>
          navigate('Docs')
        }
    backgroundColor ='#8B8E9E'
  	title='Complete Application' />
 	}
 	if(this.state.step == 'step3'){
 		stepGo = <Button
      raised
      icon={{name: 'home', type: 'entypo'}}
      onPress={() =>
          navigate('SelfieStep')
        }
    backgroundColor ='#8B8E9E'
  	title='Complete Application' />
 	}
 	if(this.state.step == 'pending'){
 		stepGo = <Text> Application pending verification! </Text>;
 	}
 	if(this.state.step == 'approved'){
 		stepGo = <Text> Application is approved! </Text>;
 	}

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
          <Image source={require('./assets/images/logo-w200px.png')} style={{top: 20, left: 0, bottom: 20, width: 200, height: 111}} />
            <Text style={styles.welcomeI}>
              iVerified
            </Text>
          </View>
          </View>


          <View style={styles.container}>
            <View style={styles.container}>
			      <Card>
			     	{stepGo}			        
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