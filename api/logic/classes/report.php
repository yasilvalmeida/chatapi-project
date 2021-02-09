<?php
    // Message class
    class Message implements JsonSerializable {
        private $id;
        private $msgId;
        private $body;
        private $type;
        private $senderName;
        private $fromMe;
        private $author;
        private $sentAt;
        private $chatId;
        private $messageNumber;
        private $deliveredAt;
        private $viewedAt;
        /* 
        This constructor create a new user object
        */
        function __construct(array $data) {
            $this->id            = $data['id'];
            $this->msgId         = $data['msgId'];
            $this->body          = $data['body'];
            $this->type          = $data['type'];
            $this->senderName    = $data['senderName'];
            $this->fromMe        = $data['fromMe'] == 1? '<i class="fas fa-check" style="text-align: center; color:green;"></i>': '<i class="fas fa-times" style="color:red"></i>';
            $this->author        = $data['author'];
            $this->sentAt        = $data["sentAt"];//date('m/d/Y H:i:s', $data["time"]);
            $this->chatId        = $data['chatId'];
            $this->messageNumber = $data['messageNumber'];
            $this->deliveredAt   = $data['deliveredAt'];
            $this->viewedAt      = $data['viewedAt'];
        }
        // Get Id
        function getId() {
            return $this->id;
        }
        // Get Message Id
        function getMsgId() {
            return $this->msgId;
        }
        // Get Body
        function getBody() {
            return $this->body;
        }
        // Get Type
        function getType() {
            return $this->type;
        }
        // Get Sender Name
        function SenderName() {
            return $this->senderName;
        }
        // Get From Me
        function FromMe() {
            return $this->fromMe;
        }
        // Get Author
        function Author() {
            return $this->author;
        }
        // Get Sent At
        function SentAt() {
            return $this->sentAt;
        }
        // Get Chat Id
        function ChatId() {
            return $this->chatId;
        }
        // Get Message Number
        function MessageNumber() {
            return $this->messageNumber;
        }
        // Get Delivered At
        function DeliveredAt() {
            return $this->deliveredAt;
        }
        // Get Viewed At
        function ViewedAt() {
            return $this->viewedAt;
        }
        // Convert object to JSON
        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>
