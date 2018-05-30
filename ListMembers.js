'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
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
    title: 'John Doe',
    icon: 'id-card'
  },
  {
    key: '8',
    title: 'Jane Doe',
    icon: 'driver-license'
  },  
  {
    key: '15',
    title: 'Another member',
    icon: 'passport'
  },
];


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

export default class ListMembers extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
        this.state = { full_name: '', email: '', active: 'List Members', dataSource: ''};
    };


  static navigationOptions = {
    title: 'Menu',
  };

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('members');
      if (value !== null) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(JSON.parse(value))          
        });
        console.log(dataSource);
      }
    } catch (error) {
      // Error retrieving data
    }

  }

getData = async () =>
    {
       //AsyncStorage.clear();
       let members = '';
        await AsyncStorage.getItem('members', (err, result) => {
          if (result !== null) {
            //console.log(result);
            return members = JSON.parse(result);
          } else {
            Alert.alert(
              'No members',
              'Your don\'t have members in your agency',
              [
                {text: 'OK', onPress: () => {
                  this.props.navigation.navigate('AgencyHome');
                }
              },
              ],
              { cancelable: false }
            )
          }
        });
    }

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
            
            <View style={styles.viewButton}>
              <Card title='Members list' containerStyle={{padding: 10}, {width: '90%'}} >
              <List>
                {
                  docItems.map((item, i) => (
                    <ListItem
                      key={item.key}
                      title={item.title}
                      onPress={() =>
                        alert('Member profile comming soon!')
                      }
                    />
                  ))
                }
              </List>
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
  viewButton: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  }
});