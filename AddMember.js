'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Platform,
  Animated, 
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
  StatusBar
} from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
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

export default class AddMember extends Component<{}> {

  constructor(props, context) {
 
    super(props, context)
 
    this.state = {
 
      UserNo: '',
      active: 'AddMember'
 
    }
 
  };

  static navigationOptions = {
    title: 'Menu',
  };

saveData = async () =>
    {
       const {UserNo} = this.state; 
       //AsyncStorage.clear();
        await AsyncStorage.getItem('members', (err, result) => {
          let membersObj =  [{
                  memberNo: UserNo,
                  id: UserNo
            }];
          if (result !== null) {
            console.log('Data Found', result);
            var newMember = JSON.parse(result).concat(membersObj);
            AsyncStorage.setItem('members', JSON.stringify(newMember));
            this.props.navigation.navigate('AgencyHome');
          } else {
            console.log('Data Not Found');
            AsyncStorage.setItem('members', JSON.stringify(membersObj));
            this.props.navigation.navigate('AgencyHome');
          }
        });
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar
            centerElement={this.state.active}
          />
          <View style={styles.container}>
            <Text style={styles.welcomeI}>
              i<Text style={styles.welcome}>Verify</Text>
            </Text>
            <View style={styles.formContainer}>
               <Card>
               <FormLabel>Member NO.</FormLabel>
               <FormInput placeholder='Please enter member no.' onChangeText={UserNo => this.setState({UserNo})} />
                <Button
                  icon={{name: 'person-add'}}
                  backgroundColor='#03a9f4'
                  fontFamily='Lato'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  onPress={this.saveData}
                  title='Add' />
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20
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
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  formContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  searchInput: {
    padding: 4,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#84090b',
    borderRadius: 8,
    color: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
     flexDirection: 'row',
     paddingTop: 20,
  },
});