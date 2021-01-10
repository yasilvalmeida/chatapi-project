<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
?>
<html>

    <head>
        <title>User - SMS Sending System</title>
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
                                <h3 class="text-dark mb-0">Users</h3>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <a class="btn btn-success" href="#" data-toggle="modal" data-target="#addModal">
                                                <i class="fa fa-save fa-sm fa-fw mr-2 text-gray-400"></i>
                                                New
                                            </a>
                                            <hr />
                                            <table id="dataTable" class="table table-striped table-bordered table-hover display">
                                                <thead>
                                                    <tr>
                                                        <th>Email</th>
                                                        <th>Password</th>
                                                        <th>Username</th>
                                                        <th>Access</th>
                                                        <th>Active</th>
                                                        <th style="text-align: center;">
                                                            <i class='fas fa-edit'> Modificar</i>
                                                        </th>
                                                        <th style="text-align: center;">
                                                            <i class="far fa-trash-alt"> Eliminar</i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
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
            require("cmp/modal/user.php");
            require("cmp/script.php");
        ?>
        <script src="assets/js/user.js"></script>
    </body>

</html>