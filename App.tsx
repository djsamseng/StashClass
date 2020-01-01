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
import * as D3 from "react-native-svg";

declare var global: { HermesInternal: null | {} };

const App = () => {
  const colors = ["mediumseagreen", "gold", "dodgerblue", "firebrick"];
  const randomColor = (index:number) => {
    return colors[index % colors.length];
  }

  const data:Array<number> = [];
  for (let idx = 0; idx < 12; idx++) {
    data.push(idx);
  }
  const pieData = data
      .map((value, index) => ({
          value: 50,
          svg: {
              fill: randomColor(index),
              onPress: () => console.log('press', index),
          },
          key: `pie-${index}`,
      }));
  const Labels = ({ slices, height, width }) => {
        return slices.map((slice:any, index:number) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <D3.G
                    key={index}
                    x={labelCentroid[ 0 ]}
                    y={labelCentroid[ 1 ]}
                >
                    <D3.Circle
                        r={18}
                        fill={'white'}
                    />
                    <D3.Image
                        x={-10}
                        y={10}
                        width={20}
                        height={20}
                        preserveAspectRatio="xMidYMid slice"
                        opacity="1"
                        // href={Images.memes[ index + 1 ]}
                    />
                </D3.G>
            )
        })
    };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View
              style={{
                backgroundColor: "#DEE5CC",// "#4B6043", "#DEE5CC",
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
            >
              <Labels/>
            </PieChart>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
