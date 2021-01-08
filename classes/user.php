<?php
    // User class
    class User implements JsonSerializable
    {
        private $id;
        private $username;
        private $password;
        private $access;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data)
        {
            $this->id       = $data['id_user'];
            $this->username = $data['username'];
            $this->password = $data['password'];
            $this->access   = $data['access'];
            $this->email   = $data['email'];
        }
        // Get Id
        function getId()
        {
            return $this->id;
        }
        // Get Username
        function getUsername()
        {
            return $this->username;
        }
        // Get Password
        function getPassword()
        {
            return $this->password;
        }
        // Get Access

        function getAccess()
        {
            return $this->access;
        }
        function getemail()
        {
            return $this->email;
        }



        // Convert object to JSON
        public function jsonSerialize()
        {
            return get_object_vars($this);
        }
    }
?>
