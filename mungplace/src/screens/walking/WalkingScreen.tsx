import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {useMapStore} from '@/state/useMapStore';

import MarkerForm from '@/components/Marker/MarkerForm';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Heatmap, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '@/constants';
import usePermission from '@/hooks/usePermission';

const WalkingScreen: React.FC = () => {
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

  const mapRef = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    
    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude || 35.096406,
      longitude: userLocation?.longitude || 128.853919,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  usePermission('LOCATION');

  // 사용자 위치를 가져오는 useEffect
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
        fetchPersonalBlueZone(latitude, longitude);
        fetchGlobalBlueZone(latitude, longitude);
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}>
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

      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <Text>내위치</Text>
        </Pressable>
      </View>

      {/* 햄버거 버튼 */}
      <TouchableOpacity onPress={toggleModal} style={styles.hamburgerButton}>
        <Text style={styles.hamburgerText}>&#9776;</Text>
      </TouchableOpacity>

      {/* 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal} // Android의 뒤로가기 버튼에 대한 동작
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Button title="Close Modal" onPress={toggleModal} />

                {/* 모달 안에 버튼들 */}
                <View style={styles.buttonContainer}>
                  <Button
                    title="Personal BlueZone"
                    onPress={togglePersonalBlueZone}
                  />
                  <Button
                    title="Global BlueZone"
                    onPress={toggleGlobalBlueZone}
                  />
                  <Button title="RedZone" onPress={toggleRedZone} />
                  <Button title="MungPlace" onPress={toggleMungPlace} />
                  <Button
                    title="Add Marker"
                    onPress={() => setIsFormVisible(true)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
    marginTop: 20, // 버튼들이 모달 안에서 너무 밀착되지 않도록 마진 추가
  },
  hamburgerButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  hamburgerText: {
    fontSize: 40,
    fontWeight: '900',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default WalkingScreen;
