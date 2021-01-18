<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
    if (!isset($_GET["id"])) {
        header('Location: group.php');
    }
    else {
        $group_id = $_GET["id"];
        echo "<input id='group_id' value='".$group_id."' type='hidden' />";
    }
?>
<html>

    <head>
        <title>Group Participants - SMS Sending System</title>
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
                                <h3 id="title" class="text-dark mb-0"></h3>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <table id="dataTable" class="table table-striped table-bordered table-hover display">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Phone</th>
                                                        <th>Status</th>
                                                        <th style="text-align: center;">
                                                            <i class='far fa-save'></i>
                                                        </th>
                                                        <th style="text-align: center;">
                                                            <i class='far fa-trash-alt'></i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                            <hr>
                                            <a class="btn btn-primary" href="group.php">
                                                <i class="fas fa-arrow-left fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Back 
                                            </a>
                                        </div>
                                        <!-- /.card-body -->
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
            require("cmp/modal/group-contact.php");
            require("cmp/script.php");
        ?>
        <script src="assets/js/group-contact.js"></script>
    </body>

</html>