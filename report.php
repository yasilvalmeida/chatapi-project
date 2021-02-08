<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
    $access = $_SESSION[$_SESSION['views'].'access'];
    if ($access == 1) {
        header('Location: main.php');
    }
?>
<html>

    <head>
        <title>Report - SMS Sending System</title>
        <?php
            require("cmp/head.php");
        ?>
        <link rel="stylesheet" href="assets/css/multi-select.css" />
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
                                <h3 class="text-dark mb-0">Report</h3>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <form class="user">
                                                <div class="form-group">
                                                    <label>Instance</label>
                                                    <select id='instance_snd' class='form-control'>
                                                    </select>
                                                    <hr>
                                                    <table id="dataTable" class="table table-striped table-bordered table-hover display">
                                                        <thead>
                                                            <tr>
                                                                <th>Sender Name</th>
                                                                <th>Author</th>
                                                                <th>From Me</th>
                                                                <th>Sent At</th>
                                                                <th>Delivered At</th>
                                                                <th>Viewed At</th>
                                                                <th style="text-align: center;">
                                                                    <i class="far fa-eye"></i>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="bodyContent"></tbody>
                                                    </table>
                                                    <hr />
                                                    <div id="report_state" class="d-flex justify-content-center" role="alert">
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <!-- /.card-body -->
                                        <div class="card-footer">
                                        </div>
                                    </div>
                                    <!-- /.card -->
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
            require("cmp/modal/confirmation.php");
            require("cmp/script.php");
        ?>
        <script src="assets/js/report.js"></script>
    </body>

</html>