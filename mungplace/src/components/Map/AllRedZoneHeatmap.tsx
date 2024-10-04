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

const AllRedZoneHeatmap = () => {
  const { userLocation } = useUserLocation(); // 사용자 위치 가져오기
  const { checkAllUserZone } = useWebsocketActions()
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
      checkAllUserZone(1, zoneData);
    }
  }, [userLocation, checkAllUserZone]);
  
  const { allRedZone } = useWebSocket()
  // console.log("visibleElements:", visibleElements);
  // console.log("myBlueZone:", myBlueZone);
  // console.log("Heatmap Point:", myBlueZone.cells)
  
  return (
    <>
      {/* 레드존 히트맵 렌더링 */}
      {visibleElements && allRedZone && allRedZone.cells && allRedZone.cells.length > 0 && (
        <Heatmap
          points={allRedZone.cells.map((cell) => ({
            latitude: cell.point.lat,
            longitude: cell.point.lon,
            weight: cell.weight,
          }))}
          gradient={{
            colors: ['red', 'darkred'],
            startPoints: [0.2, 1.0],
            colorMapSize: 256,
          }}
        />
      )}
    </>
  );
};

export default AllRedZoneHeatmap;