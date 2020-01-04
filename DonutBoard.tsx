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

type State = {
};
type Props = {
  playerPosition:number,
}

const SPOT_TYPES = Object.freeze({
  CHARITY: "CHARITY",
  REAL_ESTATE: "REAL_ESTATE",
  STOCK_MARKET: "STOCK_MARKET",
  LUXURY: "LUXURY",
});

export default class DonutBoard extends React.Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const pieData = this._createPieData();
    const LabelWidgets = this._createLabels(pieData);
    return (
      <PieChart
          style={{
            flex: 1
          }}
          data={ pieData }
          >
        <LabelWidgets />
      </PieChart>
    );
  }

  private _createPieData() {
    const colors = ["mediumseagreen", "gold", "dodgerblue", "firebrick"];
    const randomColor = (index:number) => {
      return colors[index % colors.length];
    }

    let data = [
      SPOT_TYPES.CHARITY,
      SPOT_TYPES.REAL_ESTATE,
      SPOT_TYPES.STOCK_MARKET,
      SPOT_TYPES.LUXURY,
    ];
    const pieData = data.concat(data)
    .map((spotType, index) => ({
      value: 50,
      svg: {
        fill: randomColor(index),
        onPress: () => console.warn('press', index),
      },
      key: `pie-${index}`,
      spotType,
    }));
    return pieData;
  }

  private _createLabels(pieData) {
    const labelWidgets = ({ slices, height, width }) => {
      return slices.map((slice:any, index:number) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const angle = (index + 1) / slices.length * 260;
        if (index !== this.props.playerPosition) {
          return (
            <D3.G
                key={index}
                x={labelCentroid[ 0 ]}
                y={labelCentroid[ 1 ]}
            >
              <D3.Text
                  textAnchor="middle">
                { pieData[index].spotType }
              </D3.Text>
            </D3.G>
          );
        }
        return (
          <D3.G
              key={index}
              x={labelCentroid[ 0 ]}
              y={labelCentroid[ 1 ]}
          >
            <D3.Circle
                r={18}
                fill={'white'}
            >

            </D3.Circle>
            <D3.Image
                x={-10}
                y={10}
                width={20}
                height={20}
                preserveAspectRatio="xMidYMid slice"
                opacity="1"
                // href={Images.memes[ index + 1 ]}
            />
            <D3.Text
                textAnchor="middle">
              { pieData[index].spotType }
            </D3.Text>
          </D3.G>
        );
      });
    };
    return labelWidgets;
  }
};
