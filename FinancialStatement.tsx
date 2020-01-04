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
import { FinancialState } from "./FinancialState";


type FinancialStatementProps = {
  financialState:FinancialState,
  onClose:Function,
};

type State = {

};

// Should make this really simple with the ability to get more complicated
// Difficulty level? - Money in Money out
// more difficult will have stocks, assets, taxes, capital gain etc.
export default class FinancialStatement extends React.Component<FinancialStatementProps,State> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const currCash = this.props.financialState.cash;
    const cashFlow = this.props.financialState.cashFlow;

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
        {this.props.financialState.ownedStocks
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
