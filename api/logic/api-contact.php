<?php
    // PHP Settings
    header('Content-type: text/html; charset=utf-8');
    header("Cache-Control: no-cache, must-revalidate");
    header ("Pragma: no-cache");

    set_time_limit(0);

    ob_implicit_flush(1);
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/contact.php");
    require_once("classes/contact-select.php");
    // API for Contact CRUD Class
    class ContactAPI {
        /* Contact Actions Begin */
        /* Retrieve all contacts on the database */
        public function fetchAllContact() {
            try {
                // Select all users
                $query = "
                        select tc.id, tc.name, tc.phone, tc.instance_id, ti.instance
                        from tb_contact tc
                        join tb_instance ti on ti.id = tc.instance_id
                        order by tc.name, tc.phone, ti.instance asc
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
                    // Create a Instance object
                    $contact = new Contact($row);
                    //Create datatable row
                    $tmp_data[] = array(
                        $contact->getName(),
                        $contact->getPhone(),
                        $contact->getInstance(),
                        "<div style='text-align:center'><a href='javascript:update(".json_encode($contact).")' class='btn btn-info'><i class='fas fa-edit'></i></a></div>",
                        "<div style='text-align:center'><a href='javascript:remove(".$contact->getId().")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
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
        /* Retrieve all contacts by user on the database */
        public function fetchAllContactByUser() {
            try {
                if (isset($_POST["user_id"])) {
                    // Get the name, phone and instance id from POST request to insert
                    $form_data = array(
                        ':user_id' => $_POST["user_id"],
                    );
                    // Select all contacts
                    $query = "
                            select tc.id, tc.name, tc.phone, tc.instance_id, ti.instance
                            from tb_contact tc
                            join tb_instance ti on ti.id = tc.instance_id
                            where ti.user_id = :user_id
                            order by tc.name, tc.phone, ti.instance asc
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query without paramters
                    $statement->execute($form_data);
                    // Get affect rows in associative array
                    $rows = $statement->fetchAll();
                    // Foreach row in array
                    foreach ($rows as $row) {
                        // Create a Instance object
                        $contact = new Contact($row);
                        //Create datatable row
                        $tmp_data[] = array(
                            $contact->getName(),
                            $contact->getPhone(),
                            $contact->getInstance(),
                            "<div style='text-align:center'><a href='javascript:update(".json_encode($contact).")' class='btn btn-info'><i class='fas fa-edit'></i></a></div>",
                            "<div style='text-align:center'><a href='javascript:remove(".$contact->getId().")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
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
                }
                else {
                    $data[] = array('result' => 'Missing user id parameter!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Retrieve all contact by instance for select */
        public function fetchAllContactByInstanceSelect() {
            try {
                if (isset($_POST["instance_id"])) {
                    // Get the instance id from POST request to check
                    $check_data = array(
                        ':instance_id' => $_POST["instance_id"]
                    );
                    $query = "
                            select tc.id, tc.name, tc.phone 
                            from tb_contact tc  
                            where tc.instance_id = :instance_id
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
                        // Create a Contact Select object
                        $contact = new ContactSelect($row);
                        //Create datatable row
                        $tmp_data[] = $contact;
                    }
                    // Export into DataTable json format if there's any record in $tmp_data
                    if (isset($tmp_data) && count($tmp_data) > 0) {
                        $data = $tmp_data;
                    } else {
                        $data = array();
                    }
                } else{
                    $data[] = array('result' => 'Missing instance id parameter!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Insert new contact */
        public function insertContact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["phone"]) && isset($_POST["name"]) && isset($_POST["instance_id"])) {
                    // Get the phone from POST request to check
                    $check_data = array(
                        ':phone' => $_POST["phone"]
                    );
                    // Get the name, phone and instance id from POST request to insert
                    $form_data = array(
                        ':name'        => $_POST["name"],
                        ':phone'       => $_POST["phone"],
                        ':instance_id' => $_POST["instance_id"],
                    );
                    // Check for existent contact in Database
                    $query = "
                            select id from
                            tb_contact 
                            where phone =: phone;
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
                                insert tb_contact(phone, name, instance_id)
                                values(:phone, :name, :instance_id);
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
                    if (!isset($_POST["phone"]) && !isset($_POST["name"]) && !isset($_POST["instance_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } elseif (!isset($_POST["phone"])) {
                        $data[] = array('result' => 'Missing phone parameter!');
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
        /* Insert new contacts from CSV */
        public function insertContactFromCSV() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_FILES["file"])) {
                    $tmpName = $_FILES['file']['tmp_name'];
                    move_uploaded_file($_FILES['file']['tmp_name'], 'contact.csv');
                    $file_content = file('contact.csv', FILE_SKIP_EMPTY_LINES);
                    $totalLine = count($file_content);
                    $_SESSION['csv_file_name'] = 'contact.csv';
                    // Select all users
                    $query = "
                            select tc.id
                            from tb_contact tc
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query without paramters
                    $statement->execute();
                    // Get rows count
                    $totalContact = $statement->rowCount();
                    $data[] = array('nLines' => $totalLine, 'nContacts' => $totalContact);
                } else {
                    // Check for missing parameters
                    $data[] = array('result' => 'Missing file parameter!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Store contacts from CSV to MySQL */
        public function storeImportedContact() {
            try {
                // Checking for csv temp name from Session
                if (isset($_SESSION['csv_file_name']) && isset($_POST["instance_id"])) {
                    $tmpName = $_SESSION['csv_file_name'];
                    $file_data = fopen($_SESSION['csv_file_name'], 'r');
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    while($row = fgetcsv($file_data)) {
                        if ($row[0] != 'name' && $row[1] != 'Mobile Phone' && $row[0] != '' && $row[1] != '') {
                            $data = array(
                                ':name'        => $row[0],
                                ':phone'       => $row[1],
                                ':instance_id' => $_POST["instance_id"]
                            );
    
                            $query = "
                                    call sp_insert_contact_from_csv(:name, :phone, :instance_id)
                                    ";
                            // Prepare the query
                            $statement = $mysqlPDO->getConnection()->prepare($query);
                            // Execute the query with parameters
                            $statement->execute($data);
                            // Hold on 1 second
                            //sleep(1);
                            // Return the nesting level of the output buffering mechanism
                            if(ob_get_level() > 0) {
                                // Flush (send) the output buffer and turn off output buffering
                                ob_end_flush();
                            }
                        }
                    }
                    // Delete contacts csv file
                    unset($_SESSION['csv_file_name']);
                }
                else {
                    // Check for missing parameters
                    if (!isset($_SESSION['csv_file_name']) && !isset($_POST["instance_id"])) {
                        $data[] = array('result' => 'Missing all parameters. ');
                    } elseif (!isset($_SESSION['csv_file_name'])) {
                        $data[] = array('result' => 'Missing csv temp file name parameter!');
                    } else {
                        $data[] = array('result' => 'Missing instance parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Get import contacts from CSV status */
        public function getImportContactStatus() {
            try {
                $query = "
                    select * 
                    from tb_contact
                    ";
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute query without parameter
                $statement->execute();
                /* $data[] = array('result' => );
                return $data; */
                // Print actual count
                echo $statement->rowCount();
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Migrate contact from one instance to another */
        public function migrateContact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["from_instance_id"]) && isset($_POST["to_instance_id"])) {
                    // Get the from instance id and to instance id from POST request to migrate
                    $form_data = array(
                        ':from_instance_id' => $_POST["from_instance_id"],
                        ':to_instance_id'   => $_POST["to_instance_id"],
                    );
                    // Create a SQL query to insert an new contact with all parameters
                    $query = "
                            update tb_contact
                            set instance_id = :to_instance_id
                            where instance_id = :from_instance_id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameters
                    $row = $statement->execute($form_data);
                    // Check if any affected row
                    if ($statement->rowCount()) {
                        $data[] = array('result' => '1');
                    } else {
                        $data[] = array('result' => 'No operations performed on the database!');
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["from_instance_id"]) && !isset($_POST["to_instance_id"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } elseif (!isset($_POST["from_instance_id"])) {
                        $data[] = array('result' => 'Missing from instance id parameter!');
                    } else {
                        $data[] = array('result' => 'Missing to instance id parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Update contact */
        public function updateContact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["phone"]) && isset($_POST["instance_id"])) {
                    // Get the id and phone from POST request to check
                    $check_data = array(
                        ':id'    => $_POST["id"],
                        ':phone' => $_POST["phone"],
                    );
                    // Get the id, name, phone and instance id from POST request to update
                    $form_data = array(
                        ':id'          => $_POST["id"],
                        ':phone'       => $_POST["phone"],
                        ':name'        => $_POST["name"],
                        ':instance_id' => $_POST["instance_id"],
                    );
                    // Check for existent contact in Database
                    $query = "
                            select id from
                            tb_contact 
                            where id !=:id and phone=:phone";
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
                        $data[] = array('result' => 'Record found!');
                    } else {
                        // Create a SQL query to update an existent contact will all parameters
                        $query = "
                                update tb_contact 
                                SET phone=:phone, 
                                    name=:name,
                                    instance_id=:instance_id
                                where id=:id;
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
                    if (!isset($_POST["id"]) && !isset($_POST["phone"]) && !isset($_POST["name"])) {
                        $data[] = array('result' => 'All missing parameters to update the instance!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Missing id parameter!');
                    } elseif (!isset($_POST["phone"])) {
                        $data[] = array('result' => 'Missing phone parameter!');
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
        /* Remove contact */
        public function removeContact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"])) {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent contact with passed id
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
        /* Contact Actions End */
    }
?>