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
import {AssetEntry, StockEntry} from "./FinancialState";


type StockMarketProps = {
  cash:number,
  assets:Array<AssetEntry>,
  onClose:Function,
};

type State = {
  userStocks:Array<StockEntry>,
};

export default class StockMarket extends React.Component<StockMarketProps,State> {
  constructor(props:StockMarketProps) {
    super(props);
    this.state = {
      userStocks: props.assets.filter(asset => {
        if (asset instanceof StockEntry) {
          return true;
        }
        return false;
      })
      .map(asset => {
        return asset as StockEntry;
      }),
    };
  }
  render() {
    const userStocks = this.state.userStocks.map(stockEntry => {
      return (
        <Text
            key={stockEntry.title}>
          {stockEntry.title}
        </Text>
      )
    });
    return (
      <View
          style={{
            backgroundColor: "white",
            flex: 1,
            margin: 20,
            marginTop: 20 + 27,
            marginBottom: 20 + 27,
          }}>
        <Button
            title="Close"
            onPress={() => {
              this.props.onClose();
            }}/>
        { userStocks }
      </View>
    );
  }
};
