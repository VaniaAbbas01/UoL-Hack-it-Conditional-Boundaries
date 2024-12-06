import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';

export default function App() {

  const pan = useRef(new Animated.ValueXY()).current;
  const [circleColor, setCircleColor] = useState(-1);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();

        if (pan.y._value < 0) {
          setCircleColor(0);
        }else {
          setCircleColor(1);
        }
      }
    })
).current;

  return (
    <View style={styles.container}>
      <View style={styles.firstHalf}></View>
      <View style={styles.secondHalf}></View>
      <Animated.View 
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View  style={[styles.circle, circleColor==-1 ? undefined:circleColor==0 ? styles.greenCircle:styles.redCircle]}/>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstHalf: {
    position:"absolute",
    width: "100%",
    height: "50%",
    bottom:0,
    backgroundColor:"transparent",
    borderWidth: 10,
    borderColor: "red"
  },
  secondHalf: {
    position:"absolute",
    width: "100%",
    height: "50%",
    top:0,
    backgroundColor:"transparent",
    borderWidth: 10,
    borderColor: "green"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    color: "black" 
  },
  greenCircle: {
    backgroundColor: "green"
  },
  redCircle: {
    backgroundColor: "red"
  },
  
});
