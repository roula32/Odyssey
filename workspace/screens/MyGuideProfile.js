import React, { Component } from 'react';
import { Alert, Switch, TouchableOpacity, TouchableWithoutFeedback, Button, View, ScrollView, Platform, ListView, Linking, Image, Text, KeyboardAvoidingView, ImageBackground, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Card, Icon as Icon1} from 'react-native-elements'
import { Container } from '../components/Container';
import { GeneralTextInput } from '../components/TextInput';
import { ButtonText } from '../components/Button';
import { Errors } from '../components/Errors';
import styles from '../screens/styles';
import { UserProfileContainer } from '../components/Container';
import { connectAlert } from '../components/Alert';
import { TimeDate, OneDateTime } from '../components/TimeDate';
//import { Switch } from 'react-native-switch';

import HideableView from 'react-native-hideable-view';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import MapView, { Marker, Callout } from 'react-native-maps';

import Modal from "react-native-modal";

import { changeLoginEmailValue, changeLoginPasswordValue,
        pressLoginSubmit, checkInitialLogin,
         cleanLoginErrorLog } from '../actions/Login';

import { submitNewReservation } from '../actions/Reservation';
import { checkActiveReservationTourGuide } from '../actions/ActiveReservation';
import { sendLogOutRequest } from '../actions/LogOut';
import {isActiveUpdate} from '../actions/IsActive';

const headerImage = require('../assets/images/LoginCover.jpg');
const profilePic = require('../components/Container/profilePic.png');
const tour1 = require('../assets/images/tour1.jpeg');
const tour2 = require('../assets/images/tour2.jpeg');

const INITIAL_REGION_HELP = {
  latitude: 39.8283,
  longitude: -98.5795,
  latitudeDelta: 60,
  longitudeDelta: 25
}
  

class MyGuideProfile extends Component {
//export default class UserProfile extends Component {
     
    _toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    _hideModal = () => { this.setState({ isModalVisible: false }) };

    handleSignUpPress = () => {
        this.props.navigation.navigate('Register');
    };

    profileButton(){
    const { navigate } = this.props.navigation;
    return (
        <TouchableOpacity
        underlayColor="#FFF"
        onPress={()=> {this.setState({ isModalVisible: false }); navigate('UserProfile')}} >
            <Text style={styles.settingText}>My Profile</Text> 
        </TouchableOpacity>
        )
    }

    notificationsButton() {
      const { navigate } = this.props.navigation;
      return (
          <TouchableOpacity
          underlayColor="#FFF"
          onPress={this.handleNotifications} >
              <Text style={styles.settingText}>Notifications</Text> 
          </TouchableOpacity>
          )
    }

