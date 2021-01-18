<?php
    // Group class
    class Group implements JsonSerializable {
        private $id;
        private $name;
        private $link;
        private $chat_id;
        private $instance;
        private $token;
        private $instance_id;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id          = $data['id'];
            $this->name        = $data['name'];
            $this->link        = $data['link'];
            $this->chat_id     = $data['chat_id'];
            $this->instance    = $data['instance'];
            $this->token       = $data['token'];
            $this->instance_id = $data['instance_id'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Name
        function getName() {
            return $this->name;
        }
        //get Chat Id
        function getChatId() {
            return $this->chat_id;
        }
        //get Link
        function getLink() {
            return $this->link;
        }
        //get Instance
        function getInstance() {
            return $this->instance;
        }
        //get Token
        function getToken() {
            return $this->token;
        }
        //get Instance Id
        function getInstanceId() {
            return $this->instance_id;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
