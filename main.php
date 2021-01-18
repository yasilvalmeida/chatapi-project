<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
?>
<html>

    <head>
        <title>Welcome - SMS Sending System</title>
        <?php
            require("cmp/head.php");
        ?>
    </head>

    <body id="page-top">
        <div id="wrapper">
            <?php
                require("cmp/nav.php");
            ?>
                <div class="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <?php
                            require("cmp/header.php");
                        ?>
                        <div class="container-fluid">
                            <div class="d-sm-flex justify-content-between align-items-center mb-4">
                                <h3 class="text-dark mb-0">Welcome</h3>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card shadow border-left-primary py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col mr-2">
                                                    <div class="text-dark font-weight-bold h5 mb-0">
                                                        <p>Welcome to SMS System</p>
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
                    require("cmp/footer.php");
                ?>
            </div>
            <a class="border rounded d-inline scroll-to-top" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>
        </div>
        <?php
            require("cmp/script.php");
        ?>
        <script src="assets/js/dashboard.js"></script>
    </body>

</html>