    logoutButton() {
      const { navigate } = this.props.navigation;
      return (
          <TouchableOpacity
          underlayColor="#FFF"
          onPress={this.handleLogout} >
              <Text style={styles.settingText}>Logout</Text> 
          </TouchableOpacity>
          )
    }




constructor(props) {
  super(props)
  this.state = {
      requestVisible: false,
      dateTimeSubmit: '',
      authentication_token: '',
      email: '',
      isModalVisible: false,
      isMapModalVisible: false,
      activeLatitude: '',
      activeLongitude: '',
      location: INITIAL_REGION_HELP

      //dateSubmit: '',
      //timeSubmit: '',
  };
};

ShowAlert = (value) =>{
  this.setState({
 
    SwitchOnValueHolder: value

  })
  
  if(value === true)
  {
 
    //Perform any task here which you want to execute on Switch ON event.
    //Alert.alert("You are now active!");
    //TODO: need to add a dispatch and change the is_active value to true
    //dispatch(nameOfFunc(this.state.authentication_token,this.state.email,value))
    //this.setState({ isMapModalVisible: false });

  }
  else{
 
    //Perform any task here which you want to execute on Switch OFF event.
    Alert.alert("You are no longer active.");
    //TODO: need to add a dispatch and change the is_active value to false
  }
  console.log('================action sent=================')
  console.log(this.state.location)
  this.props.dispatch(isActiveUpdate(this.state.authentication_token,this.state.email,value,this.state.location,this.props.profileID))
    console.log('================action sent=================')
    console.log(this.state.location)
}

_toggleMapModal = () => {
  this.setState({ isMapModalVisible: !this.state.isMapModalVisible });
};

_hideMapModal = () => { this.setState({ isMapModalVisible: false }) };

handleSwitch = (value) => {
  this.setState({
 
    SwitchOnValueHolder: value
  })

  if (value === true) {
    this._toggleMapModal();
  }
  else if (value === false) {
    this.ShowAlert(value);
  }
}

async componentDidMount() {
  let storedToken = await AsyncStorage.getItem('authentication_token')
  let storedEmail = await AsyncStorage.getItem('email')
  this.setState( {
      authentication_token: storedToken,
      email: storedEmail
  })
  if (this.props.tourInfo.latitude !== undefined && this.props.tourInfo.longitude !== undefined) {
    this.setState({
      location: {
        latitude: this.props.tourInfo.latitude,
        longitude: this.props.tourInfo.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      }
    })
  }
};

componentWillReceiveProps(nextProps) {
  if (nextProps.reservationError && nextProps.reservationError !== this.props.reservationError) {
      this.props.alertWithType('error','Error',nextProps.reservationError);
  } else if(nextProps.reservationResult && nextProps.reservationResult !== this.props.reservationResult) {
      console.log(nextProps.reservationResult);
      this.props.navigation.navigate('Requests')
  } else if (nextProps.logoutError && nextProps.logoutError !== this.props.logoutError) {
    this.props.alertWithType('error','Error',nextProps.logoutError);
  } else if(nextProps.logoutResult && nextProps.logoutResult !== this.props.logoutResult) {
    console.log(nextProps.logoutResult);
    this.props.navigation.navigate('Login')
  }
  else if (nextProps.activeError && nextProps.activeError !== this.props.activeError) {
    this.props.alertWithType('error','Error',nextProps.activeError);
  } else if(nextProps.activeResult && nextProps.activeResult !== this.props.activeResult) {
    console.log(nextProps.activeResult);
    
  }
}
  
handleRequestPress = () => {
  this.setState({
    requestVisible: !this.state.requestVisible
  });
};

handleNotifications = () => {
  this.setState({ isModalVisible: false});
  this.props.dispatch(checkActiveReservationTourGuide(this.props.profileID,
    this.state.authentication_token,this.state.email))
  //this.props.navigation.navigate('Requests')
}

handleLogout = () => {
  this.setState({ isModalVisible: false});
  this.props.dispatch( sendLogOutRequest(this.state.authentication_token,this.state.email) )
  //this.props.navigation.navigate('Requests')
}

