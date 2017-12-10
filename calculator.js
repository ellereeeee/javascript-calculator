// Having a number for each key type helps ensure the right function is executed when a button is pressed.
var key_type = {
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
var state = {
  DEFAULT: 1, // the default state, 0
  FIRST_ARG: 2, // first argument
  FIRST_ARG_FLOAT: 3, // first argument as float
  OP: 4, // operator
  SEC_ARG: 5, // second argument
  SEC_ARG_FLOAT: 6, // second argument as float
  SEC_ARG_DECIMAL: 7, // second argument as "0."
  EQUALS: 8 // equals
}

// This contains variables that will change like the display
var calc = {
  
  // variables that change
  state: state.DEFAULT, // let the state change
  display: "", // what's on the display
  exp_disp: "", // what's on the expression display
  arg_1: "", // argument 1
  arg_2: "", // argument 2
  op: "" // the operator
}