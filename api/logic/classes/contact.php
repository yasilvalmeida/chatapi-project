<?php
    // Contact class
    class Contact implements JsonSerializable {
        private $id;
        private $name;
        private $phone;
        private $instance_id;
        private $instance;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id          = $data['id'];
            $this->name        = $data['name'];
            $this->phone       = $data['phone'];
            $this->instance_id = $data['instance_id'];
            $this->instance    = $data['instance'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Name
        function getName() {
            return $this->name;
        }
        // Get Phone
        function getPhone() {
            return $this->phone;
        }
        // Get InstanceId
        function getInstanceId() {
            return $this->instance_id;
        }
        // Get Instance
        function getInstance() {
            return $this->instance;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
