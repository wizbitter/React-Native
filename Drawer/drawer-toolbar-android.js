import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View,
    AsyncStorage
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import Container from '../Container';


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
    },
    avatar: {
          container: {
              backgroundColor: '#333'
          }
      }
  };

export default class DrawerMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        active: 'people',
        userEmail: '',
      };
      this._bootstrapAsync();
  }

  _setInfoActive() {
    this.setState({ active: 'Home' });
  };

   _bootstrapAsync = async () => {
      const { userEmail }  = this.state ;

     let userObj = await AsyncStorage.getItem('user');
     let user = JSON.parse(userObj);
     this.setState({userEmail: user.email});
  };


  render() {
    return (
        <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                    <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.navigate('DrawerClose')}
                    centerElement="Menu"
                />
                    <View style={styles.container}>
                        <Drawer>
                            <Drawer.Header >
                                <Drawer.Header.Account
                                style={{ 
                                    container: { backgroundColor: '#fafafa' },
                                }}
                                avatar={<Avatar text={this.state.Email} />}
                                footer={{
                                    dense: true,
                                    centerElement: {
                                        primaryText: this.state.userEmail,
                                    },
                                  }}
                            />
                            </Drawer.Header>
                            <Drawer.Section
                            style={{
                                label: {color: '#0000ff'}
                            }}
                            divider
                            items={[
                                {
                                    icon: 'people', value: 'Support',
                                    active: this.state.active == 'client',
                                    onPress: () => {
                                        alert('Support area comming soon!')
                                      },
                                  },
                            ]}
                        />
                            <Drawer.Section
                            title="Account"
                            items={[
                                {
                                    icon: 'settings', value: 'Logout',
                                    active: this.state.active == 'Home',
                                    onPress: () => {
                                        this.setState({ active: 'Home' });

                                        this.props.navigation.navigate('DrawerClose');
                                        this.props.navigation.navigate('HomePage');
                                      },
                                  },
                            ]}
                        />
                        </Drawer>
                    </View>
                </Container>
            </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
    header: {
        backgroundColor: '#455A64',
      },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
  });
