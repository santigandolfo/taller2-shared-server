module.exports = class Logger {

  static DEBUG(){
    return "(DEBUG)";
  } 

  static INFO(){
    return "(INFO)";
  }

  static ERROR(){
    return "(ERROR)";
  } 

  static log(msg,relevance){
    console.log(relevance + " [" + new Date() + "]> " + msg);
  }
}