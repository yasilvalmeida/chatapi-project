<?php
    // Group Contact class
    class GroupContact implements JsonSerializable {
        private $id;
        private $name;
        private $phone;
        private $status;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id     = $data['id'];
            $this->name   = $data['name'];
            $this->phone  = $data['phone'];
            $this->status = $data['status'];
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
        // Get Status
        function getStatus() {
            return $this->status;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
