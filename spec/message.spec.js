const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });
  it ("constructor sets name", function() {
    test = new Message("Steve", "command");
    assert.strictEqual(test.name, "Steve");  
  });
    it ("contains a commands array passed into the constructor as 2nd argument", function() {
    let help = [666, 'hello', true];
    let test2 = new Message('Test message with two commands', help);
    assert.deepStrictEqual(test2.commands, [666, 'hello', true]);  
  });
});

