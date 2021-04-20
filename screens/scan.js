import React, {Component, Fragment} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';
import {TouchableOpacity, Text, StatusBar, Linking, View} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
    };
  }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };

  activeQR = () => {
    this.setState({
      scan: true,
    });
  };
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };
  render() {
    const {scan, ScanResult, result} = this.state;
    const desccription = 'LOGO';
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.textTitle}>QR 테스트</Text>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Text numberOfLines={8} style={styles.descText}>
                {desccription}
              </Text>

              <TouchableOpacity
                onPress={this.activeQR}
                style={styles.buttonTouchable}>
                <Text style={styles.buttonTextStyle}>스캔시작</Text>
              </TouchableOpacity>
            </View>
          )}

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result !</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>다시 스캔</Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}

          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              topContent={<Text style={styles.centerText}></Text>}
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.scanner.reactivate()}>
                    <Text style={styles.buttonTextStyle}>스캔 시작</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.setState({scan: false})}>
                    <Text style={styles.buttonTextStyle}>스캔 종료</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}

export default Scan;
