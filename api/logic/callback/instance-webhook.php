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
                // Set the data parameters
                $data = array(
                    ':msgId'
                );
                // Create the query
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
                $rows = $statement->fetch();
                if ($rows) {
                    // Update the status in MySQL Database
                    $row = $rows[0];
                    $id = $row["id"];
                    // Create the query
                    if ($status == "delivered") {
                        $query = "
                                call sp_update_delivered_status(".$id.");
                                ";
                    }
                    if ($status == "viewed") {
                        $query = "
                                call sp_update_viewed_status(".$id.");
                                ";
                    }
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with parameters
                    $statement->execute();
                    // Get affect rows in associative array
                    $rows = $statement->fetch();
                    if ($rows) {
                        // Return the nesting level of the output buffering mechanism
                        if(ob_get_level() > 0) {
                            // Flush (send) the output buffer and turn off output buffering
                            ob_end_flush();
                        }
                        echo "Update new status ".$status." for ".$msgId." into MySQL";
                    }
                    else {
                        echo "Status ".$status." not updated!";
                    }
                }
                else {
                    echo "Message not found!";
                }
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
                            echo "Insert new message for ".$msgId." into MySQL";
                        }
                        else {
                            echo "Message not inserted!";
                        }
                    }
                }
                else {
                    echo "Instance not found";
                }
            }
        }
    } catch (PDOException $e) {
        die("Error message" . $e->getMessage());
    }
?>