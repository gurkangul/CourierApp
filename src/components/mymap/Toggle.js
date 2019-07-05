import React from "react"
import PropTypes from "prop-types"
import {
  Animated,
  Easing,
  TouchableOpacity,
  Text
} from "react-native"

const knobOffset = 32

export class Toggle extends React.Component {
  static propTypes = {
    isOn: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isOn: false,
  }

  state = {
    isOn: this.props.isOn,
    animatedValue: new Animated.Value(this.props.isOn ? knobOffset : 0),
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOn !== this.props.isOn) {
      this.setState(
        { isOn: this.props.isOn },
        () => {
          Animated.timing(
            this.state.animatedValue,
            {
              toValue: this.state.isOn ? knobOffset : 0,
              easing: Easing.elastic(0.7),
              duration: 100,
            }
          ).start()
        }
      )
    }
  }

  handlePress() {
    this.setState(
      { isOn: !this.state.isOn },
      () => this.props.onToggle(this.state.isOn)
    )
  }

  render() {

    const yazi = <Text>aaaaaaaaaaaaaaa</Text>

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor:  "limegreen" ,
          width: 200,
          height: 100,
          borderRadius: 32,
          padding: 4,
        }}
        onPress={() => this.handlePress()}
      >
          {this.state.isOn ? yazi : null}
        <Animated.View style={{
          width: 24,
          height: 24,
          borderRadius: 32,
          transform: [{
            translateX: this.state.animatedValue,
          }]
        }} />
      </TouchableOpacity>
    )
  }
}