<?php
    // PHP Settings
    header('Content-type: text/html; charset=utf-8');
    header("Cache-Control: no-cache, must-revalidate");
    header ("Pragma: no-cache");

    set_time_limit(0);

    ob_implicit_flush(1);
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/group.php");
    require_once("classes/group-select.php");
    // API for Group CRUD Class
    class GroupAPI {
        /* Retrieve all groups on the database */
        public function fetchAllGroup() {
            try {
                if (!isset($_POST["user_id"])) {
                    // Select all groups
                    $query = "
                            select tg.id, tg.name, tg.link, tg.chat_id, tg.instance_id, ti.instance, ti.token
                            from tb_group tg
                            join tb_instance ti on tg.instance_id = ti.id
                            order by tg.name
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
                }
                else {
                    // Get the instance id from POST request to check
                    $form_data = array(
                        ':user_id' => $_POST["user_id"]
                    );
                    // Select all groups
                    $query = "
                            select tg.id, tg.name, tg.link, tg.chat_id, tg.instance_id, ti.instance, ti.token
                            from tb_group tg
                            join tb_instance ti on tg.instance_id = ti.id and ti.user_id = :user_id
                            order by tg.name
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
                    if (!isset($_POST["user_id"])) {
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
                        // Get the instance id from POST request to check
                        $check_data = array(
                            ':group_id' => $_POST["group_id"],
                            ':user_id'  => $_POST["user_id"]
                        );
                        // Select all groups
                        $query = "
                                select tg.id, tg.name, tg.link, tg.chat_id, tg.instance_id, ti.instance, ti.token
                                from tb_group tg
                                join tb_instance ti on tg.instance_id = ti.id and ti.user_id = :user_id
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
                }
                else {
                    $data[] = array('result' => 'Missing group#_id parameter!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message" . $e->getMessage());
            }
        }
        /* Retrieve all groups to select on the database */
        public function fetchAllGroupSelect() {
            try {
                if (isset($_POST["instance_id"])) {
                    // Get the name from POST request to check
                    $check_data = array(
                        ':instance_id' => $_POST["instance_id"]
                    );
                    // Select all groups
                    $query = "
                            select tg.id, tg.name, tg.chat_id
                            from tb_group tg
                            join tb_instance ti on tg.instance_id = ti.id and ti.id = :instance_id
                            order by tg.name, tg.chat_id
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
                        // Create a Group Select object
                        $groupSelect = new GroupSelect($row);
                        if ($groupSelect->getChatId() != "") {
                            //Create select row
                            $tmp_data[] = $groupSelect;
                        }
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
                    $data[] = array('result' => 'Missing instance_id parameter');
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
                    // Get the name, link, chat id and instance id from POST request to insert
                    $form_data = array(
                        ':name'        => $_POST["name"],
                        ':link'        => $_POST["link"],
                        ':chat_id'     => $_POST["chat_id"],
                        ':instance_id' => $_POST["instance_id"],
                    );
                    // Create a SQL query to insert an new group with all parameters
                    $query = "
                            call sp_insert_group(:name, :link, :chat_id, :instance_id);
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed all parameters
                    $statement->execute($form_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch();
                    // Check if any affected row
                    if ($statement->rowCount()) {
                        $data[] = array('result' => $row["result"]);
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
        /* Insert new 250 group */
        public function insert250Group() {
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
                            call sp_check_250_group_restriction(:name);
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
                    if (isset($row['message']) && $row['message'] != '') {
                        $data[] = array('result' => $row['message']);
                    } else {
                        // Create a SQL query to insert an new group with all parameters
                        $query = "
                                insert tb_group(name, link, chat_id, is250, createdAt, instance_id) 
                                values (:name, :link, :chat_id, 1, NOW(), :instance_id);
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed all parameters
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            // Create a SQL query to select the recent group created
                            $query = "
                                    select tg.id as groupId, tg.instance_id as instanceId
                                    from tb_group tg
                                    where is250 = 1
                                    order by createdAt;
                                    ";
                            // Prepare the query
                            $statement = $mysqlPDO->getConnection()->prepare($query);
                            // Execute the query with passed all parameters
                            $statement->execute();
                            // Get affect rows in associative array
                            $rows = $statement->fetchAll();
                            $nGroups = count($rows);
                            $groupId;
                            $instanceId;
                            if ($nGroups > 0) {
                                // Foreach row in array
                                foreach ($rows as $row) {
                                    $groupId    = $row["groupId"];
                                    $instanceId = $row["instanceId"];
                                }
                                // Form data
                                $form_data = array(
                                    ':instance_id' => $_POST["instance_id"],
                                    ':start'       => (intval($nGroups) - 1) * 250
                                );
                                // Create a SQL query to select the recent group created
                                $query = "
                                        select tc.id
                                        from tb_contact tc
                                        where tc.instance_id = :instance_id
                                        limit :start, 250;
                                        ";
                                // Prepare the query
                                $statement = $mysqlPDO->getConnection()->prepare($query);
                                // Prepare bind parameter
                                $statement->bindValue(':start', $form_data[':start'], PDO::PARAM_INT);
                                $statement->bindValue(':instance_id', $form_data[':instance_id'], PDO::PARAM_INT);
                                // Execute the query with bind value
                                $statement->execute();
                                // Get affect rows in associative array
                                $rows = $statement->fetchAll();
                                $nContacts = count($rows);
                                $data[] = array('nGroups' => $nGroups, 'nContacts' => $nContacts, 'groupId' => $groupId, 'instanceId' => $instanceId);
                            }
                            else {
                                $data[] = array('result' => 'Not found');
                            }
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
        /* Add next 250 contact to created group */
        public function addNext250Contact() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["group_id"]) && isset($_POST["instance_id"]) && isset($_POST["start"])) {
                    // Checking data array
                    $form_data = array(
                        ':instance_id' => $_POST["instance_id"],
                        ':start'       => intval($_POST["start"]) * 250
                    );
                    // Create a SQL query to all next 250 contacts
                    $query = "
                            select tc.id, tc.phone
                            from tb_contact tc
                            where tc.instance_id = :instance_id
                            limit :start, 250;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Prepare bind parameter
                    $statement->bindValue(':start', $form_data[':start'], PDO::PARAM_INT);
                    $statement->bindValue(':instance_id', $form_data[':instance_id'], PDO::PARAM_INT);
                    // Execute the query with bind value
                    $statement->execute();
                    // Get affect rows in associative array
                    $rows = $statement->fetchAll();
                    //print_r($form_data);
                    // result of inserted contacts
                    $contacts = [];
                    // For each contact and to this actual 250 group
                    foreach ($rows as $row) {
                        // Get the contactId
                        $contactId = $row["id"];
                        $phone = $row["phone"];
                        // Get the groupId and instanceId
                        $form_data = array(
                            ':group_id'   => $_POST["group_id"],
                            ':contact_id' => $contactId,
                        );
                        // Check for existent group in Database
                        $query = "
                                select id 
                                from tb_group_contact 
                                where group_id = :group_id and contact_id = :contact_id
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameters
                        $statement->execute($form_data);
                        // Get affect rows in associative array
                        $row = $statement->fetch(PDO::FETCH_ASSOC);
                        // Check if any affected row
                        if (!$row) {
                            // Create a SQL query to insert the 250 contacts to created group
                            $query = "
                                    insert into tb_group_contact(group_id, contact_id)
                                    values(:group_id, :contact_id);
                                    ";
                            // Prepare the query
                            $statement = $mysqlPDO->getConnection()->prepare($query);
                            // Execute the query with passed all parameters
                            $statement->execute($form_data);
                            // push it to array
                            array_push($contacts, $phone);
                            // Hold on 1 second
                            //sleep(1);
                            // Return the nesting level of the output buffering mechanism
                            if(ob_get_level() > 0) {
                                // Flush (send) the output buffer and turn off output buffering
                                ob_end_flush();
                            }
                        }
                    }
                    $data = array('contacts' => $contacts);
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["group_id"]) && !isset($_POST["start"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    }
                    else if (!isset($_POST["group_id"])) {
                        $data[] = array('result' => 'Missing group id parameter');
                    }
                    else if (!isset($_POST["instance_id"])) {
                        $data[] = array('result' => 'Missing instance id parameter');
                    }
                    else {
                        $data[] = array('result' => 'Missing start parameters');
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
                $data = [];
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