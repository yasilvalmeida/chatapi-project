<!doctype html>
<html lang="en">

<head>
  <title>API | Autenticação</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" type="image/png" href="../img/global/favicon.ico" />
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="sem_net/bootstrap.min.css" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free-5.13.0-web/css/all.css">
  <!-- User Defined CSS -->
  <link rel="stylesheet" href="css/login.css" />
</head>

<body class="text-center">
  <div class="form-signin">

    <div class="card">
      <div class="login-logo">
        <img src="img/api.png" width="140" />
        <h3>SMS Sending Management System</h3>

      </div>
      <div class="card-body login-card-body">
        <p class="login-box-msg">User Authentication</p>
        <form class="user">
          <div class="input-group mb-4">
            <input id="email_login" type="text" class="form-control" placeholder="Email">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-4">
            <input id="password_login" type="password" class="form-control" placeholder="Password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <!--  <div class="col-lg-12 " style="text-align:right;margin:5px;">
                <a href="javascript:recoverShow()" >Recuperar palavra passe </a>
              </div>
              /.col -->
            <div class="col-12">
              <center>
                <table>
                  <tr>

                    <td><a href="javascript:recoverShow()" class="btn btn-warning btn-block" tabindex="3"><b>Recover password</b></a></td>
                    <td>&nbsp;&nbsp;</td>
                    <td><a href="javascript:login()" class="btn btn-success btn-block" tabindex="3"><b>Authentication</b></a></td>
                  </tr>
                </table>
              </center>


            </div>
            <!-- /.col -->
          </div>
          <hr />
          <div id="login_state" class="d-flex justify-content-center" role="alert">
          </div>
        </form>
      </div>
      <div class="card-body recover-card-body" style="display:none;">
        <p class="login-box-msg">Account Recovery</p>
        <form class="user">
          <div class="input-group mb-4">
            <input id="username_login" type="text" class="form-control" placeholder="Email">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="row">
 <!--
            <div class="col-lg-12 " style="text-align:right;margin:5px;">
              <a href="javascript:loginShow()">Autenticação</a>
            </div>
            /.col -->
            <div class="col-12">
              
            <center>
              <table>
                <tr>
                  <td><a href="javascript:loginShow()" class="btn btn-warning btn-block" tabindex="3"><b>Go to login</b></a></td>
                  <td>&nbsp;&nbsp;</td>
                  <td><a href="#" class="btn btn-success btn-block" tabindex="3"><b>Recovery</b></a></td>
                </tr>
              </table>
            </center>




            </div>
            <!-- /.col -->
          </div>
          <hr />
          <div id="recover_state" class="d-flex justify-content-center" role="alert">
          </div>
        </form>
      </div>

    </div>




    <?php
    require_once("cmp/footer.php");
    ?>
  </div>

  <!-- jQuery first, then Popper.js, then Bootstrap JS 
  <script src="sem_net/jquery-3.5.1.min.js"></script>
  <script src="sem_net/bootstrap.min.js"></script>-->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <!-- User Defined    JavaScript -->
  <script src="js/login.js"></script>
</body>

</html>