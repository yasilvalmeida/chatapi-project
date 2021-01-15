<?php
// Import the needed classes
require_once("mysql_pdo.php");
require_once("classes/contact_group.php");
// API for User CRUD Class
class Group_ContactAPI
{
    /* User Actions Begin */
    /* Retrieve all instances on the database */
    public function fetchAllGroup_contact()
    {
        try {
            if (isset($_POST["id"])) {
                $id = $_POST["id"];
            }
            // Select all users
            $query = "
            select tc.id, tc.name, tc.number AS contact, ifnull(tgc.id, 0) as status 
            FROM tb_group tg
            join tb_contact tc on tg.instance_id = tc.instance_id
            left join tb_group_contact tgc on tg.id = tgc.tb_group_id AND tc.id = tgc.tb_contact_id
            where tg.id='" . $id . "'";
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
                $group_contact = new Gruop_Contact($row);
                //Create datatable row
                $tmp_data[] = array(
                    $group_contact->getId(),
                    $group_contact->getName(),
                    $group_contact->getContact(),
                    $group_contact->getStatus(),
                    $group_contact->getStatus() == "0" ? "<div class='span12' style='text-align:center'><a href='javascript:add_group(" . json_encode($group_contact) . ")'' class='btn btn-success'><i class='far fa-plus-square'></i></a></div>" : "<div class='span12' style='text-align:center'><a href='javascript:remove(" . $group_contact->getId() . ")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
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
    public function insertGroup_Contact()
    {
        try {
            /* Check if for the empty or null token, password and access parameters */
            if (isset($_POST["id"]) && isset($_POST["id_group"])) {
                // Get the token from POST request to check

                // Get the token, password and access from POST request to insert
                $form_data = array(
                    ':id'  => $_POST["id"],
                    ':id_group'  => $_POST["id_group"],
                );
                
                 
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                   
                // Create a SQL query to insert an new instance with a new token, password and access
                $query = "insert tb_group_contact (tb_group_id, tb_contact_id) values (:id_group,:id);";
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
            } else {
                // Check for missing parameters
                if (!isset($_POST["idgroup"])) {
                    $data[] = array('result' => 'Missing name_group parameters');
                }
            }
            return $data;
        } catch (PDOException $e) {
            die("Error message" . $e->getMessage());
        }
    }
    /* Update instance */
    public function updateContact()
    {
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
    public function removeContact_Group()
    {
        try {
            /* Check if for the empty or null id parameters */
            if (isset($_POST["id"])) {
                // Get the id from POST request to remove
                $form_data = array(
                    ':id' => $_POST["id"]
                );
                // Create a SQL query to remove an existent instance with passed id
                $query = "
                            delete from tb_group_contact
                            where tb_contact_id = :id;
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
    public function fetchAllUrlSelect()
    {
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

    public function fetchAllUrlContactSelect()
    {
        try {
            // Select all users
            if (isset($_POST["id"])) {
                $query = "select *from tb_contact ,tb_user,tb_instance where instance_id=11";
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
                    $contact = new  Contact($row);
                    //Create datatable row
                    $tmp_data[] = $contact;
                }
                // Export into DataTable json format if there's any record in $tmp_data
                if (isset($tmp_data) && count($tmp_data) > 0) {
                    $data = $tmp_data;
                } else {
                    $data = array();
                }
            } else {
                if (!isset($_POST["id"])) {
                    $data[] = array('result' => 'All missing parameters to update the instance!');
                }
            }
            return $data;
        } catch (PDOException $e) {
            die("Error message: " . $e->getMessage());
        }
    }

    public function fetchAllGrouptInstance() {
        try {
            // Select all users
            if (isset($_POST["id"])){
                $id=$_POST["id"];
            $query = "
            SELECT tg.id, tg.name,tc.number AS contact,tc.name AS status   FROM tb_group tg, tb_contact tc
             WHERE tg.instance_id=tc.instance_id AND tg.instance_id='".$id."'";
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
                $contact_group = new  Gruop_Contact($row);
                //Create datatable row
                $tmp_data[] = $contact_group;
            }
            // Export into DataTable json format if there's any record in $tmp_data
            if (isset($tmp_data) && count($tmp_data) > 0) {
                $data = $tmp_data;
            } else {
                $data = array();
            }
        }else{
            if (!isset($_POST["id"])){
                $data[] = array('result' => 'All missing parameters to update the instance!');
            }
        }
            return $data;
        } catch (PDOException $e) {
            die("Error message: " . $e->getMessage());
        }
    }

}
