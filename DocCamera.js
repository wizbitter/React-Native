'use strict';
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Vibration,
  AsyncStorage, 
  Alert, Image, CameraRoll
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};


const resetAction = NavigationActions.reset({
        index: 0,  // it means change state to C which can goBack to previousView A
        actions: [
          //NavigationActions.navigate({ routeName: 'myAccountPage'}),
          NavigationActions.navigate({ routeName: 'SelfieStep'}),
        ]
    });



export default class DocCamera extends Component<{}> {
  static navigationOptions = {
      title: 'iVerified',
    };
     //
    constructor(props) {
      super(props);
      this.state = {
          flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        captureTarget: 'cameraRoll',
        whiteBalance: 'auto',
        ratio: '16:9',
        ratios: [],
        photoId: 1,
        showGallery: false,
        photos: [],
        faces: [],
        pic_no: 0,

      };
      this.recording = this.startRecording.bind(this);
      //this.picture = this.takePicture.bind(this);
    }


  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  startRecording = async function() {
    console.log('in the recording function');
    if (this.camera) {
      const options = { maxDuration: 30 };
      const data = await this.camera.recordAsync(options)
      CameraRoll.saveToCameraRoll(data.uri);
      console.log(data.uri);
    }
  }


  takePicture = async function() {
    
    if (this.camera) {   
      
      this.setState({
        pic_no: this.state.pic_no + 1,
      }); 
    console.log(this.state.pic_no);
    const options = { quality: 0.5, base64: true };
      if(this.state.pic_no<1){
        const { navigate } = this.props.navigation;
        
        //this.camera.stopRecording();
        const data =  await this.camera.takePictureAsync(options).then((data) => {

          CameraRoll.saveToCameraRoll(data.uri);
                console.log(data.uri);
            Alert.alert(
              'Back photo',
              'Please turn your document on the back and take photo.',
              '',
              { cancelable: false }
            );    
            }).catch(err => console.log(err));
          
        
      }
      else{
        let step2 = '1';
        let userObj = await AsyncStorage.getItem('user');
        let user = JSON.parse(userObj);
        user.step2 = step2;
          AsyncStorage.setItem('user', JSON.stringify(user));
          const data =  await this.camera.takePictureAsync(options).then((data) => {

          CameraRoll.saveToCameraRoll(data.uri);
                console.log(data.uri);
        Alert.alert(
        'Encryption confirmation',
        'Your document has been encrypted for verification',
        [
          {text: 'OK', onPress: () => {
            this.props.navigation.dispatch(resetAction);
          }
        },
        ],
        { cancelable: false }
      )
            }).catch(err => console.log(err));

      }      
    }
  };

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </View>
    );
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderFace)}
      </View>
    );
  }

  renderLandmarks() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderLandmarksOfFace)}
      </View>
    );
  }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >
          <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent: 'center'
          }}
            
            onPress={this.takePicture.bind(this)}
          >
            <Image source={require('./assets/images/camera-button.png')} style={{width: 40, height: 40}} />
          </TouchableOpacity>
          
        </View>       
      </RNCamera>

    );
  }

  render() {
    
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});