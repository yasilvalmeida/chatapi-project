<?php
    // Instance class
    class Instance implements JsonSerializable {
        private $id;
        private $url;
        private $token;
        private $user_id;
        private $username;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id       = $data['id'];
            $this->url      = $data['url'];
            $this->token    = $data['token'];
            $this->user_id  = $data['user_id'];
            $this->username = $data['username'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Url
        function getUrl() {
            return $this->url;
        }
        // Get Token
        function getToken() {
            return $this->token;
        }
        // Get UserId
        function getUserId() {
            return $this->user_id;
        }
        // Get Token
        function getUsername() {
            return $this->username;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
