import React , { useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, View, TouchableOpacity, Modal } from 'react-native';

import * as Location from 'expo-location';

import Geojson from 'react-native-geojson';

export default function App() {
  const nombreDelPlan = {
    "type": "FeatureCollection",
        "name": "Capa sin nombre",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { "Name": "Centro Medicus Azcuénaga", "description": null }, "geometry": { "type": "Point", "coordinates": [ -58.400734, -34.5977726 ] } },
        { "type": "Feature", "properties": { "Name": "Sanatorio Güemes", "description": null }, "geometry": { "type": "Point", "coordinates": [ -58.4218436, -34.5970481 ] } }
        ]
    }

    
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let lat = "Nothing in lat"
  let long = "Nothing in long"
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    lat = JSON.stringify(location.coords.latitude);
    long = JSON.stringify(location.coords.longitude);
  }

const [elMapa, setelMapa] = useState(null);
  return (
    <View>
        
    <TouchableOpacity style={{alignSelf: "center", margin: "20%"}} onPress={() => {setelMapa(true)}}>
    <Text >Mapa30 3:15am </Text>
    <Text>{text}</Text>
    <Text>Latidude: {lat}</Text>
    <Text>Longitude: {long}</Text>

    </TouchableOpacity>
    <Modal visible={elMapa}
    animationType="fade"
    transparent={true}
    onRequestClose={() => {setelMapa(false)}}>
    
    <View>
    {elMapa == true && 
                <MapView
                    style={{height: "70%", width: "100%" }}
                    initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0121}}>
                <Marker coordinate={{latitude: location.coords.latitude,longitude: location.coords.longitude,latitudeDelta: 0.0222,longitudeDelta: 0.0121}}/>

                <Geojson geojson={nombreDelPlan} />
            
                </MapView>}
    </View>
    </Modal>
    </View>
    );
    }
    