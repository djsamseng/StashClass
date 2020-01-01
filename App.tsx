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
} from 'react-native';

import GameBoard from "./GameBoard";

// @ts-ignore
import { PieChart } from "react-native-svg-charts";
import * as D3 from "react-native-svg";

declare var global: { HermesInternal: null | {} };

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
          style={{
            flex: 1,
          }}>
          <GameBoard />
      </SafeAreaView>
    </>
  );
};

export default App;
