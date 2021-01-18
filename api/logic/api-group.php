<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/group.php");
    // API for Group CRUD Class
    class GroupAPI {
        /* Retrieve all groups on the database */
        public function fetchAllGroup() {
            try {
                // Select all groups
                $query = "
                        select tg.id, tg.name, tg.link, tg.chat_id, tg.instance_id, ti.instance, ti.token
                        from tb_group tg
                        join tb_instance ti on tg.instance_id = ti.id
                        ";
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute the query without paramters
                $statement->execute();
                // Get affect rows in associative array
                $rows = $statement->fetchAll();
                // Foreach row in array
                foreach ($rows as $row) {
                    // Create a Group object
                    $group = new Group($row);
                    //Create datatable row
                    $tmp_data[] = array(
                        $group->getName(),
                        $group->getInstance(),
                        "<div style='text-align:center'><a href='group-contact.php?id=".$group->getId()."' class='btn btn-primary'><i class='far fa-address-book'></i></a></div>",
                        "<div style='text-align:center'><a href='javascript:view(".json_encode($group).")' class='btn btn-warning'><i class='fas fa-eye'></i></a></div>",
                        "<div style='text-align:center'><a href='javascript:remove(".json_encode($group).")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
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
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Retrieve single group on the database */
        public function fetchSingleGroup() {
            try {
                if (isset($_POST["group_id"])) {
                    // Get the instance id from POST request to check
                    $check_data = array(
                        ':group_id' => $_POST["group_id"]
                    );
                    // Select all groups
                    $query = "
                            select tg.id, tg.name, tg.link, tg.chat_id, tg.instance_id, ti.instance, ti.token
                            from tb_group tg
                            join tb_instance ti on tg.instance_id = ti.id
                            where tg.id = :group_id
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
                        // Create a Group object
                        $group = new Group($row);
                        //Create datatable row
                        $tmp_data[] = $group;
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
                }
                else {
                    $data[] = array('result' => 'Missing group#_id parameter!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Insert new group */
        public function insertGroup() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["name"]) && isset($_POST["link"]) && isset($_POST["chat_id"]) && isset($_POST["instance_id"])) {
                    // Get the name from POST request to check
                    $check_data = array(
                        ':name' => $_POST["name"]
                    );
                    // Get the name, link, chat id and instance id from POST request to insert
                    $form_data = array(
                        ':name'        => $_POST["name"],
                        ':link'        => $_POST["link"],
                        ':chat_id'     => $_POST["chat_id"],
                        ':instance_id' => $_POST["instance_id"],
                    );
                    // Check for existent group in Database
                    $query = "
                            select id from
                            tb_group 
                            where name =: name_group
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
                        // Create a SQL query to insert an new group with all parameters
                        $query = "
                                insert tb_group(name, link, chat_id, instance_id) 
                                values (:name, :link, :chat_id, :instance_id);
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed all parameters
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            $data[] = array('result' => '1');
                        } else {
                            $data[] = array('result' => 'No operations performed on the database!');
                        }
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["name"]) && !isset($_POST["link"]) && !isset($_POST["chat_id"]) && !isset($_POST["instance_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    }
                    else if (!isset($_POST["name"])) {
                        $data[] = array('result' => 'Missing name parameter');
                    }
                    else if (!isset($_POST["link"])) {
                        $data[] = array('result' => 'Missing link parameter');
                    }
                    else if (!isset($_POST["chat_id"])) {
                        $data[] = array('result' => 'Missing chat_id parameter');
                    }
                    else {
                        $data[] = array('result' => 'Missing instance_id parameters');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Update new group */
        public function updateGroup() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["group_id"]) && isset($_POST["link"]) && isset($_POST["chat_id"])) {
                    // Get the name, link, chat id and instance id from POST request to insert
                    $form_data = array(
                        ':id'      => $_POST["group_id"],
                        ':link'    => $_POST["link"],
                        ':chat_id' => $_POST["chat_id"],
                    );
                    // Create a SQL query to insert an new group with all parameters
                    $query = "
                            update tb_group
                            set link = :link, chat_id = :chat_id
                            where id = :id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed all parameters
                    $statement->execute($form_data);
                    // Check if any affected row
                    if ($statement->rowCount()) {
                        $data[] = array('result' => '1');
                    } else {
                        $data[] = array('result' => 'No operations performed on the database!');
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["group_id"]) && !isset($_POST["link"]) && !isset($_POST["chat_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    }
                    else if (!isset($_POST["group_id"])) {
                        $data[] = array('result' => 'Missing group_id parameter'.$_POST);
                    }
                    else if (!isset($_POST["link"])) {
                        $data[] = array('result' => 'Missing link parameter');
                    }
                    else{
                        $data[] = array('result' => 'Missing chat_id parameter');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Remove group */
        public function removeGroup() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"])) {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent group with passed id
                    $query = 
                            "
                            delete from tb_group
                            where id = :id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id
                    $statement->execute($form_data);
                    // Check if any affected row
                    if ($statement->rowCount()) {
                        $data[] = array('result' => '1');
                    } else {
                        $data[] = array('result' => 'No operations performed on the database!');
                    }
                } else {
                    // Check for missing parameters
                    $data[] = array('result' => 'Missing id parameter !!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* User Actions End */
        /**************************/
    }
?>