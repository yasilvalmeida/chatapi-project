<?php
    // Instance class
    class Gruop implements JsonSerializable {
        private $id;
        private $name;
        private $url;
        private $instance_id;
  
       
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id       = $data['id'];
            $this->name      = $data['name'];
            $this->url      = $data['url'];
            $this->instance_id      = $data['instance_id'];
        
            
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Name
        function getName() {
            return $this->name;
        }
        //get url
        function getURL() {
            return $this->url;
        }
          //get INSTANCE
          function getInstance() {
            return $this->instance_id;
        }

       
      
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
