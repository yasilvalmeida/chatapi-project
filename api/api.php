<?php
    // Import the neeeded class
    require_once('logic/api-user.php');
    require_once('logic/api-instance.php');
    require_once('logic/api-contact.php');
    require_once('logic/api-group.php');
    require_once('logic/api-group-contact.php');
    require_once('logic/api-dashboard.php');
    require_once('logic/api-report.php');

    // Create session
    session_start();

    // Check if there's any open session
    if (isset($_SESSION['views']))
    {
        // Create a API for User CRUD
        $userAPI = new UserAPI();
        // Create a API for Instance CRUD
        $instanceAPI = new InstanceAPI();
        // Create a API for Contact CRUD
        $contactAPI = new  ContactAPI();
        // Create a API for Group CRUD
        $grupotAPI = new  GroupAPI();
        // Create a API for Group Contact CRUD
        $groupContactAPI = new  GroupContactAPI();
        // Create a API for Dashboard CRUD
        $dashboardAPI = new DashboardAPI();
        // Create a API for Report CRUD
        $reportAPI = new ReportAPI();

        /**********************/
        
        /* User Action Begin */
        // Perform login action
        if ($_GET["action"] == 'logIn') {
            $data = $userAPI->logIn();
            $data = $data[0];
        }
        // Perform recover password action
        else if ($_GET["action"] == 'recoverPassword') {
            $data = $userAPI->recoverPassword();
            $data = $data[0];
        }
        // Perform logout action
        else if ($_GET["action"] == 'logOut') {
            $data = $userAPI->logOut();
            $data = $data[0];
        }
        // Perform change logged user info action
        else if ($_GET["action"] == 'changeLoggedUserInfo') {
            $data = $userAPI->changeLoggedUserInfo();
            $data = $data[0];
        }
        // Perform fetch all users action
        else if ($_GET["action"] == 'fetchAllUser') {
            $data = $userAPI->fetchAllUser();
        }
        // Perform fetch all users to select action
        else if ($_GET["action"] == 'fetchAllUserSelect') {
            $data = $userAPI->fetchAllUserSelect();
        }
        // Perform insert user action
        else if ($_GET["action"] == 'insertUser') {
            $data = $userAPI->insertUser();
            $data = $data[0];
        }
        // Perform update user action
        else if ($_GET["action"] == 'updateUser') {
            $data = $userAPI->updateUser();
            $data = $data[0];
        }
        // Perform remove user action
        else if ($_GET["action"] == 'removeUser') {
            $data = $userAPI->removeUser();
            $data = $data[0];
        }
        /* User Action End */

        /*************************/

        /* Instance Action Begin */
        // Perform fetch all instances action
        else if ($_GET["action"] == 'fetchAllInstance') {
            $data = $instanceAPI->fetchAllInstance();
        }
        // Perform fetch all instances to select action
        else if ($_GET["action"] == 'fetchAllInstanceSelect') {
            $data = $instanceAPI->fetchAllInstanceSelect();
        }
        // Perform insert instance action
        else if ($_GET["action"] == 'insertInstance') {
            $data = $instanceAPI->insertInstance();
            $data = $data[0];
        }
        // Perform update instance action
        else if ($_GET["action"] == 'updateInstance') {
            $data = $instanceAPI->updateInstance();
            $data = $data[0];
        }
        // Perform remove instance action
        else if ($_GET["action"] == 'removeInstance') {
            $data = $instanceAPI->removeInstance();
            $data = $data[0];
        }
        /* Instance Action End */

        /***********************/
        
        /* Contact Action Begin */
        // Perform fetch all contacts action
        else if ($_GET["action"] == 'fetchAllContact') {
            $data = $contactAPI->fetchAllContact();
        }
        // Perform fetch all contacts action
        else if ($_GET["action"] == 'fetchAllContactByUser') {
            $data = $contactAPI->fetchAllContactByUser();
        }
        // Perform fetch all contacts to select action
        else if ($_GET["action"] == 'fetchAllContactSelect') {
            $data = $contactAPI->fetchAllContactSelect();
        }
        // Perform fetch all contacts by instance to select action
        else if ($_GET["action"] == 'fetchAllContactByInstanceSelect') {
            $data = $contactAPI->fetchAllContactByInstanceSelect();
        }
        // Perform insert contact action
        else if ($_GET["action"] == 'insertContact') {
            $data = $contactAPI->insertContact();
            $data = $data[0];
        }
        // Perform import contact from CSV action
        else if ($_GET["action"] == 'insertContactFromCSV') {
            $data = $contactAPI->insertContactFromCSV();
            $data = $data[0];
        }
        // Perform store contacts from csv to MySQL action
        else if ($_GET["action"] == 'storeImportedContact') {
            $data = $contactAPI->storeImportedContact();
            //$data = $data[0];
        }
        // Perform migration fo contact from one instance to another action
        else if ($_GET["action"] == 'migrateContact') {
            $data = $contactAPI->migrateContact();
            $data = $data[0];
        }
        // Perform update contact action
        else if ($_GET["action"] == 'updateContact') {
            $data = $contactAPI->updateContact();
            $data = $data[0];
        }
        // Perform remove contact action
        else if ($_GET["action"] == 'removeContact') {
            $data = $contactAPI->removeContact();
            $data = $data[0];
        } 
        /* Contact Action Begin */

        /************************/
        
        /* Group Action Begin */
        // Perform fetch all groups 
        else if ($_GET["action"] == 'fetchAllGroup') {
            $data = $grupotAPI->fetchAllGroup();
        }
        // Perform fetch single group 
        else if ($_GET["action"] == 'fetchSingleGroup') {
            $data = $grupotAPI->fetchSingleGroup();
        }
        // Perform fetch all group to select 
        else if ($_GET["action"] == 'fetchAllGroupSelect') {
            $data = $grupotAPI->fetchAllGroupSelect();
        }
        // Perfom insert group action
        else if ($_GET["action"] == 'insertGroup') {
            $data = $grupotAPI->insertGroup();
            $data = $data[0];
        }
        // Perfom insert 250 group action
        else if ($_GET["action"] == 'insert250Group') {
            $data = $grupotAPI->insert250Group();
            $data = $data[0];
        }
        // Perfom add next 250 contacts action
        else if ($_GET["action"] == 'addNext250Contact') {
            $data = $grupotAPI->addNext250Contact();
        }
        // Perfom update group action
        else if ($_GET["action"] == 'updateGroup') {
            $data = $grupotAPI->updateGroup();
            $data = $data[0];
        }
        // Perfom remove group action
        else if ($_GET["action"] == 'removeGroup') {
            $data = $grupotAPI->removeGroup();
            $data = $data[0];
        }
        /* Group Action End */

        /************************/

        /* Group Contact Action Begin */
        // Perform fetch all contacts by group action
        else if ($_GET["action"] == 'fetchAllGroupContact') {
            $data = $groupContactAPI->fetchAllGroupContact();
        }
        // Perform insert group contact action
        else if ($_GET["action"] == 'insertGroupContact') {
            $data = $groupContactAPI->insertGroupContact();
            $data = $data[0];
        }
        // Perform remove group contact action
        else if ($_GET["action"] == 'removeGroupContact') {
            $data = $groupContactAPI->removeGroupContact();
            $data = $data[0];
        }
        /* Contact Action Begin */

        /************************/

        /* Dashboard Action Begin */
        else if ($_GET["action"] == 'dashboard') {
            $data = $dashboardAPI->dashboard();
        }
        /* Dashboard Action End */

        /* Report Action Begin */
        else if ($_GET["action"] == 'fetchAllMessage') {
            $data = $reportAPI->fetchAllMessage();
        }
        else if ($_GET["action"] == 'fetchSingleMessage') {
            $data = $reportAPI->fetchSingleMessage();
        }
        /* Report Action End */

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
        if ($_GET["action"] == 'logIn')
        {
            $data = $userAPI->logIn();
            $data = $data[0];
        }
        // Perform recover password action
        else if ($_GET["action"] == 'recoverPassword')
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