    renderHeader = () => {

   /* const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = this.props*/
 
    return (

      <View >

        <ImageBackground
          style={[ 
            {
              width: 400,
              height: 280,
            },
            styles.headerBackgroundImage]}
          blurRadius={10}
          source={headerImage}
        >


      
         
        <View style={styles.settingsBox}>
        
        <TouchableOpacity style={{ height: '100%', width: '100%'}}
        onPress={this._toggleModal} underlayColor="#FFF">
            <Icon name="ios-menu" style={styles.settingsIcon} size={45} />
         </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.isModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={() => this.setState({ isModalVisible: false }) }
        supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.settingWindow}>
                    
            {this.profileButton()}
            <View style={styles.border}></View>
            {this.notificationsButton()}
            <View style={styles.border}></View>
            {this.logoutButton()}

        </View>
        </Modal>

        <Modal isVisible={this.state.isMapModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={() => this.setState({ isMapModalVisible: false }) }
        supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.mapWindow}>
            <Text> Where are you at?</Text>
            <Text>Move the marker to your location</Text>
            <MapView
              style={{
                height: '80%',
                width: '80%'
              }}
              initialRegion={this.state.location}
              /*initialRegion={{
                latitude: this.state.activeLatitude,
                longitude: this.state.activeLongitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
              }}*/
              onRegionChangeComplete={(loc) => this.setState({ location: loc})}
            >
              <MapView.Marker
              coordinate={this.state.location}
              //onDragEnd={(e) => this.setState({ location: e.NativeEvent.coordinate })}
              />
            </MapView>

            <TouchableOpacity
            onPress={() => {
              this.setState({ isMapModalVisible: false });
              this.props.dispatch(isActiveUpdate(this.state.authentication_token,this.state.email,true,this.state.location,this.props.profileID))
              this.props.alertWithType('success','Success','You are now active.');
              
              
              
              
              //Alert.alert("You are now active.");
              //this.ShowAlert(true);
            }}
            >
              <Text> Submit Location</Text>
            </TouchableOpacity>
                    

        </View>
        </Modal>


          <View style={styles.headerColumn}>
          
            <Image
              style={styles.userImage}
              source={profilePic}
            />
            <Text style={styles.userNameText}> {this.props.profileInfo.firstname} {this.props.profileInfo.lastname}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon1
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  //onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {this.props.tourInfo.city}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = () => {
    return (
       
            <View style={styles.innerTelContainer}>
            <View style={styles.iconRow}>
      
            <Icon1
              name="call"
              underlayColor="transparent"
              iconStyle={styles.telIcon}
              //onPress={() => onPressTel(number)}
            />
       
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}> {this.props.profileInfo.phone_number} </Text>
        </View>
        </View>

        </View>
        )
    }



  renderEmail = () => (

    <View>
      <View style={styles.innerEmailContainer}>
      <View style={styles.iconRow2}>
        
          <Icon1
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
            //onPress={() => onPressEmail()}
          />
     
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{this.props.profileInfo.email}</Text>
        </View>
        </View>
        </View>
        
  </View>
  )

  renderSwitch = () => (

    <View style={{ height: 100, width: '100%'}}>
    <View style={{flexDirection: 'row', top : 20, height: 35, width: '100%'}}>
    <Text style={{marginLeft: 20, fontSize: 17, top: 5}}> Are you ready to give tours? </Text> 

    
    <Switch
    //onValueChange={(value) => this.ShowAlert(value)}
    onValueChange={(value) => this.handleSwitch(value)}
    value={this.state.SwitchOnValueHolder}
    style={{height: 30, width: 52, right: 7, position: 'absolute' }}
    />

    </View>
    
    <View>
    <TouchableOpacity style={{ top: 20, height: 45, width: 35, right: 12, position: 'absolute'}}
         underlayColor="#FFF"
         >
            <Icon2 name="dots-three-horizontal" style={styles.settingsIcon} size={25} 
            onPress={()=> {this.props.navigation.navigate('ManageTours');}} />
         </TouchableOpacity>
    </View>
    <View style={{padding: 10}}/>
    </View>

  )

renderSeparator = () => (
  <View style={styles.container}>
    <View style={styles.separatorOffset} />
    <View style={styles.separator} />
  </View>
)

renderTours = (tourName,tourDuration,tourDescription,tourKey) => ( 

    <View style={{top:20}}>

    
        <View style={styles.eachTourContainer}>
          <View style = {styles.tourTextButton}>
            <View style={styles.tourList}>
                <View style={styles.postRow}>
                    <Text>{tourName} </Text>
                    <Text style={styles.date}>{tourDuration} hours</Text>
                </View>
                <View style={styles.wordRow}>
                    <Text style={styles.wordText}>{tourDescription}</Text>
                </View>
                
            </View>
            
          </View>
        </View>
        
        <View style={styles.toursContainer}>
            <Image style={styles.postImage} source={tour1} />
        </View>
    </View>

)

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.profileContainer}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {this.renderSeparator()}
            {this.renderEmail()}
            {this.renderSeparator()}
            {this.renderSwitch()}
            {this.props.tours.map((data) => {
              
              return (
                <View key={data.id} >
                {this.renderTours(data.title,data.duration,data.description)}
                </View>
              )
            })}
          </Card>
        </View>
      </ScrollView>
    )
  }
}
        



const mapStateToProps = (state) => {
    
    const profileInfo = state.MyProfile.myProfile;
    const profileID = state.MyProfile.result[0];

    const traveler = '';
    const tourInfo = '';

    const reservationResult = state.ActiveReservation.result;
    const reservationError = state.ActiveReservation.errors;

    const logoutResult = state.LogOut.result;
    const logoutError = state.LogOut.errors;

    const tours = state.ViewTours.result.tours;

    const active = state.IsActive.active;
    const activeError = state.IsActive.errors;
    const activeResult = state.IsActive.result;

    return {
        profileInfo,
        profileID,
        traveler,
        tourInfo,
        reservationResult,
        reservationError,
        logoutResult,
        logoutError,
        tours,
        active,
        activeError,
        activeResult,
    };
};


export default connect(mapStateToProps)(connectAlert(MyGuideProfile));

//export default connect(mapStateToProps)(connectAlert(SignIn));