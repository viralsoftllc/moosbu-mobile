import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

import {COLORS, SIZES, FONTS} from '../../../../assets/themes';
import {scale, verticalScale} from 'react-native-size-matters';

export default function ChartContainer({data}) {
  //   const data2 = [
  //     {index: 1, title: 'Total Customer', value: 10},
  //     {index: 2, title: 'total amount of pending order', value: 20},
  //     {index: 3, title: 'total product sold', value: 22},
  //     {index: 4, title: 'total delivered order', value: 18},
  //     {index: 5, title: 'total amount of delivered order', value: 19},
  //     {index: 6, title: 'over-all amount', value: 55},
  //   ];

  function getValue(params) {
    if (!params) {
      return 0;
    }

    let num = Number(params);
    if (Number(params) >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)}b`;
    }

    if (Number(params) >= 1000000) {
      return `${(num / 1000000)?.toFixed(2)}m`;
    }

    if (Number(params) >= 1000) {
      return `${(num / 1000)?.toFixed(2)}k`;
    }

    return num;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.chartTitle}>Sales Overview</Text>
          {/* <Text style={styles.chartFilter}>all</Text> */}
        </View>

        <View style={styles.chartWrapper}>
          <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
            <VictoryBar
              data={data}
              x="index"
              y="value"
              labels={({datum}) => `${datum?.currency}${getValue(datum.value)}`}
              style={{
                data: {fill: COLORS.primary, width: scale(10)},
              }}
            />
          </VictoryChart>
        </View>
      </View>

      <View style={styles.labels}>
        {data?.map((el, i) => (
          <View key={i} style={styles.labelView}>
            <Text style={styles.value}>
              {`${el?.currency}${getValue(el.value)}`}
            </Text>
            <Text style={styles.label}>{el?.title}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
  },
  topView: {
    paddingHorizontal: SIZES.base,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: SIZES.base / 2,
    marginVertical: SIZES.base / 2,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
  },
  chartTitle: {
    ...FONTS.h5,
  },
  chartFilter: {
    color: COLORS.textGray,
    ...FONTS.medium,
  },
  chartWrapper: {
    paddingLeft: SIZES.base / 2,
    borderTopWidth: 1,
    borderColor: COLORS.borderGray,
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: SIZES.base,
    justifyContent: 'space-between',
  },
  labelView: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius / 2,
    width: '48%',
    height: verticalScale(60),
    padding: SIZES.base,
    marginBottom: SIZES.base,
  },
  label: {
    ...FONTS.tiny,
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  value: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
    textTransform: 'lowercase',
    fontWeight: 'bold',
  },
});
