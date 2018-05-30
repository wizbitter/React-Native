import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
  Image
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';
import { PropTypes } from 'prop-types';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon, RadioButton  } from 'react-native-material-ui';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
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

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    theme: PropTypes.string,
};


export default class RegisterPage extends Component {
  constructor(props, context)
    {
        super(props, context);
 
        this.state = { email: '', password: '', active: 'Register', checked: false, gender: ''};
  };


  static navigationOptions = {
    title: 'Menu',
  };

  saveData = () =>
    {
        this.setState({ loading: true, disabled: true }, () =>
        {         
            const {email} = this.state;
            const {password} = this.state;
            let mType = '1';
            let onBoard = '0';
            let pendingV = '0';
            let step1 = '0';
            let step2 = '0';
            let step3 = '0';

            let userObj =  {            
              email: email,
              password: password,
              mType: mType,
              onBoard: onBoard,
              pendingV: pendingV,
              step1: step1,
              step2: step2,
              step3: step3
            }

            AsyncStorage.setItem('user', JSON.stringify(userObj));

            Keyboard.dismiss();
            
            this.props.navigation.navigate('myAccountPage');

        });
    }

  navigate() {
    this.props.navigation.navigate('Register'); // open drawer
  }

  getGender(data){
    this.setState({gender: data});
  }


  render() {
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
          
          <Card>
          <View style={{margin: 20}}>
           <PasswordInputText 
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({ password }) }
            />
           </View>
           <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',}}> 
              <RadioButton style={{fontSize: 10}} label="Female" value="Female" checked={this.state.checked} onCheck={checked => this.setState({ checked })} onSelect={this.getGender} />
              <RadioButton style={{fontSize: 10}} label="Male" value="Male" checked={this.state.checked} onCheck={checked => this.setState({ checked })} onSelect={this.getGender} />
              <RadioButton style={{fontSize: 10}} label="Non-Binary" value="Non-Binary" checked={this.state.checked} onCheck={checked => this.setState({ checked })} onSelect={this.getGender} />
           </View>
           <FormLabel>Recovery Email</FormLabel>
           <FormInput placeholder='Plase enter your recovery email (optional)' onChangeText={email => this.setState({email})} />
            <Button
              backgroundColor='#8B8E9E'
              fontFamily='Roboto'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
               onPress = { this.saveData }
              title='CREATE ACCOUNT' />
          </Card>  
          </KeyboardAvoidingView>
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