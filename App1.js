import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello world!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});

/**
 * StyleSheet   Follows React Native's StyleSheet API.
 * View         A base component for Layout.
 * Text         A base component for Text rendering.
 * Image        A base component for Image rendering.
 * Touchable    A base component for interaction.
 * Animated     Pulled from the animated project.
 * Easing       A base set of easing functions.
 * Dimensions   Get the devices dimensions.
 * PixelRatio   Get the devices pixel density.
 * Platform     Get information about the platform. (iOS, Android, Web, Sketch, VR,...)
 */
