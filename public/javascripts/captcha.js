function captcha(event){
    let response = grecaptcha.getResponse();
    if (response.length === 0){
        alert("Error, verifique el captcha antes de enviar.")
        event.preventDefault();
    }
}
     document.getElementById("form").addEventListener("submit", captcha);                                  