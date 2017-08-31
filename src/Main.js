import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { incrementAction } from './action';

class Main extends React.Component {
  onPressItem() {
    this.props.incrementAction(this.props.count + 1);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.onPressItem()}
        style={styles.c}>
        <View
          style={styles.c}>
          <Text>{this.props.count || 'ClickMe'}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => {
  const { count } = state.incReducer;
  return { count };
};

const styles = StyleSheet.create({
  c: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, { incrementAction })(Main);
