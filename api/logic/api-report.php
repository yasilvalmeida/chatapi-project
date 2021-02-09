<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/report.php");
    // API for Report CRUD Class
    class ReportAPI {
        /* Report Actions Begin */
        /* Retrieve all messages on the database */
        public function fetchAllMessage() {
            try {
                if (isset($_POST["instanceId"])) {
                    // Get the instance id from POST request to check
                    $check_data = array(
                        ':instanceId' => $_POST["instanceId"]
                    );
                    // Select all users
                    $query = "
                            select *
                            from tb_message tm
                            where tm.instanceId = :instanceId
                            order by sentAt desc
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query without paramters
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $rows = $statement->fetchAll();
                    // Foreach row in array
                    foreach ($rows as $row) {
                        // Create a Message object
                        $message = new Message($row);
                        //Create datatable row
                        $tmp_data[] = array(
                            $message->SenderName(),
                            $message->Author(),
                            '<div style="text-align:center">'.$message->FromMe().'</div>',
                            $message->SentAt(),
                            $message->DeliveredAt(),
                            $message->ViewedAt(),
                            "<div style='text-align:center'><a href='javascript:view(".$message->getId().")' class='btn btn-warning'><i class='fas fa-eye'></i></a></div>"
                        );
                    }
                    // Export into DataTable json format if there's any record in $tmp_data
                    if (isset($tmp_data) && count($tmp_data) > 0) {
                        $data = array(
                            "data" => $tmp_data
                        );
                    } else {
                        $data = array(
                            "data" => array()
                        );
                    }
                    return $data;
                }
                else  {
                    $data[] = array('result' => 'Missing instance id parameter!');
                }
                
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Retrieve single message on the database */
        public function fetchSingleMessage() {
            try {
                if (isset($_POST["id"])) {
                    // Get the message id from POST request to check
                    $check_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Select all users
                    $query = "
                            select *
                            from tb_message tm
                            where tm.id = :id
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query without paramters
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch();
                    // Get the object
                    if ($row) {
                        // Create a Message object
                        $message = new Message($row);
                        //Create datatable row
                        $tmp_data[] = $message;
                    }
                    // Export into DataTable json format if there's any record in $tmp_data
                    if (isset($tmp_data) && count($tmp_data) > 0) {
                        $data = array(
                            "data" => $tmp_data
                        );
                    } else {
                        $data = array(
                            "data" => array()
                        );
                    }
                    return $data;
                }
                else  {
                    $data[] = array('result' => 'Missing id parameter!');
                }
                
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Contact Actions End */
    }
?>