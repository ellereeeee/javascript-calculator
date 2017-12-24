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
  display: 0, // what's on the display. The default state is 0.
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
        } 
        if (key_type === key_types.DEC) {
          this.appendDisp(key);
          this.state = states.FIRST_ARG_FLOAT;
        } 
        if (key_type === key_types.REV) {
          this.reverseNum();
        }
        if (key_type === key_types.PERC) {
          this.setDisp(0);
          this.state = states.DEFAULT;
        }
        if (key_type === key_types.OP_KEY) {
          this.arg_1 = this.display;
          this.op = key;
          this.updateExpDisp(this.arg_1, this.op);
          this.state = states.OP;
        }
        break;
        
      case states.FIRST_ARG_FLOAT:
        if (key_type === key_types.NUM) {
          this.appendDisp(key);
        }
        if (key_type === key_types.REV) {
          this.reverseNum();
        }
        if (key_type === key_types.PERC) {
          this.setDisp(0);
          this.state = states.DEFAULT;
        }
        if (key_type === key_types.OP_KEY) {
          this.arg_1 = this.display;
          this.op = key;
          this.updateExpDisp(this.arg_1, this.op);
          this.state = states.OP;
        }
        break;
        
      case states.OP:
        if (key_type === key_types.NUM) {
          this.setDisp(key);
          this.state = states.SEC_ARG;
        }
        if (key_type === key_types.DEC) {
          this.setDisp("0.");
          this.state = states.SEC_ARG_DECIMAL;
        }
        if (key_type === key_types.EQUALS) {
          this.arg_2 = this.display;
          this.operation();
          this.state = states.EQUALS;
        }
        break;
        
      case states.SEC_ARG:
        if (key_type === key_types.EQUALS) {
          this.arg_2 = this.display;
          this.operation();
          this.state = states.EQUALS;
        }
        if (key_type === key_types.NUM) {
          this.appendDisp(key);
        }
        if (key_type === key_types.REV) {
          this.reverseNum();
        }
        if (key_type === key_types.PERC) {
          this.percentify();
        }
        if (key_type === key_types.OP_KEY) {
          this.operation();
          this.arg_1 = this.display;
          this.op = key;
          this.arg_2 = "";
          this.updateExpDisp(this.arg_1, this.op);
          this.state = states.OP;
        }
        if (key_type === key_types.DEC) {
          this.appendDisp(key);
          this.state = states.SEC_ARG_FLOAT;
        } 
        break;
        
      case states.SEC_ARG_FLOAT:
        if (key_type === key_types.NUM) {
          this.appendDisp(key);
        }
        if (key_type === key_types.REV) {
          this.reverseNum();
        }
        if (key_type === key_types.PERC) {
          this.percentify();
        }
        if (key_type === key_types.EQUALS) {
          this.arg_2 = this.display;
          this.operation();
          this.state = states.EQUALS;
        }
        break;
        
      case states.SEC_ARG_DECIMAL:
        if (key_type === key_types.NUM) {
          this.appendDisp(key);
          this.state = state.SEC_ARG_FLOAT;
        }
        if (key_type === key_types.EQUALS) {
          this.arg_2 = this.display;
          this.operation();
          this.state = states.EQUALS;
        }
        break;
        
      case states.EQUALS:
        if (key_type === key_types.EQUALS) {
          this.arg_1 = this.display;
          this.operation();
        }
        if (key_type === key_types.OP_KEY) {
          this.setExpDisp();
          this.arg_1 = this.display;
          this.op = key;
          this.updateExpDisp(this.arg_1, this.op);
          this.state = states.OP;
        }
        if (key_type === key_types.REV) {
          this.reverseNum();
        }
        if (key_type === key_types.DEC) {
          this.setDisp("0.");
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
    if (this.display.toString().length > 12) {
      this.allClear();
      this.setExpDisp("Number is too big!");
    } else {
      this.updateDisp(this.display);
    }
  },
  
  // make positive numbers negative and vice versa
  reverseNum: function() {
    if (this.display > 0) {
      this.display = -Math.abs(this.display);
    } else if (this.display < 0) {
      this.display = Math.abs(this.display);
    }
    this.updateDisp(this.display);
  },
  
  // handle +, −, ×, and ÷ operations. 
  // We use a function instead of eval() because eval() voids engine optimizations.
  operation: function() {
    switch (this.op) {
      case "+":
        this.display = Number(this.arg_1) + Number(this.arg_2);
        break;
      case "−":
        this.display = Number(this.arg_1) - Number(this.arg_2);
        break;
      case "×":
        this.display = Number(this.arg_1) * Number(this.arg_2);
        break;
      case "÷":
        this.display = Number(this.arg_1) / Number(this.arg_2);
        break;
    } // end of switch statement
    // make sure length does not exceed 12 characters
    if (this.display.toString().length > 12) {
      this.allClear();
      this.setExpDisp("Number too big!");
    } else {
      this.updateDisp(this.display);
      this.setExpDisp();
    }
  },
  
  // find arg_2 percentage of arg_1
  percentify: function() {
    this.display = (this.arg_1 * this.display/100);
    this.updateDisp(this.display);
  },
  
  // update the html display
  updateDisp: function(text) {
    $("#display").text(text);
  },
  
  // update the expression display
  updateExpDisp: function(arg1, op) {
    $("#exp_display").text(arg1 + " " + op);
  },
  
  // set exp_display on browser
  setExpDisp: function(text) {
    $("#exp_display").text(text);
  },
  
  // clear all data and go to default state
  allClear: function() {
    this.arg_1 = "";
    this.arg_2 = ""; 
    this.op = ""; 
    this.setExpDisp();
    this.setDisp(0);
    this.state = states.DEFAULT;
  }

} // end of calc object


// add event handlers for buttons
$(".digit").on("click", function() {
  calc.doStep(key_types.NUM, $(this).html());
})

$(".operator").on("click", function() {
  calc.doStep(key_types.OP_KEY, $(this).html());
})

$("#decimal").on("click", function() {
  calc.doStep(key_types.DEC, $(this).html());
})

$("#reverse").on("click", function() {
  calc.doStep(key_types.REV, $(this).html());
})

$("#percent").on("click", function() {
  calc.doStep(key_types.PERC, $(this).html());
})

$("#equals").on("click", function() {
  calc.doStep(key_types.EQUALS, $(this).html());
})

$("#clear").on("click", function() {
  calc.allClear(0);
})
