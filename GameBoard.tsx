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
import { FinancialState, StockState, Stock, OwnedStock } from "./FinancialState";
import DonutBoard from "./DonutBoard";
import StockMarket from "./StockMarket";

type State = {
  financialState:{
    cash:number,
    cashFlow:number,
  },
  playerPosition:number,
  showFinancialStatement:boolean,
  showStockMarket:boolean,
  turnNumber:number,
};

function initState() {
  const aapl = new Stock({
    title: "AAPL",
    pricePerShare: 300,
  });
  const nflx = new Stock({
    title: "NFLX",
    pricePerShare: 100,
  });
  const stockState = new StockState();
  stockState.stocks[aapl.title] = aapl;
  stockState.stocks[nflx.title] = nflx;
  const financialState = new FinancialState();
  const aapl1 = new OwnedStock({
    stock: aapl,
    numShares: 5,
    purchaseTurn: 0,
  });
  const nflx1 = new OwnedStock({
    stock: nflx,
    numShares: 10,
    purchaseTurn: 0,
  });
  financialState.ownedStocks = [
    aapl1,
    nflx1,
  ];
  financialState.cash = 5000;
  return {
    stockState,
    financialState,
  }
}

export default class GameBoard extends React.Component<{},State> {
  private d_financialState:FinancialState;
  private d_stockState:StockState;
  constructor(props) {
    super(props);
    const state = initState();
    this.d_stockState = state.stockState;
    this.d_financialState = state.financialState;

    this.state = {
      financialState: {
        cash: this.d_financialState.cash,
        cashFlow: this.d_financialState.cashFlow,
      },
      playerPosition: 0,
      showFinancialStatement: false,
      showStockMarket: false,
      turnNumber: 0,
    }
  }
  render() {
    const currCash = this.state.financialState.cash;
    const cashFlow = this.state.financialState.cashFlow;
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
              financialState={this.d_financialState}
              onClose={() => {
                this.setState({
                  financialState: {
                    cash: this.d_financialState.cash,
                    cashFlow: this.d_financialState.cashFlow,
                  },
                  showFinancialStatement: false,
                });
              }}/>
        </Modal>
        <Modal
            transparent={true}
            visible={this.state.showStockMarket}>
          <StockMarket
              financialState={this.d_financialState}
              stockState={this.d_stockState}
              turnNumber={this.state.turnNumber}
              onClose={() => {
                this.setState({
                  financialState: {
                    cash: this.d_financialState.cash,
                    cashFlow: this.d_financialState.cashFlow,
                  },
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
              flexDirection: "row",
              justifyContent: "space-around"
            }}>
          <Text>Cash: ${currCash.toLocaleString()}</Text>
          <Text
              style={{
                color: cashFlow > 0 ? "green" : "red",
              }}>
            Cash Flow: ${cashFlow.toLocaleString()}
          </Text>
        </View>
        {/*
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
        */}
        <DonutBoard
            playerPosition={this.state.playerPosition}/>
        <View
            style={{
              alignItems: "center",
            }}>
          { this._getTaxDayText() }
          <Button
              title="Roll"
              onPress={this._roll.bind(this)}/>
        </View>
      </View>
    );
  }

  private _roll() {
    const increment = Math.ceil(Math.random() * 6);
    const newPosition = (this.state.playerPosition + increment) % 8;
    this.d_financialState.cash += this.d_financialState.cashFlow;
    if (this.state.turnNumber === 11) {
    }
    this.setState({
      financialState: {
        cash: this.d_financialState.cash,
        cashFlow: this.d_financialState.cashFlow,
      },
      playerPosition: newPosition,
      turnNumber: this.state.turnNumber + 1,
    });
  }

  private _getTaxDayText() {
    const isTaxDay = this.state.turnNumber % 12 === 11;
    const text =  isTaxDay?
      `Taxes due today` :
      `Tax day in ${12 - this.state.turnNumber % 12} turns`;
    return (
      <Text
          style={{
            fontSize: isTaxDay ? 18 : 18,
          }}>
        {text}
      </Text>
    );
  }
};
