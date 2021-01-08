<?php
    // INIC CMS & Portal MySQL PDO Connection Class
    class MySQLPDO
    {
        private $connection;
        private $hostname;
        private $database;
        private $username;
        private $password;
        /*
        This constructor set the global variable with the required information and
        call the function that create the connection to the database
        */
        public function __construct()
        {

            $this->hostname = "ybytesi.com";
            $this->database = "chatapi_db";
            $this->username = "chatapi_sa";
            $this->password = "Ch4t4pI*2021&";



            $this->database_connection();
        }
        /* This function create an mysql database connection */
        public function database_connection()
        {
            try {
                $this->connection = new PDO("mysql:host=$this->hostname;dbname=$this->database", $this->username, $this->password, array(PDO::MYSQL_ATTR_FOUND_ROWS => true));
            } catch (PDOException $e) {
                echo "Connection fail: ".$e->getMessage();
            }
        }
        // Get MySQL PDO Connection
        public function getConnection()
        {
            return $this->connection;
        }
    }
