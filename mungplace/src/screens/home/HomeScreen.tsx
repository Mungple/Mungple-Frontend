import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useAppStore} from '@/state/useAppStore';
import React from 'react';

const HomeScreen: React.FC = () => {
  const setWalkingStart = useAppStore(state => state.setWalkingStart);

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Text>이미지</Text>
        <View style={styles.separator} />
      </View>

      {/* Empty Space Section */}
      <View style={styles.emptySpace}></View>

      {/* Play Button */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => setWalkingStart(true)}
      >
        <Text style={styles.playButtonText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#000',
  },
  emptySpace: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  playButton: {
    position: 'absolute',
    bottom: 90,
    backgroundColor: '#F5A623',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
  },
});
