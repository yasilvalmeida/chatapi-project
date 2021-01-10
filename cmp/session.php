<?php
    // Inialize session
    session_start();
    // Check
    if (isset($_SESSION) && $_SESSION['views'] == 0)
    {
            header('Location: index.php');
    }
    else
    {
        // Load user information from $_SESSION
        $id = $_SESSION[$_SESSION['views'].'id'];
        $username = $_SESSION[$_SESSION['views'].'username'];
        $password = $_SESSION[$_SESSION['views'].'password'];
        $email = $_SESSION[$_SESSION['views'].'email'];
        $access = $_SESSION[$_SESSION['views'].'access'];
        echo "<input type='hidden' id='logged_id' value='".$id."' />";
        echo "<input type='hidden' id='logged_username' value='".$username."' />";
        echo "<input type='hidden' id='logged_password' value='".$password."' />";
        echo "<input type='hidden' id='logged_email' value='".$email."' />";
        echo "<input type='hidden' id='logged_access' value='".$access."' />";
    }
?>