var operands = [];
var urlToSend = "";
var currentOperator = "";
var operatorClickedCount = 0;
var hasShownResult = false;
var inputError = false;
var period = false;

$(document).ready(function() {
  console.log("client ready");

  // event listener for + - * / buttons
  $('.operator').on('click', function() {
    // pushes value in input into array of operands only if
    // valueInInput is a valid number
    operatorClickedCount++;
    var valueInInput = $('#operand1').val();
    if (validNumber(valueInInput)) {
      operands.push(valueInInput);
      $('#operand1').val('');
      console.log(operands);
      // gets which operator was clicked
      if (operatorClickedCount<=1) {
        currentOperator = $(this).attr("id");
      }
      console.log(currentOperator);
      period = false;
    }
  });

  // event listener for = button
  $('#equal').on('click', function() {
    // pushes value in input into array of operands
    var valueInInput = $('#operand1').val();
    if (validNumber(valueInInput)) {
      operands.push(valueInInput);
    }
    console.log(operands);
    // get numbers and operator and builds url
    // validates against invalid information
    if(operands.length > 2 || operands.length <= 1 || currentOperator === "" ) {
      inputError = true;
    } else {
      urlToSend = "/data/";
      for (var i = 0; i < operands.length; i++) {
        urlToSend += operands[i];
        urlToSend += "/";
      }
    }
    if(!inputError) {
      console.log('currentOperator is: ',currentOperator);
      urlToSend += currentOperator;
      console.log(urlToSend);
      // ajax get
      $.ajax({
              type: "GET",
              url: urlToSend,
              success: function(responseFromServer) {
                console.log(responseFromServer);
                // show result
                $('#operand1').val("computing..");
                setTimeout(function() {
                    $('#operand1').val(responseFromServer.result);
                }, 3000);
                // resets global variables
                initialize();
              }
      });
    } else {
      $('#operand1').val("input error");
      initialize();
    }
  });

  // event listener for clear button
  $('#clearButton').on('click', function() {
    console.log('clearButton clicked');
    $('#operand1').val('');
    initialize();
  });

  // event listener for number buttons
  $('.numberButton').on('click', function(){
    // checks if a result has just been shown
    if (hasShownResult) {
        $('#operand1').val('');
        hasShownResult = false;
    }
    // get number
    var numberClicked = $(this).attr("id");
    var numberShown = $('#operand1').val();
    numberShown += numberClicked;
    // displays number on operand input
    $('#operand1').val(numberShown);
  });

  // event listener for negativePositive button
  $("#negativePositive").on('click', function() {
    var value;
    value = $('#operand1').val();
    if(validNumber(value)) {
      console.log(value);
      if (parseFloat(value) > 0) {
        value = "-" + $('#operand1').val();
      } else {
        value = value.substring(1,value.length);
      }
      console.log(value);
      $('#operand1').val(value);
    }
  });

  // event listener for decimal button
  $(".periodButton").on('click', function() {
    // validates against period clicked more than once
    if(!period) {
      if (hasShownResult) {
          $('#operand1').val('');
          hasShownResult = false;
      }
      // get number
      var numberShown = $('#operand1').val();
      numberShown += ".";
      // displays number on operand input
      $('#operand1').val(numberShown);
      period = true;
    }
  });

  // initializes global variables
  function initialize() {
    operands = [];
    urlToSend = "";
    currentOperator = "";
    hasShownResult = true;
    inputError = false;
    period = false;
    operatorClickedCount = 0;
  }

  // validate input
  function validNumber(value) {
    if (value != "input error" && value!== "" && value!== ".") {
      return true;
    } else {
      return false;
    }
  }

});
