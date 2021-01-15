<?php
    use Mike4ip\ChatApi;
    require_once "./vendor/autoload.php";
    
    if (isset($_POST["token"]) && isset($_POST["url"]) && isset($_POST["msg"])) {
        $token = $_POST["token"];
        $url = $_POST["url"];
        $msg  = $_POST["msg"];
        $phone  = $_POST["phone"];
        $api = new ChatApi(
            $token, // Chat-Api.com token
            $url // Chat-Api.com API url
        );
        $result1 = $api->sendPhoneMessage($phone, $msg);
        //$result2 = $api->sendPhoneMessage($num2, $msg);
        
        echo json_encode("Sended for ".$num1." with result=".$result1);
    }
?>