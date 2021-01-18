<?php
    // Group Select class
    class GroupSelect implements JsonSerializable {
        private $id;
        private $name;
        private $chat_id;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id      = $data['id'];
            $this->name    = $data['name'];
            $this->chat_id = $data['chat_id'];
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
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
