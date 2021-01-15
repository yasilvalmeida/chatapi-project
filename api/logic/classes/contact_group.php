<?php
    // Instance class
    class Gruop_Contact implements JsonSerializable {
        private $id;
        private $name;
        private $contact;
        private $status;

        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id        = $data['id'];
            $this->name      = $data['name'];
            $this->contact   = $data['contact'];
            $this->status       = $data['status'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Name
        function getName() {
            return $this->name;
        }
 
        //get nunber
        function getContact() {
            return $this->contact;
        }
        //get url
        function getStatus() {
            return $this->status;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
