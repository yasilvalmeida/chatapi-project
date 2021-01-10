<?php
    // User class
    class User implements JsonSerializable
    {
        private $id;
        private $email;
        private $username;
        private $password;
        private $access;
        private $state;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data)
        {
            $this->id       = $data['id'];
            $this->email    = $data['email'];
            $this->username = $data['username'];
            $this->password = $data['password'];
            $this->access   = $data['access'];
            $this->state    = $data['state'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Email
        function getEmail()
        {
            return $this->email;
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
        // Get State
        function getState()
        {
            return $this->state;
        }
        // Convert object to JSON
        public function jsonSerialize()
        {
            return get_object_vars($this);
        }
    }
?>
