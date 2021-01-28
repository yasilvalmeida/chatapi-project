<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
    $access = $_SESSION[$_SESSION['views'].'access'];
    if ($access == 0) {
        header('Location: main.php');
    }
?>
<html>

    <head>
        <title>Send - SMS Sending System</title>
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
                                <h3 class="text-dark mb-0">Send New Message</h3>
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
                                                </div>
                                                <div class="form-group">
                                                    <label>Message</label>
                                                    <textarea id="message_snd" class="form-control" placeholder="Type a message">
                                                    </textarea>
                                                </div>
                                                <hr />
                                                <label for="image_snd" class="form-label">
                                                    <img src="assets/img/camera.png" width="40" height="40">
                                                </label>
                                                <label for="movie_snd" class="form-label">
                                                    <img src="assets/img/movie.png" width="40" height="40">
                                                </label>
                                                <label for="audio_snd" class="form-label">
                                                    <img src="assets/img/audio.png" width="40" height="40">
                                                </label>
                                                <label for="pdf_snd" class="form-label">
                                                    <img src="assets/img/pdf.png" width="43" height="40">
                                                </label>
                                                <input  id="file_snd" class="form-control" type="file" accept="image/*,application/pdf,audio/ogg,video/*" /><br>

                                                <hr>
                                                
                                                <select id="contacts_snd" multiple style="display: none;"></select>

                                                <select id="groups_snd" multiple style="display: none;"></select>

                                                <hr />
                                                <div id="send_state" class="d-flex justify-content-center" role="alert">
                                                </div>
                                                <hr />
                                                <div id="contacts_state" class="d-flex justify-content-center" role="alert"></div>
                                                <div id="groups_state" class="d-flex justify-content-center" role="alert"></div>
                                                <div id="contacts_file_state" class="d-flex justify-content-center" role="alert"></div>
                                                <div id="groups_file_state" class="d-flex justify-content-center" role="alert"></div>
                                            </form>
                                        </div>
                                        <div class="card-footer">
                                            <a class="btn btn-success" href="javascript:send()">Send</a>
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
            require("cmp/script.php");
        ?>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
        <script src="assets/js/multi-select.js"></script>
        <script src="assets/js/send-message.js"></script>
    </body>

</html>