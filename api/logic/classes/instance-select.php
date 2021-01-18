<?php
    // Instance Select class
    class InstanceSelect implements JsonSerializable {
        private $id;
        private $instance;
        private $token;
        /* 
        This constructor create a new instance object
        */
        function __construct(array $data) {
            $this->id       = $data['id'];
            $this->instance = $data['instance'];
            $this->token    = $data['token'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Instance
        function getInstance() {
            return $this->instance;
        }
        // Get Token
        function getToken() {
            return $this->token;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
