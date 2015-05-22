'use strict';

var React = require('react-native');
var Sudoku = require('sudoku');
var Dimensions = require('Dimensions');
var _ = require('lodash');

var puzzle  = _.chunk(Sudoku.makepuzzle(), 9);
var solved = Sudoku.solvepuzzle(_.flatten(puzzle));

function onInput(key, value){
  var gridpoint = key.split('-');
  var x = gridpoint[0];
  var y = gridpoint[1];
  puzzle = _.flatten(solved);
  puzzle[x][y] = parseInt(value);
  
  if(_.flatten(puzzle).equals(solved)) {
    cosole.log('puzzle Solved!!!!')
  }
}
console.log(_.flatten(puzzle));
console.log(solved);
var {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} = React;

var Sudoku = React.createClass({
  componentDidMount(){
    this.generateBoard();
  },

  _onInput(input) {
    console.log(input);
  },

  generateBoard() {
    var rows = [];
    var blocks = [];

    puzzle.map(function(row){
      var rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

      row.map(function(block){
        var key = rows.length + '-' + blocks.length;
        var blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;

        if(block === null) {
          blocks.push(
            <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
              <TextInput
                clearTextOnFocus={true}
                keyboardType={'number-pad'}
                style={styles.textInput}
                onChangeText={(input) => onInput(key, input)}
              />
            </View>
          );
        } else {
          blocks.push(
            <View key={key} style={styles.block}>
              <Text style={styles.blockText}>{block}</Text>
            </View>
          );
        }
      });
      rows.push(<View key={rows.length} style={[styles.row, rowSeperator && styles.rowSeperator]}>{blocks}</View>);
      blocks = [];
    });
    return (<View key={rows.length} style={styles.container}>{rows}</View>);
  },

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Sudoku</Text>
        <View style={styles.container}>
          {this.generateBoard()}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  header: {
    marginTop: 25,
    marginBottom: 20,
    alignSelf: 'center',
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
  },
  container: {
    alignSelf: 'center',
    width:300,
    borderWidth: 3,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSeperator: {
    borderBottomWidth: 3
  },
  textInput: {
    paddingBottom: 2,
    paddingLeft: 10,
    height: 40,
    fontSize: 25,
    backgroundColor: 'rgba(0, 0, 255, .1)'
  },
  block: {
    flex: 1,
    justifyContent: 'flex-start',
    borderWidth: 1 / PixelRatio.get(),
    height:40,
  },
  blockSeperator: {
    borderRightWidth: 2
  },
  blockText: {
    fontSize: 25,
    paddingTop: 4,
    alignSelf: 'center'
  },
});

AppRegistry.registerComponent('Sudoku', () => Sudoku);
