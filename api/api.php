<?php
    // Import the neeeded class
    require_once('logic/api_user.php');
    require_once('logic/api_instance.php');

    // Create session
    session_start();

    // Check if there's any open session
    if(isset($_SESSION['views']))
    {
        // Create a API for User CRUD
        $userAPI = new UserAPI();

        // Create a API for Instance CRUD
        $instanceAPI = new InstanceAPI();

        /**********************/
        
        // Perform login action
        if($_GET["action"] == 'logIn')
        {
            $data = $userAPI->logIn();
            $data = $data[0];
        }
        // Perform recover password action
        else if($_GET["action"] == 'recoverPassword')
        {
            $data = $userAPI->recoverPassword();
            $data = $data[0];
        }
        /* User Actions Begin */
        else if($_GET["action"] == 'logOut')
        {
            $data = $userAPI->logOut();
            $data = $data[0];
        }
        // Perform change logged user info action
        else if($_GET["action"] == 'changeLoggedUserInfo')
        {
            $data = $userAPI->changeLoggedUserInfo();
            $data = $data[0];
        }
        // Perform fetch all users action
        else if($_GET["action"] == 'fetchAllUser')
        {
            $data = $userAPI->fetchAllUser();
        }
        // Perform fetch all users to select action
        else if($_GET["action"] == 'fetchAllUserSelect')
        {
            $data = $userAPI->fetchAllUserSelect();
        }
        // Perform insert user action
        else if($_GET["action"] == 'insertUser')
        {
            $data = $userAPI->insertUser();
            $data = $data[0];
        }
        // Perform update user action
        else if($_GET["action"] == 'updateUser')
        {
            $data = $userAPI->updateUser();
            $data = $data[0];
        }
        // Perform remove user action
        else if($_GET["action"] == 'removeUser')
        {
            $data = $userAPI->removeUser();
            $data = $data[0];
        }
        /* User Action End */

        /*************************/

        /* Instance Action Begin */

        // Perform fetch all users action
        else if($_GET["action"] == 'fetchAllInstance')
        {
            $data = $instanceAPI->fetchAllInstance();
        }
        // Perform insert user action
        else if($_GET["action"] == 'insertInstance')
        {
            $data = $instanceAPI->insertInstance();
            $data = $data[0];
        }
        // Perform update user action
        else if($_GET["action"] == 'updateInstance')
        {
            $data = $instanceAPI->updateInstance();
            $data = $data[0];
        }
        // Perform remove user action
        else if($_GET["action"] == 'removeInstance')
        {
            $data = $instanceAPI->removeInstance();
            $data = $data[0];
        }

        /* Instance Action End */

        /***********************/

        // No action to perform
        else
        {
            $data = array('result' => 'Nenhuma acção realizada!');
        }
    }
    else
    {
        // Create a INIC CMS API for User CRUD
        $userAPI = new UserAPI();

        /**********************/
        
        /* User Actions Begin */
        // Perform login action
        if($_GET["action"] == 'logIn')
        {
            $data = $userAPI->logIn();
            $data = $data[0];
        }
        // Perform recover password action
        else if($_GET["action"] == 'recoverPassword')
        {
            $data = $userAPI->recoverPassword();
            $data = $data[0];
        }
        // No action to perform
        else
        {
            $data = array('result' => 'Nenhuma acção realizada ou requer sessão aberta!');
        }
    }
    // Convert data[] to json
    echo json_encode($data);
?>