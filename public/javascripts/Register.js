/**
 * Created by user on 9/14/2017.
 */
function Register(){
var userName = $("#userName").val();
var password = $("#password").val();
    if(userName == ""){
        alert("username is empty");
        return false;
    }else if(password == ""){
        alert("password is empty");
        return false;
    }
    var repeatPassword = $("#password").val();
    if(password == repeatPassword){
        userObj = {};
        userObj["userName"] = userName;
        userObj["password"] = password;

        $.post("/registeration", {
            userName : userName,password:password
        }).done(function(response) {
              var status = response.status;
              if(status == "success"){
                  window.location.href="/"
              }else{
                  alert("Invalid username or password");
                  return false;
              }

        });
    }else{
        alert("password does not matches");
        return false;
    }

}


function login(){
    var userName = $("#userId").val();
    var password = $("#userPassword").val();
    if(userName == ""){
        alert("username is empty");
        return false;
    }else if(password == ""){
        alert("password is empty");
        return false;
    }


        $.post("/login", {
            userName : userName,password:password
        }).done(function(response) {
            var status = response.status;
            console.log(status);
            if(status == "success"){
                window.location.href="/dashboard"
            }
            else{
                alert("Invalid username or password");
                return false;
            }

        });


}


function fileUpload(){
    var file = $("#file").val();
    //file = file[0];
    $.post("/fileUpload", {
        file:file
    }).done(function(response) {

    });
}



