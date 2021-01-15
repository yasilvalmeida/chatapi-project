<?php
if (isset($_GET["idgroup"]) && isset($_GET["name"]) ) {
    $id_group=$_GET["idgroup"];
    $namegroup=$_GET["name"];
    echo '<input  type="text" id="idgroup" style="display:none" value="'.$id_group.'"/>';
}else {
    header('Location: group.php');
}

?>

<!DOCTYPE html>
<?php
require_once("cmp/session.php");
?>
<html>

<head>
    <title>Group  - SMS Sending System</title>
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
                        <h3 class="text-dark mb-0">Name of Group: <?php echo "".$namegroup?></h3>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="dataTable" class="table table-striped table-bordered table-hover display">
                                        <thead>
                                            <tr>
                                            <th>ID</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Status</th>
                                                <th style="text-align: center;">
                                                    <i class="fas fa-id-card-alt"></i> Add/Delete</i>
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
    require("cmp/modal/contact_group.php");
    require("cmp/script.php");
    ?>
    <script src="assets/js/contact_group.js"></script>
</body>

</html>