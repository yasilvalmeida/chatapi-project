<?php
    // Import the neeeded class
    require_once('logic/api_user.php');
    require_once('logic/api_instance.php');
    require_once('logic/api_contact.php');
    require_once('logic/api_group.php');
    require_once('logic/api_contact_group.php');

    // Create session
    session_start();

    // Check if there's any open session
    if(isset($_SESSION['views']))
    {
        // Create a API for User CRUD
        $userAPI = new UserAPI();
        // Create a API for Instance CRUD
        $instanceAPI = new InstanceAPI();
        // Create a API for Contact CRUD
        $contactAPI = new  contactAPI();
         // Create a API for CroupAPI CRUD
         $grupotAPI = new  GroupAPI();
         $grupo_contactAPI = new  Group_ContactAPI();

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
/*Contact Action */
        else if($_GET["action"] == 'fetchAllContact')
        {
            $data = $contactAPI->fetchAllContact();
        }//
        else if($_GET["action"] == 'fetchAllUrlSelect'){
            $data = $instanceAPI->fetchAllUrlSelect();
        }  else if($_GET["action"] == 'fetchAllUrlSelect'){
            $data = $instanceAPI->fetchAllUrlSelect();
        }
        // select conatct
        else if($_GET["action"] == 'fetchAllContactSelect'){
            $data = $instanceAPI->fetchAllContactSelect();

        }//URL Contac Select
        else if($_GET["action"] == 'fetchAllInstanceContact'){
            $data = $contactAPI->fetchAllContactInstance();

        }
        
        // Perfom Group action
        else if($_GET["action"] == 'insertGroup')
        {
            $data = $grupotAPI->insertGroup();
        } 
         else if($_GET["action"] == 'fetchAllGroup')
        {
            $data = $grupotAPI->fetchAllGroup();
        }
        // contact group
        else if($_GET["action"] == 'fetchAllGroupContact')
        {
            $data = $grupo_contactAPI->fetchAllGroup_contact();
        }
        //
        else if($_GET["action"] == 'insertContact_group')
        {
            $data = $grupo_contactAPI->insertGroup_Contact();
        }
         else if($_GET["action"] == 'removeContact_group')
        {
            $data = $grupo_contactAPI->removeContact_Group();
            $data = $data[0];
        }
        else if($_GET["action"] == 'fetchAllInstanceGroup'){
            $data = $grupo_contactAPI->fetchAllGrouptInstance();

        }
        // Perform insert user action
        else if($_GET["action"] == 'insertContact')
        {
            $data = $contactAPI->insertConctact();
            $data = $data[0];
        }
        // Perform update user action
        else if($_GET["action"] == 'updateContact')
        {
            $data = $contactAPI->updateContact();
            $data = $data[0];
        }
        // Perform remove user action
        else if($_GET["action"] == 'removeContact')
        {
            $data = $contactAPI->removeContact();
            $data = $data[0];
        } 
        


        // No action to perform
        else
        {
            $data = array('result' => 'No action taken!');
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
            $data = array('result' => 'No action taken or requires an open session!');
        }
    }
    // Convert data[] to json
    echo json_encode($data);
?>