import {alerts} from '@/constants';
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  Permission,
  RESULTS,
} from 'react-native-permissions';

// 권한 유형을 정의하는 타입 (LOCATION, PHOTO)
type PermissionType = 'LOCATION' | 'PHOTO';

// 각 운영체제별로 권한을 매핑할 객체 타입을 정의
type PermissionOS = {
  [key in PermissionType]: Permission;
};

// 안드로이드 권한 정의 (위치 및 사진 접근 권한)
const androidPermissons: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

// iOS 권한 정의 (위치 및 사진 접근 권한)
const iosPermissons: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

// 특정 권한을 요청하는 사용자 정의 훅
function usePermission(type: PermissionType) {
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 권한 요청 수행
  useEffect(() => {
    (async () => {
      // 현재 운영체제가 Android인지 확인
      const isAndroid = Platform.OS === 'android';
      // 운영체제에 맞는 권한 객체 선택
      const permissionOS = isAndroid ? androidPermissons : iosPermissons;
      // 현재 권한 상태 확인
      const checked = await check(permissionOS[type]);

      // 권한이 필요한 경우 경고 알림을 표시하는 함수
      const showPermissonAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE, // 권한 알림 제목
          alerts[`${type}_PERMISSION`].DESCRIPTION, // 권한 알림 설명
          [
            {
              // 사용자에게 설정 페이지로 이동하도록 유도
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      // 권한 상태에 따른 로직 처리
      switch (checked) {
        // 권한이 거부된 경우
        case RESULTS.DENIED:
          if (isAndroid) {
            // Android에서는 권한이 거부된 경우 경고 알림만 표시하고 종료
            showPermissonAlert();
            return;
          }

          // iOS에서는 권한을 다시 요청
          await request(permissionOS[type]);
          break;
        // 권한이 차단되거나 제한된 경우
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          // 설정 페이지로 이동하도록 경고 알림 표시
          showPermissonAlert();
          break;
        // 그 외 (권한이 이미 부여된 경우 등)에는 아무 작업도 하지 않음
        default:
          break;
      }
    })();
  }, [type]); // type이 변경될 때마다 useEffect 실행
}

export default usePermission;
