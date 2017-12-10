// Having a number for each key type helps ensure the right function is executed when a button is pressed.
var key_types = {
  NUM: 1, // numbers
  OP_KEY: 2, // operator
  PERC: 3, // percent key
  REV: 4, // change to positive / negative key
  CLEAR: 5, // all clear key
  DEC: 6, // decimal
  EQUALS: 7 // equals
}

// We need to track the state so each step only has certain options available to it. For example, we shouldn't be able to
// add another decimal once we're already in the decimal state.
var states = {
  DEFAULT: 1, // the default state, 0
  FIRST_ARG: 2, // first argument
  FIRST_ARG_FLOAT: 3, // first argument as float
  OP: 4, // operator
  SEC_ARG: 5, // second argument
  SEC_ARG_FLOAT: 6, // second argument as float
  SEC_ARG_DECIMAL: 7, // second argument as "0."
  EQUALS: 8 // equals
}

// This contains properties that will change like the display, functions for the operators, and the implementation of
// a finite state machine in the form of a method.
var calc = {
  
  // variables that change
  state: states.DEFAULT, // let the state change
  display: "", // what's on the display. The default state is 0.
  exp_disp: "", // what's on the expression display
  arg_1: "", // argument 1
  arg_2: "", // argument 2
  op: "", // the operator
  
  // implement the FSM
  doStep: function(key_type, key) {
    switch (this.state) {
      case states.DEFAULT:
        if (key_type === key_types.NUM) {
          this.setDisp(key);
          this.state = states.FIRST_ARG;
        }
        break;
        
      case states.FIRST_ARG:
        if (key_type === key_types.NUM) {
          this.appendDisp(key);
        } else if (key_type === key_types.DEC) {
          this.appendDisp(key);
          this.state = states.FIRST_ARG_FLOAT;
        }
        break;
    } // end of switch statement
  }, // end of doStep function
  
  // change display
  setDisp: function(key) {
    this.display = key;
    this.updateDisp(this.display);
  },
  
  // add number to display
  appendDisp: function(key) {
    this.display += key;
    this.updateDisp(this.display);
  },
  
  // make positive numbers negative and vice versa
  reverseNum: function(key) {
    if (this.display > 0) {
      this.display = -Math.abs(this.display);
    } else if (this.display < 0) {
      this.display = Math.abs(this.display);
    }
  },
  
  // update the html display
  updateDisp: function(text) {
    $("#display").text(text);
  }
} // end of calc object


// add event handlers for buttons
$(".digit").on("click", function() {
  calc.doStep(key_types.NUM, $(this).html());
})

$("#decimal").on("click", function() {
  calc.doStep(key_types.DEC, $(this).html());
})

$("#reverse").on("click", function() {
  calc.doStep(key_types.REV, $(this).html());
})