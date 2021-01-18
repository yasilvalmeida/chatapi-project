<?php
    // Contact Select class
    class ContactSelect implements JsonSerializable {
        private $id;
        private $name;
        private $phone;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id    = $data['id'];
            $this->name  = $data['name'];
            $this->phone = $data['phone'];
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
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
