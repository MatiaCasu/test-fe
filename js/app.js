$(document).ready(function(){

  // Product Mosaic Fade In/Fade Out
  $(function(){

    $(".product_box").hover(function(){
      $(this).children('.product_overlay').fadeIn(800);
      $(this).find('h4, .product_intro').css({'opacity': 0});
    });

    $(".product_box").mouseleave(function(){
      $.when($(this).children('.product_overlay').fadeOut(800) )
      .then(function() {
        $(this).parent(".product_box").find('h4, .product_intro').css({'opacity': 1});
      });
    });
  });
  // /Product Mosaic Fade In/Fade Out

  // Products Slider
  $(function(){
    var sliderProdsBullets = $(".slider_prods_nav span");

    sliderProdsBullets.click(
      function(){
        var bullet = $(".slider_prods_nav span");
        var product = $(".slider_prods > div");
        var index = $(this).index();

        bullet.removeClass("active");
        product.removeClass("active");

        $(this).addClass("active");
        product.eq(index).addClass("active");
      }
    );  
  });
  // /Products Slider

  // Footer visible on scroll
  $(function(){

    $(window).scroll(function(){
      if ($(window).scrollTop() > 150 ){
        $("footer > .container-fluid").slideDown("slow");
      }
      else {
        $("footer > .container-fluid").slideUp("slow");
      }
    });
  });
  // /Footer visible on scroll
});


// Smooth scroll to contact-form
function smoothScroll(){
  document.querySelector("#email_section").scrollIntoView({ 
    behavior: "smooth" 
  });
}
// /Smooth scroll to contact-form

// Send Email using EmailJS
window.onload = function() {

  // Starter functin EmailJs
  (function() {
    emailjs.init("user_FS2H5zJxPl5lpomb0zqtM");
  })();

  // Get form input values 
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name_val = document.getElementById('name').value;
    var lastname_val = document.getElementById('lastname').value;
    var email_val = document.getElementById('email').value;
    var gender_val = document.querySelector('input[name="gender"]:checked').value;
    var nationality_val = document.getElementById('nationality').value;

    // Firstname and Lastname string validation
    if( isNaN( parseInt( name_val ) ) && isNaN( parseInt( lastname_val ) ) ){
      var formData = {
        name : name_val,
        lastname : lastname_val,
        email : email_val,
        gender : gender_val,
        nationality : nationality_val,
      };

      // If Data is valid Email to v.motta@makemark.it
      emailjs.send('contact_service', 'contact_form', formData)
      .then(function() {
        console.log('SUCCESS!');
      }, 
      function(error) {
        console.log('Error:', error);
      });

      // Email user
      emailjs.send('contact_service', 'thanks_answer', formData)
      .then(function() {
        console.log('SUCCESS!');
        document.getElementById("alert_msg").innerHTML = "Richiesta Inviata con successo!";
        document.getElementById("alert").classList.add("success");
      },
      function(error) {
        console.log('Error:', error);
        document.getElementById("alert_msg").innerHTML = "Invio non riuscito";
        document.getElementById("alert").classList.add("fail");
      });
    }
    else if( !isNaN( parseInt(name_val) ) ){
      document.getElementById("alert_msg").innerHTML = "Nome non valido!";
      document.getElementById("alert").classList.add("unvalid");
    }
    else{
      document.getElementById("alert_msg").innerHTML = "Cognome non valido!";
      document.getElementById("alert").classList.add("unvalid");
    }
  });

}
// /Send Email using EmailJS

// Close alert 
function close_alert(){
  var element = document.getElementById("alert");
  element.classList.remove("unvalid");
  element.classList.remove("success");
  element.classList.remove("fail");
}