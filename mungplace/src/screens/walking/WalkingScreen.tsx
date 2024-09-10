import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import MapView, {Heatmap, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useMapStore} from '../../state/useMapStore'; // Zustand 상태 관리
import MarkerForm from '../../components/Marker/MarkerForm'; // MarkerForm 임포트

const MapScreen = () => {
  const {
    showPersonalBlueZone,
    showGlobalBlueZone,
    showRedZone,
    showMungPlace,
    togglePersonalBlueZone,
    toggleGlobalBlueZone,
    toggleRedZone,
    toggleMungPlace,
    fetchPersonalBlueZone,
    fetchGlobalBlueZone,
    personalBlueZones,
    globalBlueZones,
    redZones,
    mungPlaces,
  } = useMapStore();

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // 사용자 위치를 가져오는 useEffect
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
        fetchPersonalBlueZone(latitude, longitude);
        fetchGlobalBlueZone(latitude, longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: userLocation?.latitude || 35.096406,  // 기본 값
          longitude: userLocation?.longitude || 128.853919, // 기본 값
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* 개인 블루존 히트맵 */}
        {showPersonalBlueZone && (
          <Heatmap
            points={personalBlueZones.map(zone => ({
              latitude: zone.latitude,
              longitude: zone.longitude,
              weight: zone.weight || 1,
            }))}
          />
        )}

        {/* 전체 블루존 히트맵 */}
        {showGlobalBlueZone && (
          <Heatmap
            points={globalBlueZones.map(zone => ({
              latitude: zone.latitude,
              longitude: zone.longitude,
              weight: zone.weight || 1,
            }))}
          />
        )}

        {/* 레드존 */}
        {showRedZone &&
          redZones.map((zone, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: zone.latitude,
                longitude: zone.longitude,
              }}
              title="Red Zone"
            />
          ))}

        {/* 멍플레이스 */}
        {showMungPlace &&
          mungPlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title="Mung Place"
            />
          ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title={`Personal BlueZone`} onPress={togglePersonalBlueZone} />
        <Button title={`Global BlueZone`} onPress={toggleGlobalBlueZone} />
        <Button title={`RedZone`} onPress={toggleRedZone} />
        <Button title={`MungPlace`} onPress={toggleMungPlace} />
        <Button title="Add Marker" onPress={() => setIsFormVisible(true)} />
      </View>

      {/* 마커 추가 폼 */}
      {userLocation && (
        <MarkerForm
          isVisible={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MapScreen;
