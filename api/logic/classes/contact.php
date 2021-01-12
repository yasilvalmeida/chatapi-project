<?php
    // Instance class
    class Contact implements JsonSerializable {
        private $id;
        private $name;
        private $number;
        private $instance_id;
        private $username;
        private $url;
       
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id       = $data['id'];
            $this->name      = $data['name'];
            $this->number    = $data['number'];
            $this->instance_id  = $data['instance_id'];
            $this->username  = $data['username'];
            $this->url  = $data['url'];
            
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Name
        function getName() {
            return $this->name;
        }
        // Get Number
        function getNamber() {
            return $this->number;
        }
        // Get InstanceId
        function getInstanceid() {
            return $this->instance_id;
        }
        // Get Usermane
        function getUsermane() {
            return $this->username;
        }
        // Get Usermane
        function getUrl() {
            return $this->url;
        }
      
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
