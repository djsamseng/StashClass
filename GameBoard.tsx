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

import FinancialStatement from "./FinancialStatement";
import {IncomeEntry, ExpenseEntry, AssetEntry, LiabilityEntry, StockEntry} from "./FinancialState";
import DonutBoard from "./DonutBoard";
import StockMarket from "./StockMarket";

type State = {
  showFinancialStatement:boolean,
  showStockMarket:boolean,
  financialState:{
    cash:number,
    income:Array<IncomeEntry>,
    expenses:Array<ExpenseEntry>,
    assets:Array<AssetEntry>
    liabilities:Array<LiabilityEntry>
  }
};

function createFinancialState() {
  const assets = [
    new StockEntry({
      numShares: 2,
      pricePerShare: 300,
      ticker: "AAPL",
    }),
    new AssetEntry(),
    new StockEntry({
      numShares: 5,
      pricePerShare: 100,
      ticker: "NFLX",
    }),
    new StockEntry({
      numShares: 5,
      pricePerShare: 100,
      ticker: "NFLX2",
    }),
  ];
  return {
    cash: 5000,
    income: [],
    expenses: [],
    assets,
    liabilities: [],
  };
}

export default class GameBoard extends React.Component<{},State> {
  constructor(props) {
    super(props);
    this.state = {
      financialState: createFinancialState(),
      showFinancialStatement: false,
      showStockMarket: false,
    }
  }
  render() {
    const currCash = this.state.financialState.cash;
    const cashFlow = this.state.financialState.assets.reduce((curSum, asset) => {
      return curSum + asset.value;
    }, 0) - this.state.financialState.liabilities.reduce((curSum, liability) => {
      return curSum + liability.value;
    }, 0);
    return (
      <View
          style={{
            backgroundColor: "#DEE5CC",// "#4B6043", "#DEE5CC",
            flex: 1,
          }}>
        <Modal
            transparent={true}
            visible={this.state.showFinancialStatement}>
          <FinancialStatement
              cash={this.state.financialState.cash}
              income={this.state.financialState.income}
              expenses={this.state.financialState.expenses}
              assets={this.state.financialState.assets}
              liabilities={this.state.financialState.liabilities}
              onClose={() => {
                this.setState({
                  showFinancialStatement: false,
                });
              }}/>
        </Modal>
        <Modal
            transparent={true}
            visible={this.state.showStockMarket}>
          <StockMarket
              cash={this.state.financialState.cash}
              assets={this.state.financialState.assets}
              onClose={() => {
                this.setState({
                  showStockMarket: false,
                });
              }}/>
        </Modal>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
          <Button
              title="Financial Statement"
              onPress={() => {
                this.setState({
                  showFinancialStatement: true,
                })
              }}/>
          <Button
              title="Stock Market"
              onPress={() => {
                this.setState({
                  showStockMarket: true,
                });
              }}/>
        </View>
        <View
            style={{
              paddingLeft: 20,
            }}>
          <Text>Cash: ${currCash.toLocaleString()}</Text>
          <Text
              style={{
                color: cashFlow > 0 ? "green" : "red",
              }}>
            Cash Flow: ${cashFlow.toLocaleString()}
          </Text>
        </View>
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
              }}>Test</Text>
        </View>
        <DonutBoard />
      </View>
    );
  }
};
