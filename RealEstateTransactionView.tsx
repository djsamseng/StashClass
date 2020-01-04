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

type State = {
};

export default class RealEstateTransactionView extends React.Component<{},State> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <View>

      </View>
    )
  }
};
