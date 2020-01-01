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
  SectionList,
} from 'react-native';

// @ts-ignore
import { PieChart } from "react-native-svg-charts";
import * as D3 from "react-native-svg";
import {IncomeEntry, ExpenseEntry, AssetEntry, LiabilityEntry, StockEntry} from "./FinancialState";


type FinancialStatementProps = {
  cash:number,
  income:Array<IncomeEntry>,
  expenses:Array<ExpenseEntry>,
  assets:Array<AssetEntry>
  liabilities:Array<LiabilityEntry>
  onClose:Function,
};

type State = {

};

export default class FinancialStatement extends React.Component<FinancialStatementProps,State> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const currCash = this.props.cash;
    const cashFlow = this.props.assets.reduce((curSum, asset) => {
      return curSum + asset.value;
    }, 0) - this.props.liabilities.reduce((curSum, liability) => {
      return curSum + liability.value;
    }, 0);

    const assetView = (
      <View
          style={{
            marginLeft: 10,
          }}>
        <Text
            style={{
              fontSize: 16,
            }}>
          Stocks
        </Text>
        {this.props.assets
          .filter(asset => asset instanceof StockEntry)
          .map(asset => asset as StockEntry)
          .map(stock => {
            return (
              <View
                  style={{
                    alignSelf: "stretch",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginLeft: 10,
                  }}>
                <Text
                    style={{
                    }}>
                  {stock.title}
                </Text>
                <Text
                    style={{
                    }}>
                  {`${stock.numShares}x${stock.pricePerShare}=${stock.value}`}
                </Text>
              </View>
            );
          })}
        <Text>OtherAssets</Text>
      </View>
    );
    const userData:Array<any> = [
      {title: "Income", data: []},
      {title: "Expenses", data: []},
      {title: "Assets", data: [assetView]},
      {title: "Liabilities", data: []},
    ];
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
        <Text>Cash: ${currCash.toLocaleString()}</Text>
        <Text
              style={{
                color: cashFlow > 0 ? "green" : "red",
              }}>
            Cash Flow: ${cashFlow.toLocaleString()}
        </Text>

        <View
            style={{
              flex: 1,
              alignContent: "center"
            }}
        >
          <SectionList
                style={{
                  // Alt drag to scroll
                  flex: 1,
                }}
                showsVerticalScrollIndicator={true}
                sections={userData}
                keyExtractor={(item, index) => item + index }
                renderSectionHeader={({section}) => {
                  return (
                    <Text
                        style={{
                          fontSize: 20,
                        }}>
                      {section.title}
                    </Text>
                  )
                }}
                renderItem={(args:{item}) => {
                  return args.item;
                }}
            />
        </View>
      </View>
    );
  }
};
