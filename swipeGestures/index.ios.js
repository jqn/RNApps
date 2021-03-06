/**
 * Swipe Gestures React Native App
 * https://github.com/jqn/RNApps/tree/master/swipeGestures
 * @jQN
 */

import React, { Component } from 'react';
import {
  Animated,
  AppRegistry,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';

export default class swipeGestures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }


  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        let sgs = new SimpleGesture(e, gestureState);
        console.log('------------------');
        console.log('vertical', sgs.isVertical());
        console.log('horizontal', sgs.isHorizontal());
        console.log('isLongSwipeLeft', sgs.isLongSwipeLeft());
        console.log('isSwipeLeft', sgs.isSwipeLeft());
        console.log('isSwipeRight', sgs.isSwipeRight());
        console.log('isSwipeUp', sgs.isSwipeUp());
        console.log('isSwipeDown', sgs.isSwipeDown());
      },
    });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
          <Image source={require('./assets/panresponder.png')} />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('swipeGestures', () => swipeGestures);
