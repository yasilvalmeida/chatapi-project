<?php
    // Import the needed classes
    require_once("../mysql_pdo.php");
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
        // Print actual count
        echo $statement->rowCount();
    } catch (PDOException $e) {
        die("Error message" . $e->getMessage());
    }
?>