<?php
    // User Select class
    class UserSelect implements JsonSerializable {
        private $id;
        private $email;
        private $username;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id       = $data['id'];
            $this->email    = $data['email'];
            $this->username = $data['username'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Email
        function getEmail() {
            return $this->email;
        }
        // Get Username
        function getUsername() {
            return $this->username;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
