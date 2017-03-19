var operands = [];
var urlToSend;
var currentOperator;
var hasShownResult = false;

$(document).ready(function() {
  console.log("client ready");

  $('.operator').on('click', function() {
    console.log('operator button clicked');

    // pushes value in input into array of operands
    operands.push($('#operand1').val());
    $('#operand1').val('');
    console.log(operands);

    // gets which operator was clicked
    currentOperator = $(this).attr("id");
    console.log(currentOperator);

    // operand1 = $('#operand1').val();
    // operand2 = $('#operand2').val();
  });

  $('#equal').on('click', function() {
    // pushes value in input into array of operands
    operands.push($('#operand1').val());
    console.log(operands);

    // get numbers and builds url
    urlToSend = "/data/";
    for (var i = 0; i < operands.length; i++) {
      urlToSend += operands[i];
      urlToSend += "/";
    }
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
              // $('#result').empty();
              // $('#result'). append('<span>' + responseFromServer.result + '</span>');
              $('#operand1').val(responseFromServer.result);
              operands = [];
              urlToSend = "";
              currentOperator = "";
              hasShownResult = true;
            }
    });
  });


  $('#clearButton').on('click', function() {
    console.log('clearButton clicked');
    $('#operand1').val('');
    //$('#operand2').val('');
    operands = [];
    urlToSend = "";
    currentOperator = "";
  });

  $('.numberButton').on('click', function(){
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
