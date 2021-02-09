<?php
    // Import the needed classes
    require_once("../mysql_pdo.php");
    try {
        // First of all - set a webhook to URL like http://your_website.com/my_webhook_url.php
        // Parse a webhook data
        $data = json_decode(file_get_contents('php://input'), true);
        // Check if there's any data
        if ($data) {
            // Get object from API
            $ack      = $data["ack"][0];
            $messages = $data["messages"];
            $instance = $data["instanceId"];
            // Get status
            if ($ack) {
                $msgId  = $ack["id"];
                $status = $ack["status"];
                // Create the query
                if ($status == "delivered") {
                    $query = "
                            call sp_update_delivered_status('".$msgId."');
                            ";
                }
                if ($status == "viewed") {
                    $query = "
                            call sp_update_viewed_status('".$msgId."');
                            ";
                }
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute the query with parameters
                $statement->execute();
                // Waiting 1 second
                sleep(3);
                // Get affect rows in associative array
                $rows = $statement->fetch();
                if ($rows) {
                    // Return the nesting level of the output buffering mechanism
                    if(ob_get_level() > 0) {
                        // Flush (send) the output buffer and turn off output buffering
                        ob_end_flush();
                    }
                    // Waiting 1 second
                    sleep(2);
                    $error = "Update new status ".$status." for ".$msgId." into MySQL";
                    echo $error;
                    // Create the query
                    if ($status == "delivered") {
                        $query = "
                                call sp_update_delivered_status('".$msgId."');
                                ";
                    }
                    if ($status == "viewed") {
                        $query = "
                                call sp_update_viewed_status('".$msgId."');
                                ";
                    }
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with parameters
                    $statement->execute();
                    // Get affect rows in associative array
                    $rows = $statement->fetch();

                }
                else {
                    $error = "Status ".$status." not updated!";
                    echo $error;
                    // Error Query
                    $query = 
                    "
                        insert into tb_error(error)
                        values('".$error."');
                    ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with parameters
                    $statement->execute();
                    // Get affect rows in associative array
                    $rows = $statement->fetch();
                }
                /* // Create the query
                $query = '
                        select id
                        from tb_message
                        where msgId = "'.$msgId.'";
                        ';
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute the query with parameters
                $statement->execute();
                // Get affect rows in associative array
                $rows = $statement->fetch(); */
                /* if ($rows) {
                    // Update the status in MySQL Database
                    $row = $rows[0];
                    $id = $row["id"];
                    
                } */
                /* else {
                    $error = "Message not found!";
                    echo $error;
                    // Error Query
                    $query = 
                            "
                                insert into tb_error(error)
                                values('".$error."');
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with parameters
                    $statement->execute();
                    // Get affect rows in associative array
                    $rows = $statement->fetch();
                } */
            }
            // Add new message
            if ($messages) {
                // Set parameters
                $params = array(
                    ':instance'    => $instance
                );
                // Create the query
                $query = '
                        select id
                        from tb_instance
                        where instance = :instance;
                        ';
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute the query with parameters
                $statement->execute($params);
                // Get affect rows in associative array
                $rows = $statement->fetch();
                if ($rows) {
                    $instanceId = $rows["id"];
                    foreach($messages as $message) {
                        $msgId         = $message["id"];
                        $body          = $message["body"];
                        $type          = $message["type"];
                        $senderName    = $message["senderName"];
                        $fromMe        = $message["fromMe"];
                        $author        = $message["author"];
                        $sentAt        = date('Y/m/d H:i:s', $message["time"]);
                        $chatId        = $message["chatId"];
                        $messageNumber = $message["messageNumber"];
                        $params = array(
                            ':msgId'         => $msgId,
                            ':body'          => $body,
                            ':type'          => $type,
                            ':senderName'    => $senderName,
                            ':fromMe'        => $fromMe,
                            ':author'        => $author,
                            ':sentAt'          => $sentAt,
                            ':chatId'        => $chatId,
                            ':messageNumber' => $messageNumber,
                            ':instanceId'    => $instanceId
                        );
                        $query = "
                                call sp_new_message(:msgId, :body, :type, :senderName, :fromMe, :author, :sentAt, :chatId, :messageNumber, :instanceId)
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with parameters
                        $statement->execute($params);
                        // Get affect rows in associative array
                        $rows = $statement->fetch();
                        if ($rows) {
                            // Return the nesting level of the output buffering mechanism
                            if(ob_get_level() > 0) {
                                // Flush (send) the output buffer and turn off output buffering
                                ob_end_flush();
                            }
                            // Waiting 1 second
                            sleep(1);
                            $error = "Insert new message for ".$msgId." into MySQL";
                            echo $error;
                            // Error Query
                            $query = 
                                    "
                                        insert into tb_error(error)
                                        values('".$error."');
                                    ";
                            // Create object to connect to MySQL using PDO
                            $mysqlPDO = new MySQLPDO();
                            // Prepare the query
                            $statement = $mysqlPDO->getConnection()->prepare($query);
                            // Execute the query with parameters
                            $statement->execute();
                            // Get affect rows in associative array
                            $rows = $statement->fetch();
                        }
                        else {
                            $error = "Message not inserted!";
                            echo $error;
                            // Error Query
                            $query = 
                                    "
                                        insert into tb_error(error)
                                        values('".$error."');
                                    ";
                            // Create object to connect to MySQL using PDO
                            $mysqlPDO = new MySQLPDO();
                            // Prepare the query
                            $statement = $mysqlPDO->getConnection()->prepare($query);
                            // Execute the query with parameters
                            $statement->execute();
                            // Get affect rows in associative array
                            $rows = $statement->fetch();
                        }
                    }
                }
                else {
                    $error = "Instance not found";
                    echo $error;
                    // Error Query
                    $query = 
                            "
                                insert into tb_error(error)
                                values('".$error."');
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with parameters
                    $statement->execute();
                    // Get affect rows in associative array
                    $rows = $statement->fetch();
                }
            }
        }
        else {
            // Error Query
            $query = 
                    "
                        insert into tb_error(error)
                        values('".print_r($data)."');
                    ";
            // Create object to connect to MySQL using PDO
            $mysqlPDO = new MySQLPDO();
            // Prepare the query
            $statement = $mysqlPDO->getConnection()->prepare($query);
            // Execute the query with parameters
            $statement->execute();
            // Get affect rows in associative array
            $rows = $statement->fetch();
        }
    } catch (PDOException $e) {
        die("Error message" . $e->getMessage());
    }
?>