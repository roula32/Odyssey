import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
import { connect } from 'react-redux';

import { ButtonText } from '../components/Button';
import { Top } from '../components/Container';
import { CalloutContent } from '../components/MapComponents/';
import { connectAlert } from '../components/Alert';
import Icon from 'react-native-vector-icons/Ionicons';
//import {Icon as TouchableIcon} from 'react-native-icons'; 
import Modal from "react-native-modal";

import { changeTourLocationValue } from '../actions/TourList';
import { pressProfileView } from '../actions/ViewProfile';

import styles from '../components/Map/styles'

//TEMP DATA
const TEMP_INITIAL_REGION = {
    latitude: 41.3119,
    longitude: -72.92834,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
};

const TEMP_MARKER_NAME = "Michal Dimick";
const TEMP_MARKER_RATING = "5.0";
const TEMP_MARKER_DISTANCE = "0.7 miles";
const TEMP_MARKER_LOCATION1 = {
    latitude: 41.3129,
    longitude: -72.92834,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
};
const TEMP_MARKER_LOCATION2 = {
    latitude: 41.3109,
    longitude: -72.92834,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
};
const TEMP_MARKER_LOCATION3 = {
    latitude: 41.3089,
    longitude: -72.92834,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
};
const TEMP_MARKER_DATA1 = {
    name: TEMP_MARKER_NAME,
    rating: TEMP_MARKER_RATING,
    distance: TEMP_MARKER_DISTANCE,
    location: TEMP_MARKER_LOCATION1,
    ID: "marker1",
    image: require('../assets/images/profile2.png')
};
const TEMP_MARKER_DATA2 = {
    name: TEMP_MARKER_NAME,
    rating: TEMP_MARKER_RATING,
    distance: TEMP_MARKER_DISTANCE,
    location: TEMP_MARKER_LOCATION2,
    ID: "marker2",
    image: require('../assets/images/profile2.png')
};
const TEMP_MARKER_DATA3 = {
    name: TEMP_MARKER_NAME,
    rating: TEMP_MARKER_RATING,
    distance: TEMP_MARKER_DISTANCE,
    location: TEMP_MARKER_LOCATION3,
    ID: "marker3",
    image: require('../assets/images/profile2.png')
};
const TEMP_MARKER_DATA_ARRAY = [TEMP_MARKER_DATA1,TEMP_MARKER_DATA2,TEMP_MARKER_DATA3];


class HomeAlternate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authentication_token: '',
            email: '',
            pressable: false,
            ID: '',
            tourInfo: {
                city: '',
                name: '',
                duration: '',
                description: ''
            }
        };
        this.handleMarkerPress = this.handleMarkerPress.bind(this);
    };

    async componentDidMount() {
        let storedToken = await AsyncStorage.getItem('authentication_token')
        let storedEmail = await AsyncStorage.getItem('email')
        this.setState( {
            authentication_token: storedToken,
            email: storedEmail
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileError && nextProps.profileError !== this.props.profileError) {
            this.props.alertWithType('error','Error',nextProps.profileError);
        } else if(nextProps.profileResult && nextProps.profileResult !== this.props.profileResult) {
            this.props.navigation.navigate('UserProfile');
            //this.props.navigation.pop('HomeAlternate');
        }
    }

    

    handleRegionChange = (location) => {
        //console.log("---------tour array--------")
        //console.log(this.props.tourArray)
        this.props.dispatch(changeTourLocationValue(location))
    };

    handleListPress = () => {
        this.props.navigation.navigate('Profile');
    }

    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    }
    
    handleMarkerPress = () => {
        this.props.dispatch(pressProfileView(this.state.ID,this.state.authentication_token,this.state.email,this.state.tourInfo));

        //this.props.navigation.navigate('TourGuide');
    };



<<<<<<< HEAD

=======
>>>>>>> a00e5bd48f44264f31c279046cce2542ea3c6b9d
    render() {
        return (
            <View>
            <View style={styles.container}>

                
                <MapView
                style={styles.map}
                initialRegion={TEMP_INITIAL_REGION}
                onRegionChangeComplete={this.handleRegionChange}
                >

                
                    {this.props.tourArray.map((data) => {
                    return (
                        <MapView.Marker
                        key={data.id}
                        coordinate={{
                            latitude: data.latitude,
                            longitude: data.longitude,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421
                        }}
                        //onCalloutPress={this.state.pressable ? this.handleMarkerPress(data.traveler_id): null}
                        description={data.title}
                        //image={data.image}
                        //description = title
                        onPress={() => {this.setState({ 
                            ID: data.traveler_id,
                            tourInfo: {
                                city: data.city,
                                name: data.title,
                                duration: data.duration,
                                description: data.description
                            }
                         })}}
                        >
                        
                        <MapView.Callout
                        onPress={this.handleMarkerPress}
                        >
                            <CalloutContent
                            markerTitle={data.traveler_id}
                            markerDescription={data.title}
                            
                            />
                        </MapView.Callout>
                        </MapView.Marker>
                    )
                    })}
                </MapView>

                <View
                style={{
                    height: '8%',
                    width: '80%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    top: '10%'
                }}
                >
                    <TextInput
                    placeholder={'Search'}
                    style={{
                        backgroundColor: '#ffffff',
                        height: '100%',
                        width: '95%',
                        fontSize: 18
                    }}
                    />
                </View>
                
            
                
            </View>

                <View style={{
                    width: '100%',
                    height: '8%',
                    flexDirection: "row",
                    
                }}
                >
                <View 
                style={{
                    height: '100%',
                    width: '33%',
                    backgroundColor: '#000000'
                }}
                >
                <TouchableOpacity
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#000000',
                }}
                onPress={this.handleListPress}
                >
                    <Text style={{ color: '#ffffff', fontSize: 16 }}>
                        List View
                    </Text>
                </TouchableOpacity>
                </View>
                <View 
                style={{
                    height: '100%',
                    width: '34%',
                    backgroundColor: '#000000'
                }}
                >
                <TouchableOpacity
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#000000',
                }}
                onPress={this.handleMarkerPress}
                //onPress={this.handleSettingsPress}
                >
                    <Text style={{ color: '#ffffff', fontSize: 16 }}>
                        Settings
                    </Text>
                </TouchableOpacity>
                </View>
                <View 
                style={{
                    height: '100%',
                    width: '33%',
                    backgroundColor: '#000000'
                }}
                >
                <TouchableOpacity
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#000000',
                }}                
                >
                    <Text style={{ color: '#ffffff', fontSize: 16 }}>
                        Menu View
                    </Text>
                </TouchableOpacity>
                </View>
                </View>

            </View>
            
        );
    };
};

const mapStateToProps = (state) => {
    const mapLocation = state.TourList.location;
    const tourArray = state.TourList.result.tours;

    const profileError = state.ViewProfile.errors;
    const profileResult = state.ViewProfile.result;
    

    return {
        mapLocation,
        tourArray,
        profileError,
        profileResult
    };
};

export default connect(mapStateToProps)(connectAlert(HomeAlternate));

        
