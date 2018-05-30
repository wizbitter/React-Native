'use strict';

import {
  StackNavigator,
  //DrawerNavigator,
} from 'react-navigation';

import HomePage from './HomePage';
import RegisterPage from './RegisterPage';

 import myAccountPage from './myAccountPage';
 import homeAcc from './homeAcc';
 import LoginPage from './LoginPage';
 import SelfieStep from './SelfieStep';
 import Docs from './Docs';
 import AgencyHome from './AgencyHome';


const App = StackNavigator({
  Home: { screen: HomePage },
  Login: { screen: LoginPage },
  Register: {screen:  RegisterPage},
  homeAcc: {screen: homeAcc},
  myAccountPage: { screen: myAccountPage },
  SelfieStep: {screen: SelfieStep},
  Docs: {screen: Docs},
  AgencyHome: {screen: AgencyHome},
}, {
  headerMode: 'none'
});



export default App; 

