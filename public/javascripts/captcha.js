function captcha(event){
    let response = grecaptcha.getResponse();
    if (response.length === 0){
        console.log("error")
        event.preventDefault();
    }
}
     document.getElementById("form").addEventListener("submit", captcha);                                  