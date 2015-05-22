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
  puzzle[x][y] = parseInt(--value);

  if(Sudoku.boardmatches(_.flatten(puzzle), solved)){
    console.log('Game Solved');
  } 
}
console.log(_.flatten(puzzle));
console.log(_.chunk(solved, 9));

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

var SudokuGame = React.createClass({
  getInitialState() {
    return {
      puzzle: _.flatten(puzzle)
    }
  },

  _onInput(input) {
    console.log(input);
  },

  newGame() {
    this.setState({puzzle: Sudoku.makepuzzle()});
  },

  solvePuzzle() {
    this.setState({puzzle: solved});
  },

  generateBoard() {
    var rows = [];
    var blocks = [];
    var puzzle = _.chunk(this.state.puzzle, 9);

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
                onChangeText={(input) => this._onInput(input)}
              />
            </View>
          );
        } else {
          blocks.push(
            <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
              <Text style={styles.blockText}>{++block}</Text>
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
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.solvePuzzle}><Text>Solve Puzzle</Text></TouchableOpacity>
          <Text style={styles.headerText}>Sudoku</Text>
          <TouchableOpacity onPress={this.newGame}><Text>New Game</Text></TouchableOpacity>
        </View>
        <View style={styles.container}>
          {this.generateBoard()}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    alignSelf: 'center',
    width:320,
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

AppRegistry.registerComponent('Sudoku', () => SudokuGame);
