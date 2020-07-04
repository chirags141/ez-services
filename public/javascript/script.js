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
  });
  
  
  