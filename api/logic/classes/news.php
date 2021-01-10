<?php
    // News class
    class News implements JsonSerializable
    {
        private $id;
        private $title;
        private $abstract;
        private $content;
        private $date;
        private $category;
        private $photo;
        private $doc;
        private $video_url;
        /* 
        This constructor create a new news object
        */
        function __construct(array $data)
        {
            $this->id        = $data['id'];
            $this->title     = $data['title'];
            $this->abstract  = $data['abstract'];
            $this->content   = $data['content'];
            $this->date      = $data['date'];
            $this->category  = $data['category'];
            $this->photo     = '<img src="data:image/jpeg;base64,'.base64_encode($data['photo']).'" style="margin-left: auto; margin-right: auto; width: 100%; height:230px;" alt="project 1" />'; // style="width: 75%; height: 150px" />';
            $this->doc       = $data['doc'] !== null ? '<div class="span12" style="text-align:center"><a href="api/pdf_generator.php?id='.$data['id'].'" target="_blank"><img src="../img/pdf.png" width="auto" height="60px" /></a></div>' : "";
            $this->video_url = $data['video_url'];
        }
        // Get Id
        function getId()
        {
            return $this->id;
        }
        // Get Title
        function getTitle()
        {
            return $this->title;
        }
        // Get Abstract
        function getAbstract()
        {
            return $this->abstract;
        }
        // Get Content
        function getContent()
        {
            return $this->content;
        }
        // Get Date
        function getDate()
        {
            //Old format 2013-03-19
            $aux = explode("-", $this->date);
            $this->date = $aux[2]."/".$aux[1]."/".$aux[0];
            return $this->date;
        }
        // Get Category
        function getCategory()
        {
            return $this->category;
        }
        // Get Photo
        function getPhoto()
        {
            return $this->photo;
        }
        // Get Doc
        function getDoc()
        {
            return $this->doc;
        }
        // Get Video URL
        function getVideoURL()
        {
            return $this->video_url;
        }
        // Convert object to JSON
        public function jsonSerialize()
        {
            return get_object_vars($this);
        }
    }
?>
