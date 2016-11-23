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
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        this.isVertical();
        Animated.spring(
          this.state.scale,
          { toValue: 1.1, friction: 3 }
        ).start();

        let sgs = new SimpleGesture(e, gestureState);

        console.log('vertical', sgs.isVertical());
        console.log('horizontal', sgs.isHorizontal());
        console.log('isLongSwipeLeft', sgs.isLongSwipeLeft());
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.scale,
          { toValue: 1, friction: 3 }
        ).start();
      },
    });
  }

  isVertical() {
    console.log()
  }

  render() {
    let { pan, scale } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = '0deg';

    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

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
