<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
?>
<html>

    <head>
        <title>Group - SMS Sending System</title>
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
                                <h3 class="text-dark mb-0">Group</h3>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <a class="btn btn-success" href="#" data-toggle="modal" data-target="#addModal">
                                                <i class="fa fa-save fa-sm fa-fw mr-2 text-gray-400"></i>
                                                New 
                                            </a>
                                            <a id="add250Button" class="btn btn-success" href="#" data-toggle="modal" data-target="#add250Modal" disabled>
                                                <i class="fas fa-user-friends fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Add 250
                                            </a>
                                            <a class="btn btn-success" href="#" data-toggle="modal" data-target="#syncModal">
                                                <i class="fas fa-sync-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Sync
                                            </a>
                                            <hr />
                                            <table id="dataTable" class="table table-striped table-bordered table-hover display">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Instance</th>
                                                        <th style="text-align: center;">
                                                            <i class="far fa-address-book"></i>
                                                        </th>
                                                        <th style="text-align: center;">
                                                            <i class="fas fa-eye"></i></i>
                                                        </th>
                                                        <th style="text-align: center;">
                                                            <i class="far fa-trash-alt"></i>
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
            require("cmp/modal/group.php");
            require("cmp/script.php");
        ?>
        <script src="assets/js/group.js"></script>
    </body>

</html>