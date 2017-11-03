const chalk = require('chalk');
module.exports = class Logger {

  static DEBUG(){
    let relevance = "(DEBUG)";
    return {
      log: (msg) => {
        console.debug(chalk.yellow(relevance + " [" + new Date() + "]> " + msg));
      }
    } 
  } 

  static INFO(){
    let relevance = "(INFO)";
    return {
      log: (msg) => {
        console.log(chalk.hex('#0DBC79')(relevance + " [" + new Date() + "]> " + msg));
      }
    };
  }

  static ERROR(err){
    let relevance = "(ERROR)";
    return {
      log: (msg) => {
        console.log(chalk.red(relevance + " [" + new Date() + "]> " + msg, err));
      }
    } 
  } 

  static WARNING(){
    let relevance = "(WARNING)"
    return {
      log: (msg) => {
        console.error(chalk.hex('#FF9430')(relevance + " [" + new Date() + "]> " + msg));
      }
    } 
  } 

  static log(msg,relevance){
    relevance.log(msg);
  }
}