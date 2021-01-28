<!DOCTYPE html>
<html>

    <head>
        <title>Login - SMS Sending System</title>
        <?php
            require("cmp/head.php");
        ?>
    </head>

    <body class="bg-gradient-primary">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-9 col-lg-12 col-xl-10">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-flex">
                                    <div class="flex-grow-1 bg-login-image" >
                                      <center>
                                          <img src="assets/img/logo.png" alt="Girl in a jacket" width="350" height="330" style="position:relative;top:19px">
                                      </center>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4">Welcome SMS Sending System</h4>
                                        </div>
                                        <form class="user">
                                            <div class="input-group mb-4">
                                                <input class="form-control form-control" type="email" id="email" aria-describedby="emailHelp" placeholder=" Email Address..." name="email">
                                                <div class="input-group-append">
                                                    <div class="input-group-text">
                                                        <span class="fas fa-envelope"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="input-group mb-4">
                                                <input class="form-control form-control" type="password" id="password" placeholder="Password" name="password">
                                                <div class="input-group-append">
                                                    <div class="input-group-text">
                                                    <span class="fas fa-lock"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="javascript:login()" class="btn btn-primary btn-block text-white ">Login</a>
                                            <hr>
                                            <div id="login_state" class="d-flex justify-content-center" role="alert"></div>
                                        </form>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.php"><b>Forgot Password ?</b></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
            require("cmp/script.php");
        ?>
        <script src="assets/js/index.js"></script>
    </body>

</html>