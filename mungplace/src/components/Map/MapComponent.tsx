import React, {useRef, useEffect, useState} from 'react'
import {Animated, StyleSheet, Image} from 'react-native'
import styled from 'styled-components/native'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import ClusteredMapView from 'react-native-map-clustering'
import MapView, {Heatmap, Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps'

import {colors} from '@/constants' // 색깔
import MapSettings from './MapSettings'
import PolygonLayer from './PolygonLayer' // 멍플 지오해시
import {mapNavigations} from '@/constants'
import MarkerForm from '../marker/MarkerForm'
import redMarker from '@/assets/redMarker.png' // 레드 마커
import blueMarker from '@/assets/blueMarker.png' // 블루 마커
import useWebSocket from '@/hooks/useWebsocket' // 웹소켓에서 블루, 레드 멍플 가져올거임
import usePermission from '@/hooks/usePermission' // 퍼미션
import useUserLocation from '@/hooks/useUserLocation' // 유저 위치
import CustomMapButton from '../common/CustomMapButton' // 커스텀 버튼
import CustomBottomSheet from '../common/CustomBottomSheet' // 커스텀 바텀 바
import {useMapStore, MarkerData} from '@/state/useMapStore' // zustand
import useMarkersWithinRadius from '@/hooks/useMarkersWithinRadius' // 주변 위치 조회 훅

interface MapComponentProps {
  userLocation: {latitude: number; longitude: number}
  path?: {latitude: number; longitude: number}[]
  bottomOffset?: number
  markers?: MarkerData[] // 마커 생성 용
  isFormVisible: boolean
  onFormClose: () => void

  // userMarkers : UserMarker[] // 유저 마커
  // nearbyMarkers : UserMarker[] // 주변 마커 데이터
}

const MapComponent: React.FC<MapComponentProps> = ({
  userLocation,
  bottomOffset = 0,
  path = [],
  onFormClose,
  // onAddMarker,
}) => {
  useMarkersWithinRadius()
  const {addMarker} = useMapStore()
  const navigation = useNavigation()
  const mapRef = useRef<MapView | null>(null)
  const {isUserLocationError} = useUserLocation()
  const [isDisabled, setIsDisabled] = useState(true)
  const [formVisible, setFormVisible] = useState(false) // 마커폼 가시성 함수
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const nearbyMarkers = useMapStore(state => state.nearbyMarkers) // 상태에서 nearbyMarkers 가져오기
  const {myBlueZone, allBlueZone, allRedZone, mungZone} = useWebSocket()
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false) // 환경 설정에 쓰는 모달 가시성

  // 지도 요소 가시성 상태
  const [visibleElements, setVisibleElements] = useState({
    blueZone: true,
    redZone: true,
    mungZone: true,
    convenienceInfo: true,
    myBlueZone: true,
    redMarkers: true,
    blueMarkers: true,
  })

  // 지도 요소 토글 함수
  const toggleElementVisibility = (element: keyof typeof visibleElements) => {
    setVisibleElements(prev => ({
      ...prev,
      [element]: !prev[element],
    }))
  }

  // Fetch zones data
  useEffect(() => {
    console.log('나의 블루존:', myBlueZone)
    console.log('블루존:', allBlueZone)
    console.log('레드존:', allRedZone)
    console.log('멍플:', mungZone)
  }, [myBlueZone, allBlueZone, allRedZone, mungZone])

  // 유저의 위치를 호출하는 함수
  const handlePressUserLocation = () => {
    if (!isUserLocationError) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude || 35.096406,
        longitude: userLocation.longitude || 128.853919,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
  }

  // 마커 등록 하기 => 오류 발생 시 여기 타입 일 수 있음
  const handleMarkerSubmit = (markerData: MarkerData) => {
    addMarker(markerData)
    setFormVisible(false)
  }

  // 마커 클릭 시 호출되는 함수 (상세정보 호출)
  const handleMarkerClick = (markerId: string) => {
    navigation.navigate(mapNavigations.MARKERDETAIL, {markerId})
    console.log(`마커 클릭 : ${markerId}`)
  }

  // 메뉴 햄버거 바 클릭 시 호출되는 함수
  const handlePressMenu = () => {
    setIsMenuVisible(prev => !prev)
    const animationTargets = isMenuVisible
      ? {translateY: 0, opacity: 0}
      : {translateY: 80, opacity: 1}

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: animationTargets.translateY,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: animationTargets.opacity,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsDisabled(isMenuVisible))
  }

  // 환경설정(토글 모음)
  const handlePressSetting = () => {
    setIsSettingModalVisible(true)
    handlePressMenu()
  }

  usePermission('LOCATION')

  // 화면을 떠날 때 WebSocket 연결 해제
  useFocusEffect(
    React.useCallback(() => {
      console.log('MapComponent focused')
      return () => {
        console.log('MapComponent unfocused, WebSocket disconnected')
      }
    }, []),
  )

  return (
    <Container>
      <ClusteredMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: userLocation.latitude || 35.096406,
          longitude: userLocation.longitude || 128.853919,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={15}
        maxZoomLevel={20}
        style={{flex: 1}}
        clusteringEnabled={true}
        clusterColor={colors.ORANGE.DARKER}>
        {/* 블루 마커 */}
        {visibleElements.blueMarkers &&
          nearbyMarkers
            .filter(marker => marker.type === 'BLUE')
            .map(marker => (
              <Marker
                key={marker.markerId}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => handleMarkerClick(marker.markerId)}>
                <Image source={blueMarker} style={styles.markerImage} />
              </Marker>
            ))}

        {/* 레드 마커 */}
        {visibleElements.redMarkers &&
          nearbyMarkers
            .filter(marker => marker.type === 'RED')
            .map(marker => (
              <Marker
                key={marker.markerId}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => handleMarkerClick(marker.markerId)}>
                <Image source={redMarker} style={styles.markerImage} />
              </Marker>
            ))}

        {/* Polyline */}
        {path.length > 1 && (
          <Polyline
            coordinates={path}
            strokeColor={colors.ORANGE.LIGHTER} // 필요에 따라 색상 변경
            strokeWidth={5}
          />
        )}

        {/* 개인 블루존 히트맵 */}
        {visibleElements.myBlueZone && myBlueZone && myBlueZone.cells.length > 0 && (
          <Heatmap
            points={myBlueZone.cells.map(cell => ({
              latitude: cell.point.latitude,
              longitude: cell.point.longitude,
              weight: cell.weight,
            }))}
          />
        )}

        {/* 전체 블루존 히트맵 */}
        {visibleElements.blueZone && allBlueZone && allBlueZone.cells.length > 0 && (
          <Heatmap
            points={allBlueZone.cells.map(cell => ({
              latitude: cell.point.latitude,
              longitude: cell.point.longitude,
              weight: cell.weight,
            }))}
          />
        )}

        {/* 전체 레드존 히트맵 */}
        {visibleElements.redZone && allRedZone && allRedZone.cells.length > 0 && (
          <Heatmap
            points={allRedZone.cells.map(cell => ({
              latitude: cell.point.latitude,
              longitude: cell.point.longitude,
              weight: cell.weight,
            }))}
            gradient={{
              colors: ['red', 'darkred'],
              startPoints: [0.2, 1.0],
              colorMapSize: 256,
            }}
          />
        )}

        {/* 멍플 지오해시 */}
        {/* {visibleElements.mungZone && mungZone && mungZone.length > 0 && (
          <PolygonLayer zones={mungZone} />
        )} */}
      </ClusteredMapView>

      {/* 커스텀 맵 버튼 */}
      <CustomMapButton onPress={handlePressMenu} iconName="menu" top={20} right={20} />

      <Animated.View
        style={{
          transform: [{translateY}],
          opacity,
          position: 'absolute',
          top: 0,
          right: 0,
        }}>
        <ButtonWithTextContainer top={40} right={20}>
          <TextLabel>마커 등록</TextLabel>
          <CustomMapButton
            onPress={() => {
              console.log('모달 열기')
              setFormVisible(true)
            }}
            iconName="location-outline"
            inValid={false}
          />
        </ButtonWithTextContainer>
        {/* MarkerForm 모달 */}
        <MarkerForm
          isVisible={formVisible}
          onSubmit={handleMarkerSubmit}
          onClose={() => setFormVisible(false)}
          latitude={userLocation.latitude} // 유저의 위도 값
          longitude={userLocation.longitude} // 유저의 경도 값
        />
        <ButtonWithTextContainer top={120} right={20}>
          <TextLabel>지도 설정</TextLabel>
          <CustomMapButton
            onPress={handlePressSetting}
            iconName="settings-outline"
            inValid={isDisabled}
          />
        </ButtonWithTextContainer>
        <CustomBottomSheet
          modalVisible={isSettingModalVisible}
          setModalVisible={setIsSettingModalVisible}
          menuName="지도 설정"
          height={500}>
          <MapSettings
            visibleElements={visibleElements}
            toggleElementVisibility={toggleElementVisibility}
          />
        </CustomBottomSheet>
      </Animated.View>

      <CustomMapButton
        onPress={handlePressUserLocation}
        iconName="locate"
        bottom={20 + bottomOffset}
        left={20}
      />
      <CustomMapButton onPress={() => {}} iconName="reload" bottom={20 + bottomOffset} right={20} />
    </Container>
  )
}

const styles = StyleSheet.create({
  markerImage: {
    width: 30,
    height: 30,
  },
  markerImageLarge: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0,5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})

const Container = styled.View`
  flex: 1;
`

const ButtonWithTextContainer = styled.View<{top?: number; right?: number}>`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  top: ${({top}) => top || 0}px;
  right: ${({right}) => right || 0}px;
`

const TextLabel = styled.Text`
  margin-right: 80px;
  font-size: 24px;
  font-weight: bold;
  color: black;
`

export default MapComponent
