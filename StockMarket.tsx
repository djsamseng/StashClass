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
import { FinancialState, StockState, OwnedStock } from "./FinancialState";

type StockMarketProps = {
  financialState:FinancialState,
  stockState:StockState,
  turnNumber:number,
  onClose:Function,
};

export default class StockMarket extends React.Component<StockMarketProps,{}> {
  constructor(props:StockMarketProps) {
    super(props);
    this.state = {};
  }
  render() {
    const userStocks = this.props.financialState.ownedStocks.map(ownedStock => {
      return (
        <Text
            key={ownedStock.title + ownedStock.purchaseTurn}>
          {ownedStock.title}
        </Text>
      )
    });
    const allStocks = Object.values(this.props.stockState.stocks).map(stock => {
      return (
        <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}>
          <Text
              style={{
                alignSelf:"center",
              }}>
            {stock.title}</Text>
          <Button
            title="Buy"
            onPress={() => {
              const purchaseStock = new OwnedStock({
                stock,
                numShares: 1,
                purchaseTurn: this.props.turnNumber,
              });
              this.props.financialState.cash -= purchaseStock.value;
              this.props.financialState.ownedStocks.push(purchaseStock);
            }}/>
        </View>
      )
    })
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
        { allStocks }
      </View>
    );
  }
};
