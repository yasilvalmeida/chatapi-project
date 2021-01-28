<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/group-contact.php");
    // API for Contact CRUD Class
    class GroupContactAPI {
        /* Group Contact Actions Begin */
        /* Retrieve all contact by group */
        public function fetchAllGroupContact() {
            try {
                if (isset($_POST["group_id"])) {
                    // Get the instance id from POST request to check
                    $check_data = array(
                        ':group_id' => $_POST["group_id"]
                    );
                    $query = "
                            select tc.id, tc.name, tc.phone, ifnull(tgc.id, 0) as status 
                            FROM tb_group tg
                            join tb_contact tc on tg.instance_id = tc.instance_id
                            left join tb_group_contact tgc on tg.id = tgc.group_id AND tc.id = tgc.contact_id
                            where tg.id = :group_id
                            order by tc.name, tc.phone
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter token
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $rows = $statement->fetchAll();
                    // Foreach row in array
                    foreach ($rows as $row) {
                        // Create a Group Contact Select object
                        $groupContact = new GroupContact($row);
                        //Create datatable row
                        $tmp_data[] = array(
                            $groupContact->getName(),
                            $groupContact->getPhone(),
                            $groupContact->getStatus() == "0" ? '<div style="text-align:center"><i class="fas fa-times" style="color:red"></i></div>' : '<div style="text-align:center"><i class="fas fa-check" style="text-align: center; color:green;"></i></div>',
                            $groupContact->getStatus() != "0" ? '' : "<div style='text-align:center'><a href='javascript:insert(".json_encode($groupContact).")' class='btn btn-success'><i class='fas fa-save'></i></a></div>",
                            $groupContact->getStatus() == "0" ? '' : "<div style='text-align:center'><a href='javascript:remove(".json_encode($groupContact).")' class='btn btn-danger'><i class='fas fa-trash-alt'></i></a></div>"
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
                } else{
                    $data[] = array('result' => 'Missing group_id parameter!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Insert group contact */
        public function insertGroupContact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["group_id"]) && isset($_POST["contact_id"])) {
                    // Get the group id and contact id from POST request to insert or remove
                    $form_data = array(
                        ':group_id'   => $_POST["group_id"],
                        ':contact_id' => $_POST["contact_id"],
                    );
                    // Checking data
                    $check_data = array(
                        ':group_id'   => $_POST["group_id"],
                        ':contact_id' => $_POST["contact_id"],
                    );
                    // Check for existent contact in Database
                    $query = "
                            select id from
                            tb_group_contact 
                            where group_id = :group_id and contact_id = :contact_id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameters
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        $data[] = array('result' => 'This record already exists!');
                    } else {
                        // Create a SQL query to insert an new contact with all parameters
                        $query = "
                                insert tb_group_contact(group_id, contact_id)
                                values(:group_id, :contact_id);
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter token, password and access
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            $data[] = array('result' => '1');
                        } else {
                            $data[] = array('result' => 'No operations performed on the database!');
                        }
                    }
                } 
                else {
                    // Check for missing parameters
                    if (!isset($_POST["group_id"]) && !isset($_POST["contact_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } else if (!isset($_POST["group_id"])) {
                        $data[] = array('result' => 'Missing group_id parameter!');
                    } else {
                        $data[] = array('result' => 'Missing contact_id parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Remove group contact */
        public function removeGroupContact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["group_id"]) && isset($_POST["contact_id"])) {
                    // Get the group id and contact id from POST request to insert or remove
                    $form_data = array(
                        ':group_id'   => $_POST["group_id"],
                        ':contact_id' => $_POST["contact_id"],
                    );
                    // Checking data
                    $check_data = array(
                        ':group_id'   => $_POST["group_id"],
                        ':contact_id' => $_POST["contact_id"],
                    );
                    // Check for existent contact in Database
                    $query = "
                            select id from
                            tb_group_contact 
                            where group_id = :group_id and contact_id = :contact_id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameters
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if (!$row) {
                        $data[] = array('result' => 'Record not found!');
                    } else {
                        // Create a SQL query to insert an new contact with all parameters
                        $query = "
                                delete from tb_group_contact
                                where group_id = :group_id and contact_id = :contact_id
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter token, password and access
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            $data[] = array('result' => '1');
                        } else {
                            $data[] = array('result' => 'No operations performed on the database!');
                        }
                    }
                } 
                else {
                    // Check for missing parameters
                    if (!isset($_POST["group_id"]) && !isset($_POST["contact_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } else if (!isset($_POST["group_id"])) {
                        $data[] = array('result' => 'Missing group_id parameter!');
                    } else {
                        $data[] = array('result' => 'Missing contact_id parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Group Contact Actions End */
    }
?>