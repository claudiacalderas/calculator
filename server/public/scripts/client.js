$(document).ready(function() {
  console.log("client ready");

  $('.operator').on('click', function() {
    console.log('operator button clicked');

    var operator = $(this).attr("id");
    console.log(operator);
    // get numbers
    var operand1 = $('#operand1').val();
    var operand2 = $('#operand2').val();
    console.log(operand1,operand2);
    // ajax get
    $.ajax({
            type: "GET",
            url: "/data/" + operand1 + "/" + operand2 + "/" + operator,
            success: function(responseFromServer) {
              console.log(responseFromServer);
              // show result
              $('#result').empty();
              $('#result'). append('<span>' + responseFromServer.result + '</span>');
            }
    });
  });

  $('#subtractButton').on('click', function() {
    console.log('subtractButton clicked');
  });

  $('#multiplyButton').on('click', function() {
    console.log('multiplyButton clicked');
  });

  $('#divideButton').on('click', function() {
    console.log('divideButton clicked');
  });

  $('#clearButton').on('click', function() {
    console.log('clearButton clicked');
  });


});
