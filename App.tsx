import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';

// @ts-ignore
import { PieChart } from "react-native-svg-charts";

declare var global: { HermesInternal: null | {} };

const App = () => {
  const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

  const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

  const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
          value,
          svg: {
              fill: randomColor(),
              onPress: () => console.log('press', index),
          },
          key: `pie-${index}`,
      }));
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View
              style={{
                backgroundColor: "green",
                height: 500,
                flex: 1,
              }}>
            <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "blue",
                  padding: 15,
                }}>
              <Text
                  style={{
                    backgroundColor: "red",
                    transform: [{rotate:"45deg"}]
                  }}>
                Test
              </Text>
            </View>
            <PieChart
                  style={ { flex: 1 } }
                  data={ pieData }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
