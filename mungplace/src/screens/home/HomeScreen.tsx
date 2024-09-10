import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function HomeScreen() {
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
      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playButtonText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // For absolute positioning of the button
  },
  imageContainer: {
    flex: 4, // 3 parts for the image
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
    bottom: 0, // Line at the bottom of the image
    width: '100%',
    height: 2, // Thickness of the line
    backgroundColor: '#000', // Color of the line
  },
  emptySpace: {
    flex: 1, // 1 part for the empty space
    width: '100%',
    backgroundColor: '#F5F5F5', // Same as background color to blend in
  },
  playButton: {
    position: 'absolute', // Absolute positioning for the button
    bottom: 90, // Adjust this value to control how far from the bottom the button appears
    backgroundColor: '#F5A623',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
  playButtonText: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
  },
});
