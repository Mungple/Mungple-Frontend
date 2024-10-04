import React, { useEffect, useState } from 'react';
import { Heatmap } from 'react-native-maps';
import useUserLocation from '@/hooks/useUserLocation';
import  useWebsocketActions  from '@/hooks/useWebsocketActions'
import useWebSocket from '@/hooks/useWebsocket';


interface ToZone {
  side: number;
  point: {
    lat: number;
    lon: number;
  };
}

const MyBlueZoneHeatmap = () => {
  const { userLocation } = useUserLocation(); // 사용자 위치 가져오기
  const { checkMyBlueZone } = useWebsocketActions()
  const visibleElements = useState(true)

  // 사용자 위치 변경 시 블루존 요청
  useEffect(() => {
    if (userLocation) {
      const centerLat = userLocation.latitude;
      const centerLon = userLocation.longitude;

      // 반경 1000미터 내 블루존 요청
      const zoneData: ToZone = {
        side: 1000,
        point: { lat: centerLat, lon: centerLon },
      };
      checkMyBlueZone(zoneData);
    }
  }, [userLocation, checkMyBlueZone]);
  
  const { myBlueZone } = useWebSocket()
  // console.log("visibleElements:", visibleElements);
  // console.log("myBlueZone:", myBlueZone);
  // console.log("Heatmap Point:", myBlueZone.cells)
  
  return (
    <>
      {/* 개인 블루존 히트맵 렌더링 */}
      {visibleElements && myBlueZone && myBlueZone.cells && myBlueZone.cells.length > 0 && (
        <Heatmap
          points={myBlueZone.cells.map((cell) => ({
            latitude: cell.point.lat,
            longitude: cell.point.lon,
            weight: cell.weight,
          }))}
        />
      )}
    </>
  );
};

export default MyBlueZoneHeatmap;