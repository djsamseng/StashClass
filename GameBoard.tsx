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
import {IncomeEntry, ExpenseEntry, AssetEntry, LiabilityEntry} from "./FinancialState";
import DonutBoard from "./DonutBoard";

type State = {
  showFinancialStatement:boolean,
  financialState:{
    cash:number,
    income:Array<IncomeEntry>,
    expenses:Array<ExpenseEntry>,
    assets:Array<AssetEntry>
    liabilities:Array<LiabilityEntry>
  }
};

export default class GameBoard extends React.Component<{},State> {
  constructor(props) {
    super(props);
    this.state = {
      financialState: {
        cash: 5000,
        income: [],
        expenses: [],
        assets: [],
        liabilities: [],
      },
      showFinancialStatement: false,
    }
  }
  render() {
    return (
      <View
          style={{
            backgroundColor: "#DEE5CC",// "#4B6043", "#DEE5CC",
            height: 500,
            flex: 1,
          }}>
        <Modal
            transparent={false}
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
              onPress={() => {}}/>
        </View>
        <View
            style={{
              paddingLeft: 20,
            }}>
          <Text>Cash: ${this.state.financialState.cash.toLocaleString()}</Text>
          <Text>Net Worth: $7,500</Text>
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
