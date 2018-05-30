'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  KeyboardAvoidingView,
  AsyncStorage, Image
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import {List, ListItem, Card, } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import Container from './Container';


const docItems = [
  {
    key: '1',
    title: 'State ID',
    icon: 'id-card',
    points: '50 points'
  },
  {
    key: '8',
    title: 'Driver License',
    icon: 'driver-license',
    points: '50 points',
  },  
  {
    key: '15',
    title: 'Passport',
    icon: 'passport',
    points: '50 points'
  },
];


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

export default class myAccountPage extends Component<{}> {
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
              Step 1
            </Text>
            <Text style={styles.welcomeI}>
              Choose a Government Issued ID
            </Text>
            <View style={styles.viewButton}>
              <View style={styles.progressV}>
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progressL} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />                
              </View>
              <View style={styles.cardS}>
              <List containerStyle={{width: '99%'}}>
                {
                  docItems.map((item, i) => (
                    <ListItem
                      key={item.key}
                      title={item.title}
                      subtitle={item.points}
                      onPress={() =>
                        navigate('IDCamera', { name: 'IDCamera' })
                      }
                    />
                  ))
                }
              </List>
              </View>
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
});