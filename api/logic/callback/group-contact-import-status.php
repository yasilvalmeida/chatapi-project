<?php
    // Import the needed classes
    require_once("../mysql_pdo.php");
    try {
        if (isset($_GET["group_id"])) {
            // Parameter array
            $form_data = array(
                ':group_id' => $_GET["group_id"]
            );
            $query = "
                select * 
                from tb_group_contact
                where group_id = :group_id
                ";
            // Create object to connect to MySQL using PDO
            $mysqlPDO = new MySQLPDO();
            // Prepare the query
            $statement = $mysqlPDO->getConnection()->prepare($query);
            // Execute query with parameter
            $statement->execute($form_data);
            // Print actual count
            echo $statement->rowCount();
        }
        else {
            echo "Missing parameter";
        }
    } catch (PDOException $e) {
        die("Error message" . $e->getMessage());
    }
?>