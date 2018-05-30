'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  sectionedList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import {List, ListItem, Card, Button} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import Container from './Container';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


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

export default class Docs extends Component<{}> {
  constructor(props, context)
    {
        super(props, context);
        this.state = {
          active: 'iVerified'
        };
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
              Step 2
            </Text>
            <Text style={styles.welcomeI}>
              Secondary Identification Documents
            </Text>
            <View style={styles.viewButton}>
              <View style={styles.progressV}>
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={1} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progress} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />
                <Progress.Bar style={styles.progressL} progress={0.} width={30} borderColor={'#333333'} height={5} borderRadius={0} color={'#333333'} />                
              </View>
              <ScrollView style={styles.cardS}>
              <List containerStyle={{width: '99%'}}>
                {
                  items.map((item, i) => (
                    <ListItem
                      key={item.id}
                      title={item.name}
                      subtitle={item.points}
                      onPress={() =>
                        navigate('DocCamera', { name: 'DocCamera' })
                      }
                    />
                  ))
                }
              </List>
              </ScrollView>
            </View>
          </View>
      
        </Container>
      </ThemeProvider>
      
      
    );
  }

}

 const items =  [{
        name: "Residential Mortgage",
        id: '101',
      },{
        name: "Auto Loan (older than 3 months)",
        id: '102',
      },{
        name: "Personal Loan (older than 3 months)",
        id: '103',
      },{
        name: "Rental Lease (older than 3 months)",
        id: '104',
      },{
        name: "Phone Bill (older than 3 months)",
        id: '105',
      },{
        name: "Property Gas Bill (older than 3 months)",
        id: '106',
      },{
        name: "Electricity Bill (older than 3 months)",
        id: '107',
      },{
        name: "Other Utility Bill (older than 3 months)",
        id: '108',
      },{
        name: "Property Tax Statement/Receipt",
        id: '109',
      },{
        name: "Home Owners Association",
        id: '110',
      },{
        name: "Credit Card Statement (older than 3 months)",
        id: '111',
      },{
        name: "Bank Account Statement (older than 3 months)",
        id: '112',
      },{
        name: "Auto Insurance (older than 3 months)",
        id: '113',
      },{
        name: "Home Owner's or Renter's Insurance Policy (current and within 12 months)",
        id: '114',
      },{
        name: "Medical Insurance",
        id: '115',
      },{
        name: "Tax Returns - Indivd_idual/Business",
        id: '116',
      },{
        name: "W-2 or 1099-MISC Forms",
        id: '117',
      },{
        name: "Employment Verification/Employment Authorization Card",
        id: '118',
      },{
        name: "Membership to Professional Organisation (older than 3 months)",
        id: '119',
      },{
        name: "Marriage License/Divorce Decree",
        id: '120',
      },{
        name: "Divorce/Separation Certificate",
        id: '121',
      },{
        name: "Life Insurance (older than 3 months)",
        id: '122',
      },{
        name: "Daycare Documentation (older than 3 months)",
        id: '123',
      },{
        name: "Parent-Teacher documentation/Daycare documentation (older than 3 months)",
        id: '124',
      },{
        name: "N426 - Military/Naval Service",
        id: '125',
      },{
        name: "648 - Disability Verification",
        id: '126',
      },{
        name: "Internet Bill (older than 3 months)",
        id: '127',
      },{
        name: "Civil Union Certificate",
        id: '128',
      },{
        name: "Pre-printed Pay Stub (showing your employer's name and address)",
        id: '129',
      },{
        name: "Certified School Transcript (within 6 months)",
        id: '130',
      },{
        name: "Pilot License",
        id: '131',
      },{
        name: "Merchant Mariner Card",
        id: '132',
      },{
        name: "Social Services Card / Tribal Card",
        id: '133',
      },{
        name: "Property or Excise Tax Bill",
        id: '134',
      },{
        name: "Work Identification/Paycheck Stub",
        id: '135',
      }]



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

