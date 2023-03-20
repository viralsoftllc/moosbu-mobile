import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';

export default function LoanHistory() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.outstandingCard}>
          <Text style={styles.outstandingTitle}>Total left to pay</Text>
          <Text style={styles.outstandingAmount}>N200,000</Text>

          <View style={styles.progressView}>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>

            <Text style={styles.progressLength}>1/6</Text>
          </View>
        </View>

        <View>
          <Text style={styles.history}>Loan history</Text>

          <View style={styles.card}>
            <View style={styles.imageIconView}>
              <ImageIcon
                imageUrl={require('../../../../assets/images/moosbuicon.png')}
                size={verticalScale(20)}
                rounded
                style={styles.imageIcon}
              />
            </View>

            <View style={styles.details}>
              <View style={styles.detailsHeader}>
                <Text style={styles.amount}>N200,000</Text>

                <View style={styles.status}>
                  <Text style={styles.statusText}>In progress</Text>
                </View>
              </View>

              <View style={styles.progressBar}>
                <View style={[styles.progress, styles.progressGreen]} />
              </View>

              <Text style={styles.payments}>2 of 8 payments</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.imageIconView}>
              <ImageIcon
                imageUrl={require('../../../../assets/images/moosbuicon.png')}
                size={verticalScale(20)}
                rounded
                style={styles.imageIcon}
              />
            </View>

            <View style={styles.details}>
              <View style={styles.detailsHeader}>
                <Text style={styles.amount}>N40,000</Text>

                <View style={[styles.status, styles.closedLoanBtn]}>
                  <Text style={[styles.statusText, styles.closedLoanText]}>
                    Closed
                  </Text>
                </View>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    styles.progressFull,
                    styles.progressGreen,
                  ]}
                />
              </View>

              <Text style={styles.payments}>2 of 2 payments</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.base * 3,
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  outstandingCard: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.borderGray,
    height: verticalScale(140),
  },
  outstandingTitle: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    marginBottom: SIZES.base,
  },
  outstandingAmount: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 2,
  },
  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  progressBar: {
    flex: 1,
    height: verticalScale(10),
    borderRadius: 100,
    backgroundColor: COLORS.tabBg,
  },
  progress: {
    height: verticalScale(10),
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    width: '40%',
  },
  progressLength: {
    marginLeft: SIZES.base,
    color: COLORS.grayText,
  },
  history: {
    marginVertical: SIZES.base * 3,
  },
  imageIconView: {
    borderRadius: 100,
    backgroundColor: '#A3C7F7',
    width: verticalScale(40),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    margin: 0,
  },
  card: {
    borderWidth: 1,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
    marginBottom: SIZES.base * 2,
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base,
  },
  detailsHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 2,
  },
  payments: {
    color: COLORS.grayText,
    marginTop: SIZES.base,
  },
  status: {
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 162, 29, 0.2)',
  },
  statusText: {
    color: COLORS.pending,
  },
  amount: {
    ...FONTS.h6,
    color: COLORS.textPrimary,
  },
  closedLoanBtn: {
    backgroundColor: 'rgba(6, 223, 119, 0.2)',
  },
  closedLoanText: {
    color: COLORS.credit,
  },
  progressFull: {
    width: '100%',
  },
  progressGreen: {
    backgroundColor: COLORS.credit,
  },
});
