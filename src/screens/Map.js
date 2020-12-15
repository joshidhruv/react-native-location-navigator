import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import CheckLocation from '../components/Permission';
import MapViewDirections from 'react-native-maps-directions';
import Loader from '../components/Loader';
import { GOOGLE_KEY } from '../constant';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default ({ route, navigation }) => {
  const { details } = route.params;
  console.log("details:", details);
  const [region, setRegion] = useState({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  });
  const [marker, setMarker] = useState();
  const [mapView, setMapView] = useState();
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [latitude, setLatitude] = useState(details.coords.latitude)
  const [longitude, setLongitude] = useState(details.coords.longitude)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert(
        'Alert',
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        [{ text: 'OK', onPress: () => false }],
        { cancelable: false },
      );
    } else {
      getLocationPermission();
    }
  }, [])
  const getLocationPermission = async () => {
    const hasPermission = await CheckLocation.hasLocationPermission();
    if (hasPermission) {
      getCurrentLocation();
    }
  };
  const getCurrentLocation = () => {
    Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    }).then(position => {
      const { latitude, longitude } = position.coords;
      setOrigin({ latitude: latitude, longitude: longitude })
      settingDestination();
    });
  };

  const settingDestination = () => {
    setDestination({ latitude: latitude, longitude: longitude })
    watchLocation();
  };
  const watchLocation = async () => {
    await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 0,
      },
      position => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = { latitude, longitude };
        if (marker) {
          coordinate.timing(newCoordinate).start();
        }
        setLatitude(latitude)
        setLongitude(longitude)
        setRouteCoordinates(routeCoordinates.concat([newCoordinate]))
      }
    )
  }
  const onRegionChange = (region) => {
    setRegion({ region })
  }
  const getInitialState = () => {
    return {
      region: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
  }

  if (longitude && latitude) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          provider="google"
          ref={c => setMapView(c)}
          initialRegion={latitude ? region : null}
          onRegionChange={onRegionChange}
        >
          <Marker.Animated
            ref={(marker) => setMarker(marker)}
            // coordinate={getInitialState}
          />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
          />
        </MapView>
      </View>
    )
  }
  else {
    return <Loader loading text="Loading Map..." />
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});