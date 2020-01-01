import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button,
  Modal,
} from 'react-native';

// @ts-ignore
import { PieChart } from "react-native-svg-charts";
import * as D3 from "react-native-svg";

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
    onPress: () => console.warn('press', index),
  },
  key: `pie-${index}`,
  t: "test",
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
        <Text>{ pieData[index].t }</Text>
      </D3.G>
    );
  });
};

type State = {
};

export default class DonutBoard extends React.Component<{},State> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <PieChart
          style={{
            flex: 1
          }}
          data={ pieData }
          >
        <Labels/>
      </PieChart>
    );
  }
};
