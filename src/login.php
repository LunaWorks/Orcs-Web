<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Admin login</title>
    <meta charset="utf-8"> 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

	<!-- Latest compiled JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	
	
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen"> 
	<script type="text/javascript" src="jquery-1.11.3-jquery.min.js"></script>
	<script type="text/javascript" src="validation.min.js"></script>
	<link href="style.css" rel="stylesheet" type="text/css" media="screen">
	<script type="text/javascript" src="script.js"></script>

	      <style>
         body {
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #000000;
			color: white;
			text-align: center;
         }
		 .form{
		 max-width: 50%;
		 display:inline-block;
		 text-align: center;
		 }
		 h1{
		 font-weight: bold;
		 font-family: "Arial Black", Gadget, sans-serif	
		 }
		 
      </style>
  </head>
  <body>
  
  <h1>Admin login screen </h1> <br />
  
  <div class="form">
  <form>
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" placeholder="Email: admin1@admin.com" name="user_email" id="user_email">
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="password" placeholder="password=1234">
  </div>
  <div class="checkbox">
    <label><input type="checkbox"> Remember me</label>
  </div>
  
   	
		
  <button type="submit" class="btn btn-default">Submit</button>
</form>
</div> <!-- form class -->



<div class="signin-form">

 <div class="container">
     
        
       <form class="form-signin" method="post" id="login-form">
      
        <h2 class="form-signin-heading">Log In to WebApp.</h2><hr />
        
        <div id="error">
        <!-- error will be shown here ! -->
        </div>
        
        <div class="form-group">
        <input type="email" class="form-control" placeholder="Email address" name="user_email" id="user_email" />
        <span id="check-e"></span>
        </div>
        
        <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" name="password" id="password" />
        </div>
       
      <hr />
        
        <div class="form-group">
            <button type="submit" class="btn btn-default" name="btn-login" id="btn-login" onclick="script.js">
      <span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In
   </button> 
        </div>  
      
      </form>

    </div>
    
</div>


  </body>
</html>