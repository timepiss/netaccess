fName=document.getElementById("username2");
pass=document.getElementById("password2");
invi=document.getElementById("invi");
button=document.getElementById("save");
var c=1;
function saveldap(){
	var username=document.getElementById("username2").value;
	var time=$('input[name="time"]:checked').val();
	var rval=0;
    if(document.getElementById('c1').checked){
        rval=document.getElementById("refreshVal").value;
        $("#refreshVal").prop('disabled', false);
        $("#refreshType").prop('disabled', false);
    }
    else{
        $("#refreshVal").prop('disabled', true);
        $("#refreshType").prop('disabled', true);
    }
	var rtype=$('#refreshType').val();
	var password=document.getElementById("password2").value;
        login(username,time,password,rval,rtype);
}
function login(username,time,password,rval,rtype){
	$.post("https://netaccess.iitm.ac.in/account/login",
	{userLogin:username,
	userPassword:password},
	function(data,status){
		var checkLogin = data.search("Login failed");
		if(checkLogin != -1){
		invi.innerHTML+="<div class='error'>Save failed...Please check your credentials</div>";
		}
		else{
		chrome.storage.sync.set({'roll':username,'pass':password,'time':time, 'rval':rval, 'rtype':rtype}, function() {
		});
		invi.innerHTML+="<div class='success'>Save Successful!</div>";
		show();
		}
	});
}
function show(){
	chrome.storage.sync.get({roll:'',pass:'',time:'',rval:'5', rtype:'60'}, function(result) {
		if(result.time == 1){
            $("#r1").prop("checked", true);
            $("#r2").prop("checked", false);
        }
		else{
            $("#r2").prop("checked", true);
            $("#r1").prop("checked", false);
        }
        $("#refreshType").val(result.rtype);
        if(result.rval==0){
            document.getElementById("refreshVal").value = 5;
            $('#c1').prop('checked', false);
            $("#refreshVal").prop('disabled', true);
            $("#refreshType").prop('disabled', true);
        }
        else{
            document.getElementById("refreshVal").value = result.rval;
            $('#c1').prop('checked', true);
            $("#refreshVal").prop('disabled', false);
            $("#refreshType").prop('disabled', false);
        }
		document.getElementById("username2").value = result.roll;
		document.getElementById("password2").value = result.pass;
	});
}
function check(){
	invi.innerHTML="";
	fName.style.borderColor="#dadada";
	pass.style.borderColor="#dadada";
	if(fName.value==""){
		fName.style.borderColor="red";
		invi.innerHTML+="<div class='error'>Please enter Username</div>";
		c=0;
	}
	if(pass.value==""){
		pass.style.borderColor="red";
		invi.innerHTML+="<div class='error'>Please enter Password</div>";
		c=0;
	}
	if(c){
		saveldap();
	}
	else c=1;
}
window.onload = function() {
    show();
	document.getElementById("save").onclick = function() {check();}
    $('#c1').change(function(){
        if(this.checked){
            $("#refreshVal").prop('disabled', false);
            $("#refreshType").prop('disabled', false);
        }
        else{
            $("#refreshVal").prop('disabled', true);
            $("#refreshType").prop('disabled', true);
        }
    });
}
