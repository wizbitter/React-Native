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
import { Card, Button } from 'react-native-elements';
import {
  NavigationActions,
} from 'react-navigation';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import * as Progress from 'react-native-progress';
import Container from './Container';


const resetAction = NavigationActions.reset({
			        index: 0,  // it means change state to C which can goBack to previousView A
			        actions: [
			          //NavigationActions.navigate({ routeName: 'myAccountPage'}),
			          NavigationActions.navigate({ routeName: 'Docs'}),
			        ]
			   	});

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

export default class SelfieStep extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
 
        this.state = { full_name: '', email: '', active: 'iVerified'};
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
          
            <Text style={styles.welcome}>
              Step 3
            </Text>
            <Text style={styles.welcomeI}>
              Take a selfie
            </Text>
            <View style={styles.viewButton}>
              <View style={styles.progressV}>
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progressL} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />                
              </View>
             <Card containerStyle={{width: '99%'}}>
              <Button
                raised
                icon={{name: 'image-inverted', type: 'entypo'}}
                onPress={() =>
                    navigate('Camera', { name: 'Camera' })
                  }
                backgroundColor ='#8B8E9E'
              title='Take Selfie' /> 
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
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 32,
    textAlign: 'left',
    marginLeft: 10,
    color: '#333333'
  },
  pointsT: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    color: '#333333'
  },
  welcomeI: {
    fontSize: 16,
    textAlign: 'left',
    color: '#333333',
    margin: 10,
  },
  viewButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '100%',
    
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
})