import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage, Carousel} from 'react-native-snap-carousel';
import styles from './styles';
import { connectAlert} from '../Alert';
import { connect } from 'react-redux';
import { getCurrentTour } from '../../actions/TourPage';
import { withNavigation } from 'react-navigation';

class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.string,
        isTourCarousel: PropTypes.bool,
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even} = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }


tourInfo = (isTourCarousel,subtitle, even,title) => {

  const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;


	if(isTourCarousel) {
		return (
				<View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
			)
	}

}
  

    render () {
        const { data: { title, subtitle, info}, even , isTourCarousel } = this.props;

    

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { if(isTourCarousel) { {this.props.dispatch(getCurrentTour(info));}
              {this.props.navigation.navigate('TourPage');} }      
                }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                   
                </View>
                
            	{this.tourInfo(isTourCarousel, subtitle, even, title)}
            </TouchableOpacity>
        );
    }
}



const mapStateToProps = (state) => {

        const currentTour = state.TourPage.currentTour;
 
        return {
          currentTour,
  }
}

 export default connect(mapStateToProps)(connectAlert(withNavigation(SliderEntry)));

