<!DOCTYPE html>
<?php
    require_once("cmp/session.php");
?>
<html>

    <head>
        <title>Settings - SMS Sending System</title>
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
                                <h3 class="text-dark mb-0">Settings</h3>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <form class="user">
                                                <div class="form-group">
                                                    <label for="URL">Please paster this webhook URL if empty</label>
                                                    <p>http://portfolio.ybytesi.com/chatapi/api/logic/callback/instance-webhook.php</p>
                                                    <label>Instance</label>
                                                    <select id='instance_snd' class='form-control'>
                                                    </select>
                                                    <hr>
                                                    <table>
                                                        <tr>
                                                            <td colspan="2">
                                                                <label for="ackNotificationsOn">Ack Notification On</label>
                                                                <input type="checkbox" name="ackNotificationsOn" id="ackNotificationsOn" title="Turn on/off ack (message delivered and message viewed notifications." />
                                                                <label for="instanceStatuses">Instance Status</label>
                                                                <input type="checkbox" name="instanceStatuses" id="instanceStatuses" title="Turn on/off collecting instance status changing history." />
                                                                <label for="webhookStatuses">Webhook Status</label>
                                                                <input type="checkbox" name="webhookStatuses" id="webhookStatuses" title="Turn on/off collecting messages webhooks statuses." />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label for="sendDelay ">Send Delay (in seconds)</label>
                                                            </td>
                                                            <td>
                                                                <input type="number" name="sendDelay" id="sendDelay" min="0" title="Delay in seconds between receive request and sending message." />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label for="sendDelay ">Webhook URL</label>
                                                            </td>
                                                            <td>
                                                                <input type="text" name="webhookUrl" id="webhookUrl" title="Http or https URL for receiving notifications." />
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <hr />
                                                    <div id="setting_state" class="d-flex justify-content-center" role="alert">
                                                    </div>
                                                    <hr />
                                                </div>
                                            </form>
                                        </div>
                                        <div class="card-footer">
                                            <a class="btn btn-success" href="javascript:saveSettings()">Save</a>
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
        <script src="assets/js/setting.js"></script>
    </body>

</html>