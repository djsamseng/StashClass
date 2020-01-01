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
import {IncomeEntry, ExpenseEntry, AssetEntry, LiabilityEntry} from "./FinancialState";


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
    return (
      <View
          style={{
            marginTop: 27
          }}>
        <Button
            title="Close"
            onPress={() => {
              this.props.onClose();
            }}/>
      </View>
    );
  }
};
