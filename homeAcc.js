'use strict';

import {
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';

import HomePage from './HomePage';
//import LoginPage from './LoginPage';
//import RegisterPage from './RegisterPage';
import DrawerMenu from './Drawer/drawer-toolbar-android';

 import myAccountPage from './myAccountPage';
 import IDCamera from './IDCamera';
 import IDFinal from './IDFinal';
 import Camera from './Camera';
 import SelfieStep from './SelfieStep';
 import Final from './Final';
 import Docs from './Docs';
 import DocCamera from './DocCamera';
 import Account from './Account';
 import AgencyHome from './AgencyHome';
 import AddMember from './AddMember';
 import ListMembers from './ListMembers';


const stackNavigator = StackNavigator({
  HomePage: { screen: HomePage },
  //Login: { screen: LoginPage },
  //Register: {screen:  RegisterPage},
  myAccountPage: { screen: myAccountPage },
  Camera: { screen: Camera },
  IDCamera: {screen: IDCamera},
  IDFinal: {screen: IDFinal},
  SelfieStep: {screen: SelfieStep},
  Final: {screen: Final},
  Docs: {screen: Docs},
  DocCamera: { screen: DocCamera },
  Account: {screen: Account},
  AgencyHome: {screen: AgencyHome},
  AddMember: {screen: AddMember},
  ListMembers: {screen: ListMembers}
}, {
  headerMode: 'none'
});

const homeAcc = DrawerNavigator({
  Home: {
    screen: Account,
  },
  Stack: {
    screen: stackNavigator
  }
}, {
  contentComponent: DrawerMenu,
  contentOptions: {
    activeTintColor: '#e91e63',
    style: {
      flex: 1,
      paddingTop: 15,
    }
  }
});

export default homeAcc; 

