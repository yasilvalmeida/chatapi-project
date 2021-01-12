<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/contact.php");
    // API for User CRUD Class
    class contactAPI {
        /* User Actions Begin */
        /* Retrieve all instances on the database */
        public function fetchAllContact() {
            try {
                // Select all users
                $query = "select * from
                          tb_instance ti , tb_user tu , tb_contact tc
                          where ti.user_id=tu.id AND ti.id=tc.instance_id 
                          ORDER by username asc";
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
                    $contact = new Contact($row);
                    //Create datatable row
                    $tmp_data[] = array(
                        $contact->getId(),
                        $contact->getNamber(),
                        $contact->getName(),
                        $contact->getUrl(),
                        $contact->getUsermane(),
                        "<div class='span12' style='text-align:center'><a href='javascript:update(".json_encode($contact).")' class='btn btn-info'><i class='fas fa-edit'></i></a></div>",
                        "<div class='span12' style='text-align:center'><a href='javascript:remove(".$contact->getId().")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
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
        /* Insert new instance */
        public function insertConctact() {
            try {
                /* Check if for the empty or null token, password and access parameters */
                if (isset($_POST["number"]) && isset($_POST["name"]) && isset($_POST["instance_id"])) {
                    // Get the token from POST request to check
                    $check_data = array(
                        ':number_add' => $_POST["number"]
                    );
                    // Get the token, password and access from POST request to insert
                    $form_data = array(
                        ':number_add'  => $_POST["number"],
                        ':name_add'    => $_POST["name"],
                        ':url_id'      => $_POST["instance_id"],
                    );
                    // Check for existent instance with the same token in Database
                    $query = "select id from
                              tb_contact 
                               where number =:number_add;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter token
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        $data[] = array('result' => 'This record already exists!');
                    } else {
                        // Create a SQL query to insert an new instance with a new token, password and access
                        $query = "
                                 insert  tb_contact(number, name ,instance_id)values(:number_add, :name_add, :url_id);
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
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["number"]) && !isset($_POST["name"]) && !isset($_POST["instance_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } elseif (!isset($_POST["number"])) {
                        $data[] = array('result' => 'Missing number parameter!');
                    } elseif (!isset($_POST["name"])) {
                        $data[] = array('result' => 'Missing name parameter!');
                    } else {
                        $data[] = array('result' => 'Missing instance parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Update instance */
        public function updateContact() {
            try {
                /* Check if for the empty or null id, token, password and access parameters */
                if (isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["number"])) {
                    // Get the id and token from POST request to check
                    $check_data = array(
                        ':id'     => $_POST["id"],
                        ':number' => $_POST["number"],
                    );
                    // Get the id, token, password and access from POST request to update
                    $form_data = array(
                        ':id'     => $_POST["id"],
                        ':number' => $_POST["number"],
                        ':name'   => $_POST["name"],
                    );
                    // Check for existent instance with the same token but different id in Database
                    $query = "select id from
                              tb_contact 
                              where id !=:id and number=:number";
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
                        // Create a SQL query to update an existent instance with a new token, password and access with passed id
                        $query = "
                                update tb_contact SET 
                                number=:number, name=:name  
                                where  id=:id;
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
                    if (!isset($_POST["id"]) && !isset($_POST["number"]) && !isset($_POST["name"])) {
                        $data[] = array('result' => 'All missing parameters to update the instance!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Missing id parameter!');
                    } elseif (!isset($_POST["number"])) {
                        $data[] = array('result' => 'Missing number parameter!');
                    } elseif (!isset($_POST["name"])) {
                        $data[] = array('result' => 'Missing name parameter!');
                    } else {
                        $data[] = array('result' => 'Missing id parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Remove instance */
        public function removeContact() {
            try {
                /* Check if for the empty or null id parameters */
                if (isset($_POST["id"])) {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent instance with passed id
                    $query = "
                            delete from tb_contact
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
/* URL SELECT*/ 
        public function fetchAllUrlSelect() {
            try {
                // Select all users
                $query = "select *
                       from tb_instance ti
                       join tb_user tu on tu.id = ti.user_id
                       order by tu.username";
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
                    $instance = new Instance($row);
                    //Create datatable row
                    $tmp_data[] = $instance;
                }
                // Export into DataTable json format if there's any record in $tmp_data
                if (isset($tmp_data) && count($tmp_data) > 0) {
                    $data = $tmp_data;
                } else {
                    $data = array();
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
    }


   