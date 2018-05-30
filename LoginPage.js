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
import PasswordInputText from 'react-native-hide-show-password-input';
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

export default class LoginPage extends Component<{}> {

  constructor(props, context) {
 
    super(props, context)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: '',
      active: 'Login'
 
    }
 
  };

  static navigationOptions = {
    title: 'Menu',
  };

UserLoginFunction = async () =>{
 
   //const { UserEmail }  = this.state ;
   const { UserPassword }  = this.state ;
   
   try{
      let loginState = '1';
      let userObj = await AsyncStorage.getItem('user');
      let user = JSON.parse(userObj);
      console.log(user);
      if(UserPassword===user.password){
        user.loginState = loginState;
        AsyncStorage.setItem('user', JSON.stringify(user));
        Keyboard.dismiss();
        this.props.navigation.navigate('homeAcc');
      }
      else{
        alert('The credentials provided are not correct!');
      }
   }
   catch(error){
      alert(error);
   }  
 
} 

getPass = async () =>{
 
   //const { UserEmail }  = this.state ;
   
   try{
      let userObj = await AsyncStorage.getItem('user');
      let user = JSON.parse(userObj);
      alert('Your password is: '+user.password);
   }
   catch(error){
      alert(error);
   }  
 
} 

componentDidMount = async () =>{
 
   
   try{
      let userObj = await AsyncStorage.getItem('user');
      let user = JSON.parse(userObj);
      
      return this.setState({UserEmail: user.email});
   }
   catch(error){
      alert(error);
   }  
 
} 

UserLoginApproved = async () =>{
 
   //const { UserEmail }  = this.state ;
   const { UserPassword }  = this.state ;
   
   try{
      let loginState = '1';
      let pendingV  = '1';
      let onBoard = '1';
      let userObj = await AsyncStorage.getItem('user');
      let user = JSON.parse(userObj);
      console.log(user);
      if(UserPassword===user.password){
        user.loginState = loginState;
        user.pendingV = pendingV;
        user.onBoard = onBoard;
        AsyncStorage.setItem('user', JSON.stringify(user));
        Keyboard.dismiss();
        this.props.navigation.navigate('homeAcc');
      }
      else{
        alert('The credentials provided are not correct!');
      }
   }
   catch(error){
      alert(error);
   }  
 
} 

  render() {
    const { navigate } = this.props.navigation;
    const {UserEmail} = this.componentDidMount();
    let forgot;
    if(this.state.UserEmail!=''){
        forgot = <Button icon={{name: 'lock-open'}} backgroundColor='#adf442' fontFamily='Lato' buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}} onPress={() => this.getPass() } title='Forgot Password' />;
    }
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar centerElement={this.state.active} />
          <KeyboardAvoidingView style={styles.viewButton}>
          <View style={styles.container}>
          <Image source={require('./assets/images/logo-w200px.png')} style={{top: 20, left: 0, bottom: 20, width: 200, height: 111}} />
            <Text style={styles.welcomeI}>
              iVerified
            </Text>
          </View>
          
          <Card containerStyle={{width: '100%'}}>
          <View style={{margin: 20}}>
           <PasswordInputText 
                    value={this.state.UserPassword}
                    onChangeText={UserPassword => this.setState({UserPassword})}
            />
           </View>
          
            <Button
              backgroundColor='#8B8E9E'
              fontFamily='Roboto'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
               onPress={this.UserLoginFunction}
              title='Login' />
              {forgot}
          </Card>  
          <Card containerStyle={{width: '100%'}}>              
                <Button
                  icon={{name: 'lock-open'}}
                  backgroundColor='#03a9f4'
                  fontFamily='Lato'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  onPress={this.UserLoginApproved}
                  title='LOGIN as approved' />
              </Card>
          </KeyboardAvoidingView>

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