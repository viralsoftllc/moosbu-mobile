import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {COLORS, SIZES} from '../../../../assets/themes';

export default function Chart() {
  return (
    <View style={styles.chartView}>
      <LineChart
        data={{
          labels: [
            'Jan 1',
            'Jan 2',
            'Jan 3',
            'Jan 4',
            'Jan 5',
            'Jan 6',
            'Jan 7',
          ],
          datasets: [
            {
              data: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
              ],
              strokeWidth: 1,
            },
          ],
        }}
        width={Dimensions.get('screen').width} // from react-native
        height={300}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: COLORS.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => COLORS.textPrimary,
          labelColor: () => COLORS.textPrimary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: COLORS.primary,
            fill: COLORS.white,
          },
          propsForBackgroundLines: {
            stroke: '',
          },
        }}
        bezier
        style={styles.style}
        transparent={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  chartView: {
    marginTop: SIZES.base * 2,
  },
  style: {
    marginLeft: -20,
  },
});
