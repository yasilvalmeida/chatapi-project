<?php
    // Instance class
    class Instance implements JsonSerializable {
        private $id;
        private $url;
        private $token;
        private $user_id;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id      = $data['id'];
            $this->url     = $data['url'];
            $this->token   = $data['token'];
            $this->user_id = $data['user_id'];
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
        // Get Token
        function getUserId() {
            return $this->user_id;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
