$(document).ready(function () {
    $("#user-login").on("click", () => {
      $("#userLogin").fadeIn("fast");
      $("#employeeLogin").hide();
    });
  
    $("#employee-login").on("click", () => {
      $("#employeeLogin").fadeIn("fast");
      $("#userLogin").hide();
    });
  
    $("#user-register").on("click", () => {
      $("#userRegister").fadeIn("fast");
      $("#employeeRegister").hide();
    });
  
    $("#employee-register").on("click", () => {
      $("#employeeRegister").fadeIn("fast");
      $("#userRegister").hide();
    });
  
    // for book now html file
  
    $("#electrician").on("click",()=>{
      $(".e-services").fadeIn("fast");
      $(".p-services").hide();
      $(".c-services").hide();
    })
  
    
    $("#plumber").on("click",()=>{
      $(".p-services").fadeIn("fast");
      $(".e-services").hide();
      $(".c-services").hide();
    })
  
    
    $("#carpenter").on("click",()=>{
      $(".c-services").fadeIn("fast");
      $(".p-services").hide();
      $(".e-services").hide();
    })

    $('#electrician').change(function() {
      if ($(this).is(':checked')){
          $('input[name="plumber"]').prop('checked', false); //unchecks all checkboxes of plumber
          $('input[name="carpenter"]').prop('checked', false); //unchecks all checkboxes of carpenter
      }
  });

  $('#plumber').change(function() {
    if ($(this).is(':checked')){
        $('input[name="electrician"]').prop('checked', false); //unchecks all checkboxes of electrician
        $('input[name="carpenter"]').prop('checked', false); //unchecks all checkboxes of carpenter
    }
  });

  $('#carpenter').change(function() {
    if ($(this).is(':checked')){
        $('input[name="electrician"]').prop('checked', false); //unchecks all checkboxes of electrician
        $('input[name="plumber"]').prop('checked', false); //unchecks all checkboxes of plumber
    }
  });

  });
  
  
  