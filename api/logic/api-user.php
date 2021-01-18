<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/user.php");
    require_once("classes/user-select.php");
    // API for User CRUD Class
    class UserAPI {
        /* User Actions Begin */
        /* Do the login */
        public function logIn() {
            try {
                /* Check if for the empty or null email and password parameters */
                if (isset($_POST["email"]) && isset($_POST["password"])) {
                    // Get the email and password parameters from POST request
                    $form_data = array(
                        ':email'    => $_POST["email"],
                        ':password' => $_POST["password"]
                    );
                    // Create a SQL query to check if exist this user with email and password
                    $query = "
                            select id, username, access 
                            from tb_user 
                            where email = :email and password = :password and state = 1
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameters username and password
                    $statement->execute($form_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        // Check if there's any open session
                        if (isset($_SESSION['views'])) {
                            // Increment the open session + 1
                            $_SESSION['views']++;
                        } else {
                            // Open new session
                            $_SESSION['views'] = 1;
                        }
                        // Set user info into php session
                        $_SESSION[$_SESSION['views'].'id']       = $row['id'];
                        $_SESSION[$_SESSION['views'].'email']    = $form_data[':email'];
                        $_SESSION[$_SESSION['views'].'password'] = $form_data[':password'];
                        $_SESSION[$_SESSION['views'].'username'] = $row['username'];
                        $_SESSION[$_SESSION['views'].'access']   = $row['access'];
                        // data[] is a associative array that return json
                        $data[] = array('result' => '1');
                    } else {
                        $data[] = array('result' => 'Please check your username or password!');
                    }
                } else {
                    // Check for missing parameters in POST data
                    if (!isset($_POST["email"]) && !isset($_POST["password"])) {
                        $data[] = array('result' => 'All parameters are missing for user authentication!');
                    } elseif (!isset($_POST["email"])) {
                        $data[] = array('result' => 'Missing email parameter!');
                    } else {
                        $data[] = array('result' => 'Missing password parameter!!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Do the recover */
        public function recoverPassword() {
            try {
                /* Check if for the empty or null email parameters */
                if (isset($_POST["email"])) {
                    // Get the email parameters from POST request
                    $form_data = array(
                        ':email'  => $_POST["email"]
                    );
                    // Create a SQL query to check if exist this user with email
                    $query = "
                            select *
                            from tb_user 
                            where email = :email
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameters email
                    $statement->execute($form_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        // Create a User object
                        $user = new User($row);
                        $username = $user->getUsername();
                        $password = $user->getPassword();
                        // Send creadentials by email passed
                        require_once('classes/phpmailer/class.phpmailer.php');
                        // include("phpmailer/class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded
                        $mail             = new PHPMailer();
                        $mail->CharSet    = 'UTF-8';
                        $mail->IsSMTP(); // telling the class to use SMTP
                        $mail->Host       = "mail.ybytesi.com"; // SMTP server
                        $mail->SMTPDebug  = 1;                     // enables SMTP debug information (for testing)
                                                                   // 1 = errors and messages
                                                                   // 2 = messages only
                        $mail->SMTPAuth   = true;                  // enable SMTP authentication
                        $mail->Host       = "mail.ybytesi.com";    // sets the SMTP server
                        $mail->Port       = 26;                    // set the SMTP port for the GMAIL server
                        $mail->Username   = "suporte@ybytesi.com"; // SMTP account username
                        $mail->Password   = "Su9rt3*2018$";        // SMTP account password

                        $mail->SetFrom('suporte@ybytesi.com', 'SMS System');

                        $mail->AddReplyTo($email, $username);

                        $mail->Subject    = "Password sending";

                        $body = "<html><head></head><body><p>Ol&aacute; $username,</p><p>Enviamos-lhe a sua palavra-passe, <b>$password</b>.</p><br/><br/><p>Atentamente,</p><p>Webmaster inic.gov.st</p></body></html>";
                        
                        $mail->AddEmbeddedImage("../img/logo.png", "my-attach", "../img/logo.png");
                        $body = $body.'<img alt="Logo" src="cid:my-attach" />';
                        
                        $mail->MsgHTML($body);

                        $address = $email;
                        $mail->AddAddress($address, $username);
                        $resp = $mail->Send();
                        // data[] is a associative array that return json
                        if (!$resp) {
                            $data[] = array('result' => '0');
                        } else {
                            $data[] = array('result' => '1');
                        }
                    } else {
                        $data[] = array('result' => 'Email not found!');
                    }
                } else {
                    // Check for missing parameters in POST data
                    $data[] = array('result' => 'Missing email parameter !!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Do the logout */
        public function logOut() {
            try {
                // Check for open session
                if (isset($_SESSION['views'])) {
                    // Remove info for this views
                    unset($_SESSION[$_SESSION['views'].'id']);
                    unset($_SESSION[$_SESSION['views'].'username']);
                    unset($_SESSION[$_SESSION['views'].'password']);
                    unset($_SESSION[$_SESSION['views'].'email']);
                    unset($_SESSION[$_SESSION['views'].'access']);
                    $_SESSION['views'] = $_SESSION['views'] - 1;
                    // data[] is a associative array that return json
                    $data[] = array('result' => '1');
                } else {
                    $data[] = array('result' => 'There is no such session available!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Change Logged User Information */
        public function changeLoggedUserInfo() {
            try {
                /* Check if for the empty or null id, username and password parameters */
                if (isset($_POST["id"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["email"])) {
                    // Get the id, username and password parameters from POST request
                    $form_data = array(
                        ':id'       => $_POST["id"],
                        ':username' => $_POST["username"],
                        ':password' => $_POST["password"],
                        ':email'    => $_POST["email"]
                    );
                    // Check for existent data in Database
                    $query = "
                            select access
                            from tb_user 
                            where id = ?
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id
                    $statement->execute([$form_data[':id']]);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        // Create a SQL query to update the existent user with a new username and password for this passed id
                        $query = "
                                update tb_user
                                set username = :username, 
                                    password = :password, 
                                    email = :email
                                where id = :id
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter id, username and password
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            // Check for open session
                            if (isset($_SESSION['views'])) {
                                // Update new logged user info into session
                                $_SESSION[$_SESSION['views'].'id'] = $form_data[':id'];
                                $_SESSION[$_SESSION['views'].'username'] = $form_data[':username'];
                                $_SESSION[$_SESSION['views'].'password'] = $form_data[':password'];
                                $_SESSION[$_SESSION['views'].'email'] = $form_data[':email'];
                                $_SESSION[$_SESSION['views'].'access'] = $row['access'];
                                // data[] is a associative array that return json
                                $data[] = array('result' => '1');
                            } else {
                                $data[] = array('result' => 'There is no such session available!');
                            }
                        } else {
                            $data[] = array('result' => 'No operations performed on the database!');
                        }
                    } else {
                        $data[] = array('result' => 'Nvalid user id!');
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["id"]) && !isset($_POST["username"]) && !isset($_POST["password"]) && !isset($_POST["email"])) {
                        $data[] = array('result' => 'All missing parameters for changing the authenticated user data!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Missing id parameter !!');
                    } elseif (!isset($_POST["username"])) {
                        $data[] = array('result' => 'Missing username parameter!!');
                    } elseif (!isset($_POST["password"])) {
                        $data[] = array('result' => 'Missing password parameter!!');
                    } else {
                        $data[] = array('result' => 'Missing email parameter !!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Retrieve all users on the database */
        public function fetchAllUser() {
            try {
                // Select all users
                $query = "
                        select * 
                        from tb_user 
                        ";
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute the query without paramters
                $statement->execute();
                // Get affect rows in associative array
                $rows = $statement->fetchAll();
                // Foreach row in array
                foreach ($rows as $row) {
                    // Create a User object
                    $user = new User($row);
                    //Create datatable row
                    $tmp_data[] = array(
                        $user->getEmail(),
                        $user->getUsername(),
                        "********",
                        "<div style='text-align:center'>".$user->getAccess()."</div>",
                        $user->getState() == "0" ? '<div style="text-align:center"><i class="fas fa-times" style="color:red"></i></div>' : '<div style="text-align:center"><i class="fas fa-check" style="text-align: center; color:green;"></i></div>',
                        "<div style='text-align:center'><a href='javascript:update(".json_encode($user).")' class='btn btn-info'><i class='fas fa-edit'></i></a></div>",
                        "<div style='text-align:center'><a href='javascript:remove(".$user->getId().")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
                    );
                }
                // Export into DataTable json format if there's any record in $tmp_data
                if (isset($tmp_data) && count($tmp_data) > 0) {
                    $data = array(
                        "data" => $tmp_data
                    );
                } else {
                    $data = array(
                        "data" => array()
                    );
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Retrieve all users on the database to select */
        public function fetchAllUserSelect() {
            try {
                // Select all users
                $query = "
                        select id, email, username
                        from tb_user 
                        where state = 1 and access = 1
                        order by username
                        ";
                // Create object to connect to MySQL using PDO
                $mysqlPDO = new MySQLPDO();
                // Prepare the query
                $statement = $mysqlPDO->getConnection()->prepare($query);
                // Execute the query without paramters
                $statement->execute();
                // Get affect rows in associative array
                $rows = $statement->fetchAll();
                // Foreach row in array
                foreach ($rows as $row) {
                    // Create a User Select object
                    $user = new UserSelect($row);
                    //Create datatable row
                    $tmp_data[] = $user;
                }
                // Export into DataTable json format if there's any record in $tmp_data
                if (isset($tmp_data) && count($tmp_data) > 0) {
                    $data = $tmp_data;
                } else {
                    $data = array();
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Insert new user */
        public function insertUser() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["access"])) {
                    // Get the username from POST request to check
                    $check_data = array(
                        ':email' => $_POST["email"]
                    );
                    // Get the username, password and access from POST request to insert
                    $form_data = array(
                        ':email'    => $_POST["email"],
                        ':username' => $_POST["username"],
                        ':password' => $_POST["password"],
                        ':access'   => $_POST["access"]
                    );
                    // Check for existent user with the same username in Database
                    $query = "
                            select id 
                            from tb_user 
                            where email = :email
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter username
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        $data[] = array('result' => 'This record already exists!');
                    } else {
                        // Create a SQL query to insert an new user with all parameters
                        $query = "
                                insert tb_user(email, username, password, access, state) values(:email, :username, :password, :access, 1);
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameters
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            $data[] = array('result' => '1');
                        } else {
                            $data[] = array('result' => 'No operations performed on the database!');
                        }
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["email"]) && !isset($_POST["username"]) && !isset($_POST["password"]) && !isset($_POST["access"])) {
                        $data[] = array('result' => 'Missing all parameters');
                    } elseif (!isset($_POST["email"])) {
                        $data[] = array('result' => 'Missing email parameter!');
                    } elseif (!isset($_POST["username"])) {
                        $data[] = array('result' => 'Missing username parameter!');
                    } elseif (!isset($_POST["password"])) {
                        $data[] = array('result' => 'Missing password parameter!');
                    } else {
                        $data[] = array('result' => 'Missing access parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Update user */
        public function updateUser() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"]) && isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["access"])) {
                    // Get the id and username from POST request to check
                    $check_data = array(
                        ':id'    => $_POST["id"],
                        ':email' => $_POST["email"]
                    );
                    // Get the id, username, password and access from POST request to update
                    $form_data = array(
                        ':id'       => $_POST["id"],
                        ':email'    => $_POST["email"],
                        ':username' => $_POST["username"],
                        ':password' => $_POST["password"],
                        ':access'   => $_POST["access"]
                    );
                    // Check for existent user in Database
                    $query = "
                            select id 
                            from tb_user 
                            where id != :id and email = :email
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameters
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        $data[] = array('result' => 'Record found!');
                    } else {
                        $query = "
                                update tb_user
                                set email = :email,
                                    username = :username,
                                    password = :password,
                                    access = :access
                                where id = :id;
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameters
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            $data[] = array('result' => '1');
                        } else {
                            $data[] = array('result' => 'No operations performed on the database!');
                        }
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["id"]) && !isset($_POST["email"]) && !isset($_POST["username"]) && !isset($_POST["password"]) && !isset($_POST["access"])) {
                        $data[] = array('result' => 'Todos os paramêtros em falta para actualização do utilizador!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Paramêtro id em falta!');
                    } elseif (!isset($_POST["email"])) {
                        $data[] = array('result' => 'Missing email parameter!');
                    } elseif (!isset($_POST["username"])) {
                        $data[] = array('result' => 'Missing username parameter!');
                    } elseif (!isset($_POST["password"])) {
                        $data[] = array('result' => 'Missing password parameter!');
                    } else {
                        $data[] = array('result' => 'Missing access parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* Remove user */
        public function removeUser() {
            try {
                /* Check if for the empty or null parameters */
                if (isset($_POST["id"])) {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent user with passed id
                    $query = "
                            update tb_user
                            set state = if(state = 0, 1, 0)
                            where id = :id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id
                    $statement->execute($form_data);
                    // Check if any affected row
                    if ($statement->rowCount()) {
                        $data[] = array('result' => '1');
                    } else {
                        $data[] = array('result' => 'No operations performed on the database!');
                    }
                } else {
                    // Check for missing parameters
                    $data[] = array('result' => 'Missing id parameter !!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Error message: " . $e->getMessage());
            }
        }
        /* User Actions End */
        /**************************/
    }
