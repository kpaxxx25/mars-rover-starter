const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(7)
    assert.strictEqual(rover.position, 7);
    assert.strictEqual(rover.mode,'normal');
    assert.strictEqual(rover.generatorWatts, 110);
  });
  it ("response returned by receiveMessage contains name of message", function() {
    let message = new Message('work', ['commandsX2']);
    let rover = new Rover(8)
    assert.strictEqual(rover.receiveMessage(message).message, 'work');
  });
  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('coffee', 'tea'), new Command('water')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(9)
    assert.strictEqual(rover.receiveMessage(message).results.length, 2)
  });
   it ("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('please', commands);
    let rover = new Rover(10);
    assert.deepStrictEqual(rover.receiveMessage(message).results, [{completed: true, roverStatus: {mode: 'normal', generatorWatts: 110, position: 10}}]);
  });  
    it('responds correctly to mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('steve', commands);
    let rover = new Rover(11);
    assert.deepStrictEqual(rover.receiveMessage(message).results, [{completed: true}]);
    assert.strictEqual(rover.mode, 'LOW_POWER');
  });


    it('responds with false completed value when attempting to move in LOW_POWER mode', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 666)];
    let message = new Message('football', commands);
    let rover = new Rover(12);
    assert.deepStrictEqual(rover.receiveMessage(message).results, [{completed: true}, {completed: false}]);
  });


    it('responds with position for move command', function(){
    let commands = [new Command('MOVE', 13)];
    let message = new Message('deja', commands);
    let rover = new Rover(13);
    assert.deepStrictEqual(rover.receiveMessage(message).results, [{completed: true}]);
    assert.strictEqual(rover.position, 13);
  });

//     it ('completed false and a message for an unknown command', function(){
//     let hmm = new Command('mis_type', 'why tho');
//     let message = new Message('idgi', hmm);
//     let rover = new Rover(14);
//     assert.deepStrictEqual(rover.receiveMessage(message).results, [{completed: false, error: 'unknown command'}]);
//  });
});
