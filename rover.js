const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position, mode, generatorWatts) {
    this.position = position
    this.mode = 'normal'
    this.generatorWatts = 110;
  }
  receiveMessage(newMessage) {
    let roverCommand = ['MOVE', 'STATUS_CHECK', 'MODE_CHANGE' ];
    let commandsDone = [];
    
    for(let i=0; i<newMessage.commands.length; i++){
      if(!roverCommand.includes(newMessage.commands[i].commandType)){
         commandsDone.push({completed: false, error: 'unknown command'});
        }
      else if(newMessage.commands[i].commandType === 'STATUS_CHECK'){
          commandsDone.push({completed: true, roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
        }
      else if(newMessage.commands[i].commandType === 'MODE_CHANGE'){
          commandsDone.push({completed: true});
          this.mode = newMessage.commands[i].value;
        } 
      else if(newMessage.commands[i].commandType === 'MOVE'){
          if(this.mode === 'normal'){
            commandsDone.push({completed: true});
            this.position = newMessage.commands[i].value;
        }
      else{
            commandsDone.push({completed: false})
      }
    }
  }
   let messageReturned = {
      message: newMessage.name,
      results: commandsDone
   }
    return messageReturned;
 }
}

module.exports = Rover;