var operands = [];
var urlToSend;
var currentOperator;
var hasShownResult = false;
var inputError = false;

$(document).ready(function() {
  console.log("client ready");

  // event listener for + - * / buttons
  $('.operator').on('click', function() {
    console.log('operator button clicked');

    // pushes value in input into array of operands
    operands.push($('#operand1').val());
    $('#operand1').val('');
    console.log(operands);

    // gets which operator was clicked
    currentOperator = $(this).attr("id");
    console.log(currentOperator);
  });

  // event listener for = button
  $('#equal').on('click', function() {
    // pushes value in input into array of operands
    operands.push($('#operand1').val());
    console.log(operands);

    // get numbers and builds url
    if(operands.length > 2) {
      inputError = true;
    } else {
      urlToSend = "/data/";
      for (var i = 0; i < operands.length; i++) {
        if(operands[i] !== "") {
          urlToSend += operands[i];
          urlToSend += "/";
        }
        else {
          inputError = true;
        }
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
                operands = [];
                urlToSend = "";
                currentOperator = "";
                hasShownResult = true;
              }
      });
    } else {
      $('#operand1').val("input error");
      operands = [];
      urlToSend = "";
      currentOperator = "";
      hasShownResult = true;
      inputError = false;
    }
  });

  // event listener for clear button
  $('#clearButton').on('click', function() {
    console.log('clearButton clicked');
    $('#operand1').val('');
    //$('#operand2').val('');
    operands = [];
    urlToSend = "";
    currentOperator = "";
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

});
