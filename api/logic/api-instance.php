<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/instance.php");
    require_once("classes/instance-select.php");
    // API for Instance CRUD Class
    class InstanceAPI {
        /* Instance Actions Begin */
        /* Retrieve all instances on the database */
        public function fetchAllInstance() {
            try {
                // Select all users
                $query = "
                        select ti.id, ti.instance, ti.token, ti.user_id, tu.username
                        from tb_instance ti
                        join tb_user tu on ti.user_id = tu.id
                        order by tu.username, ti.instance";
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
                    // Create a Instance object
                    $instance = new Instance($row);
                    //Create datatable row
                    $tmp_data[] = array(
                        $instance->getInstance(),
                        $instance->getToken(),
                        $instance->getUsername(),
                        "<div style='text-align:center'><a href='javascript:update(".json_encode($instance).")' class='btn btn-info'><i class='fas fa-edit'></i></a></div>",
                        "<div style='text-align:center'><a href='javascript:remove(".$instance->getId().")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
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
        /* Retrieve all instances for select on the database */
        public function fetchAllInstanceSelect() {
            try {
                if (!isset($_POST["user_id"])) {
                    // Select all instances
                    $query = "
                            select ti.id, ti.instance, ti.token
                            from tb_instance ti
                            order by ti.instance
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
                        // Create a User object
                        $instance = new InstanceSelect($row);
                        //Create datatable row
                        $tmp_data[] = $instance;
                    }
                    // Export into DataTable json format if there's any record in $tmp_data
                    if (isset($tmp_data) && count($tmp_data) > 0) {
                        $data = $tmp_data;
                    } else {
                        $data = array();
                    }
                }
                else {
                    // Get the instance id from POST request to check
                    $check_data = array(
                        ':user_id' => $_POST["user_id"]
                    );
                    // Select all instances
                    $query = "
                            select ti.id, ti.instance, ti.token
                            from tb_instance ti
                            where ti.user_id = :user_id
                            order by ti.instance
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
                        // Create a User object
                        $instance = new InstanceSelect($row);
                        //Create datatable row
                        $tmp_data[] = $instance;
                    }
                    // Export into DataTable json format if there's any record in $tmp_data
                    if (isset($tmp_data) && count($tmp_data) > 0) {
                        $data = $tmp_data;
                    } else {
                        $data = array();
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Insert new instance */
        public function insertInstance() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["instance"]) && isset($_POST["token"]) && isset($_POST["user_id"])) {
                    // Get the instance from POST request to check
                    $check_data = array(
                        ':instance' => $_POST["instance"]
                    );
                    // Get the instance, token and user id from POST request to insert
                    $form_data = array(
                        ':instance' => $_POST["instance"],
                        ':token'    => $_POST["token"],
                        ':user_id'  => $_POST["user_id"],
                    );
                    // Check for existent instance with the same token in Database
                    $query = "
                            select id 
                            from tb_instance 
                            where instance = :instance
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
                        // Create a SQL query to insert an new instance with all parameters
                        $query = "
                                insert tb_instance(instance, token, user_id) 
                                values(:instance, :token, :user_id);
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameters
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
                    if (!isset($_POST["instance"]) && !isset($_POST["token"]) && !isset($_POST["user_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } elseif (!isset($_POST["instance"])) {
                        $data[] = array('result' => 'Missing instance parameter!');
                    } elseif (!isset($_POST["token"])) {
                        $data[] = array('result' => 'Missing username parameter!');
                    } else {
                        $data[] = array('result' => 'Missing user_id parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Update instance */
        public function updateInstance() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"]) && isset($_POST["instance"]) && isset($_POST["token"]) && isset($_POST["user_id"])) {
                    // Get the id and instance from POST request to check
                    $check_data = array(
                        ':id'       => $_POST["id"],
                        ':instance' => $_POST["instance"]
                    );
                    // Get the id, instance, token and user id from POST request to update
                    $form_data = array(
                        ':id'       => $_POST["id"],
                        ':instance' => $_POST["instance"],
                        ':token'    => $_POST["token"],
                        ':user_id'  => $_POST["user_id"],
                    );
                    // Check for existent instance in Database
                    $query = "
                            select id 
                            from tb_instance 
                            where id != :id and instance = :instance
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id and token
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        $data[] = array('result' => 'Record found!');
                    } else {
                        // Create a SQL query to update an existent instance with all parameters
                        $query = "
                                update tb_instance
                                set instance = :instance,
                                    token = :token,
                                    user_id = :user_id
                                where id = :id;
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter id, token, password and access
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
                    if (!isset($_POST["id"]) && !isset($_POST["instance"]) && !isset($_POST["token"]) && !isset($_POST["user_id"])) {
                        $data[] = array('result' => 'All missing parameters to update the instance!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Missing id parameter!');
                    } elseif (!isset($_POST["instance"])) {
                        $data[] = array('result' => 'Missing instance parameter!');
                    } elseif (!isset($_POST["token"])) {
                        $data[] = array('result' => 'Missing username parameter!');
                    } else {
                        $data[] = array('result' => 'Missing user_id parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Remove instance */
        public function removeInstance() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"])) {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent instance with passed id
                    $query = "
                            delete from tb_instance
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
        /* Instance Actions End */
    }
?>