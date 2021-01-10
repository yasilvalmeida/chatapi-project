<!DOCTYPE html>
<html>

<head>
    <title>Forgotten Password - SMS Sending System</title>
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
                              <center>
                                <img src="assets/img/logo.png" alt="Girl in a jacket" width="340" height="300" style="position:relative;margin: 10px;top:19px;">
                              </center>
                             </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h4 class="text-dark mb-2">Forgot Your Password ?</h4>
                                        <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
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
                                        <button class="btn btn-primary btn-block text-white"type="submit">Reset Password
                                        </button>
                                    </form>
                                    <div class="text-center">
                                        </br>
                                        <a class="small" href="index.php"><b>Already have an account ? Login!</b></a>
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
    <script src="assets/js/forgot-password.js"></script>
</body>

</html>