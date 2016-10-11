<?php
session_start();
if(isset($_SESSION['user_session'])!="")
{
	header("Location: landing.php");
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Admin login</title>
    <meta charset="utf-8"> 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<!-- Custom CSS -->
	<link rel="stylesheet" href="img/style.css">

	<!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

	<!-- Latest compiled JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	<!-- Ajax validation -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min.js"></script>

	<!-- custom JS -->
	<script type="text/javascript" src="img/script.js"></script>

  </head>
  <body>
  
<div class="header">    <h1>Admin login </h1> <hr /> </div>
        <div id="error-frame" class="error-frame">
		<div id="error" class="error">
        <!-- error will be shown here ! -->
        </div>
		</div>
		
  <div class="form">
  <form class="form-signin" method="post" id="login-form">
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" placeholder="Email: admin1@admin.com" name="user_email" id="user_email">
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="password" name="password" placeholder="password=1234">
  </div>
  <div class="checkbox">
    <label><input type="checkbox"> Remember me</label>
  </div>
  
        <div class="form-group">
            <button type="submit" class="btn btn-default" name="btn-login" id="btn-login" class="btn-login">
      <span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In
			</button> 
      </div>   
  
</form>
</div> <!-- form class -->




  </body>
</html>