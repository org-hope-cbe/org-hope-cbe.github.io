function formsubmit() {
    var data='{"name":"'+$("#fullname").val()+'","email":"'+$("#email").val()+'","phonenumber":"'+$("#phonenumber").val()+'","message":"'+$("textarea#message").val()+'"}';
    //console.log(data);
    $.ajax({
      type: "POST",
      dataType: 'json',
      crossDomain: true,
      async: true,
      contentType: 'application/json',
      url: "https://formspree.io/f/mleoglek",
      data: data,
      timeout: 40000
    }).done( function(msg){
      console.log(Object.values(msg));
      if (Object.values(msg)[1] == true) {
        //sendgrid(this_form.find("#email").val(),this_form.find("#name").val());
        $("#statusalert").removeClass("alert-danger");
        $("#statusalert").addClass("alert-success");
        
        document.getElementById("statusalert").style.display="show";
        document.getElementById('status_message').innerHTML="Message Sent Successfully";
        
        $("#statusalert").fadeTo(2000, 500).slideUp(500, function() {
          $("#statusalert").slideUp(500);
        });
      } else {
        if(!msg) {
          msg = 'Form submission failed and no error message returned from: ' + action + '<br>';
        }
        document.getElementById("statusalert").style.display="show";
        document.getElementById('status_message').innerHTML=msg;
      }
    }).fail( function(data){
      var error_msg = "Form submission failed!<br>";
      if(data.statusText || data.status) {
        error_msg += 'Status:';
        if(data.statusText) {
          error_msg += ' ' + data.statusText;
        }
        if(data.status) {
          error_msg += ' ' + data.status;
        }
        error_msg += '<br>';
      }
      if(data.responseText) {
        error_msg += JSON.parse(data.responseText)['error'];
      }
      console.log(error_msg);
      document.getElementById('status_message').innerHTML=error_msg;

      $("#statusalert").fadeTo(2000, 500).slideUp(500, function() {
        document.getElementById("statusalert").style.display="show";
        $("#statusalert").slideUp(500);
      });
    });
  }