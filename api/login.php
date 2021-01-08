<?php
    // Import the neeeded class
    require_once('api_user.php');
   

    // Create session
    session_start();

    // Check if there's any open session
    if(isset($_SESSION['views']))
    {
        // Create a INIC CMS API for User CRUD
        $CMSUserAPI = new CMSUserAPI();

        // Create a INIC CMS API for Parameter CRUD
    

        /**********************/
        
        // Perform login action
        if($_GET["action"] == 'logIn')
        {
            
            $data = $CMSUserAPI->logIn();
            $data = $data[0];
           
        }
        // Perform recover password action
        else if($_GET["action"] == 'recoverPassword')
        {
            $data = $CMSUserAPI->recoverPassword();
            $data = $data[0];
        }
        /* User Actions Begin */
        else if($_GET["action"] == 'logOut')
        {
            $data = $CMSUserAPI->logOut();
            $data = $data[0];
        }
        // Perform change logged user info action
        else if($_GET["action"] == 'changeLoggedUserInfo')
        {
            $data = $CMSUserAPI->changeLoggedUserInfo();
            $data = $data[0];
        }
        // Perform fetch all users action
        else if($_GET["action"] == 'fetchAllUser')
        {
            $data = $CMSUserAPI->fetchAllUser();
        }
        // Perform insert user action
        else if($_GET["action"] == 'insertUser')
        {
            $data = $CMSUserAPI->insertUser();
            $data = $data[0];
        }
        // Perform update user action
        else if($_GET["action"] == 'updateUser')
        {
            $data = $CMSUserAPI->updateUser();
            $data = $data[0];
        }
        // Perform remove user action
        else if($_GET["action"] == 'removeUser')
        {
            $data = $CMSUserAPI->removeUser();
            $data = $data[0];
        }
        /* User Action End */

        /*************************/

        /* Parameter Action Begin */

        /* News Category Begin */
        // Perform fetch all news category action
        else if($_GET["action"] == 'fetchAllNewsCategory')
        {
            $data = $inicCMSParameterAPI->fetchAllNewsCategory();
        }
        // Perform fetch all news category to select action
        else if ($_GET["action"] == 'fetchAllNewsCategoryToSelect')
        {
            $data = $inicCMSParameterAPI->fetchAllNewsCategoryToSelect();
        }
        // Perform insert news category action
        else if($_GET["action"] == 'insertNewsCategory')
        {
            $data = $inicCMSParameterAPI->insertNewsCategory();
            $data = $data[0];
        }
        // Perform update news category action
        else if($_GET["action"] == 'updateNewsCategory')
        {
            $data = $inicCMSParameterAPI->updateNewsCategory();
            $data = $data[0];
        }
        // Perform remove news category action
        else if($_GET["action"] == 'removeNewsCategory')
        {
            $data = $inicCMSParameterAPI->removeNewsCategory();
            $data = $data[0];
        }
        /* News Category End */

        /* Partners Category Begin */
        // Perform fetch all partner category action
        else if($_GET["action"] == 'fetchAllPartnersCategory')
        {
            $data = $inicCMSParameterAPI->fetchAllPartnersCategory();
        }
        // Perform fetch all partner category to select action
        else if ($_GET["action"] == 'fetchAllPartnersCategoryToSelect')
        {
            $data = $inicCMSParameterAPI->fetchAllPartnersCategoryToSelect();
        }
        // Perform insert partner category action
        else if($_GET["action"] == 'insertPartnersCategory')
        {
            $data = $inicCMSParameterAPI->insertPartnersCategory();
            $data = $data[0];
        }
        // Perform update partner category action
        else if($_GET["action"] == 'updatePartnersCategory')
        {
            $data = $inicCMSParameterAPI->updatePartnersCategory();
            $data = $data[0];
        }
        // Perform remove partner category action
        else if($_GET["action"] == 'removePartnersCategory')
        {
            $data = $inicCMSParameterAPI->removePartnersCategory();
            $data = $data[0];
        }
        /* Partners Category End */

        /* Parameter Action End */

        /***********************/

        /* Link Begin */
        // Perform fetch all link action
        else if($_GET["action"] == 'fetchAllLink')
        {
            $data = $inicCMSLinkAPI->fetchAllLink();
        }
        // Perform insert link action
        else if($_GET["action"] == 'insertLink')
        {
            $data = $inicCMSLinkAPI->insertLink();
            $data = $data[0];
        }
        // Perform update link action
        else if($_GET["action"] == 'updateLink')
        {
            $data = $inicCMSLinkAPI->updateLink();
            $data = $data[0];
        }
        // Perform remove link action
        else if($_GET["action"] == 'removeLink')
        {
            $data = $inicCMSLinkAPI->removeLink();
            $data = $data[0];
        }
        /* Link End */

        /***********************/

        /* Partner Begin */
        // Perform fetch all partner action
        else if($_GET["action"] == 'fetchAllPartner')
        {
            $data = $inicCMSPartnerAPI->fetchAllPartner();
        }
        // Perform fetch partner by id action
        else if($_GET["action"] == 'fetchPartnerById')
        {
            $data = $inicCMSPartnerAPI->fetchPartnerById();
        }
        // Perform insert partner action
        else if($_GET["action"] == 'insertPartner')
        {
            $data = $inicCMSPartnerAPI->insertPartner();
            $data = $data[0];
        }
        // Perform update partner action
        else if($_GET["action"] == 'updatePartner')
        {
            $data = $inicCMSPartnerAPI->updatePartner();
            $data = $data[0];
        }
        // Perform remove partner action
        else if($_GET["action"] == 'removePartner')
        {
            $data = $inicCMSPartnerAPI->removePartner();
            $data = $data[0];
        }
        /* Partner End */

        /***********************/

        /* News Begin */
        // Perform fetch all news action
        else if($_GET["action"] == 'fetchAllNews')
        {
            $data = $inicCMSNewsAPI->fetchAllNews();
        }
        // Perform fetch news by id action
        else if($_GET["action"] == 'fetchNewsById')
        {
            $data = $inicCMSNewsAPI->fetchNewsById();
        }
        // Perform insert news action
        else if($_GET["action"] == 'insertNews')
        {
            $data = $inicCMSNewsAPI->insertNews();
            $data = $data[0];
        }
        // Perform update news action
        else if($_GET["action"] == 'updateNews')
        {
            $data = $inicCMSNewsAPI->updateNews();
            $data = $data[0];
        }
        // Perform remove news action
        else if($_GET["action"] == 'removeNews')
        {
            $data = $inicCMSNewsAPI->removeNews();
            $data = $data[0];
        }
        /* News End */

        /***********************/

        /* Project Begin */
        // Perform fetch all project action
        else if($_GET["action"] == 'fetchAllProject')
        {
            $data = $inicCMSProjectAPI->fetchAllProject();
        }
        // Perform fetch project by id action
        else if($_GET["action"] == 'fetchProjectById')
        {
            $data = $inicCMSProjectAPI->fetchProjectById();
        }
        // Perform insert project action
        else if($_GET["action"] == 'insertProject')
        {
            $data = $inicCMSProjectAPI->insertProject();
            $data = $data[0];
        }
        // Perform update project action
        else if($_GET["action"] == 'updateProject')
        {
            $data = $inicCMSProjectAPI->updateProject();
            $data = $data[0];
        }
        // Perform remove project action
        else if($_GET["action"] == 'removeProject')
        {
            $data = $inicCMSProjectAPI->removeProject();
            $data = $data[0];
        }
        /* Project End */

        // No action to perform
        else
        {
            $data = array('result' => 'Nenhuma acção realizada!');
        }
    }
    else
    {
        // Create a INIC CMS API for User CRUD
        $CMSUserAPI = new CMSUserAPI();

        /**********************/
        
        /* User Actions Begin */
        // Perform login action
        if($_GET["action"] == 'logIn')
        {
            $data = $CMSUserAPI->logIn();
            $data = $data[0];
        }
        // Perform recover password action
        else if($_GET["action"] == 'recoverPassword')
        {
            $data = $CMSUserAPI->recoverPassword();
            $data = $data[0];
        }
        // No action to perform
        else
        {
            $data = array('result' => 'No action found or not found session!');
        }
    }
    // Convert data[] to json
    echo json_encode($data);
?>