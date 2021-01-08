<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("../classes/user.php");
  
    class CMSUserAPI
    {
        /* User Actions Begin */
        /* Do the login */
        public function logIn()
        {
            try {
                /* Check if for the empty or null username and password parameters */
                if (isset($_POST["email"]) && isset($_POST["password"])) {
                    // Get the username and password parameters from POST request
                    $form_data = array(
                        ':email'  => $_POST["email"],
                        ':password'  => $_POST["password"]
                    );
                    // Create a SQL query to check if exist this user with username and password
                   /* $query = "
                            select id, email, access 
                            from tuser 
                            where username = :username and password = :password
                            ";*/
                            $query = "select id_user as id,username,email,access from tb_user  where email= :email AND password= :password and state=1";
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
                        $_SESSION[$_SESSION['views'].'password'] = $form_data[':password'];
                        $_SESSION[$_SESSION['views'].'username']    = $row['username'];
                        $_SESSION[$_SESSION['views'].'email']    = $row['email'];
                        $_SESSION[$_SESSION['views'].'access']   = $row['access'];
                        // data[] is a associative array that return json
                        $data[] = array('result' => '1');
                    } else {
                        $data[] = array('result' => 'Credenciais incorrectas, por favor verifique o seu nome de utilizador ou a sua palavra passe!');
                    }
                } else {
                    // Check for missing parameters in POST data
                    if (!isset($_POST["email"]) && !isset($_POST["password"])) {
                        $data[] = array('result' => 'Todos os paramêtros em falta para a autenticação do utilizador!');
                    } elseif (!isset($_POST["email"])) {
                        $data[] = array('result' => 'Paramêtro email de utilizador em falta!!');
                    } else {
                        $data[] = array('result' => 'Paramêtro palavra passe em falta!!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Do the recover */
        public function recoverPassword()
        {
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
                            from tuser 
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

                        $mail->SetFrom('suporte@ybytesi.com', 'Webmaster SGC do INIC');

                        $mail->AddReplyTo($email, $username);

                        $mail->Subject    = "inic.gov.st | Envio de palavra passe";

                        $body = "<html><head></head><body><p>Ol&aacute; $username,</p><p>Enviamos-lhe a sua palavra-passe, <b>$password</b>.</p><br/><br/><p>Atentamente,</p><p>Webmaster inic.gov.st</p></body></html>";
                        
                        $mail->AddEmbeddedImage("../img/logoInic.png", "my-attach", "../img/logoInic.png");
                        $body = $body.'<img alt="INIC Logotipo" src="cid:my-attach" />';
                        
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
                        $data[] = array('result' => 'Correio electrónico não encontrado!');
                    }
                } else {
                    // Check for missing parameters in POST data
                    $data[] = array('result' => 'Paramêtro correio electrónico em falta!!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Do the logout */
        public function logOut()
        {
            try {
                // Check for open session
                if (isset($_SESSION['views'])) {
                    // Remove info for this views
                    unset($_SESSION[$_SESSION['views'].'id']);
                    unset($_SESSION[$_SESSION['views'].'password']);
                    unset($_SESSION[$_SESSION['views'].'email']);
                    unset($_SESSION[$_SESSION['views'].'access']);
                    $_SESSION['views'] = $_SESSION['views'] - 1;
                    // data[] is a associative array that return json
                    $data[] = array('result' => '1');
                } else {
                    $data[] = array('result' => 'Não existe a tal sessão disponível!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Change Logged User Information */
        public function changeLoggedUserInfo()
        {
            try {
                /* Check if for the empty or null id, username and password parameters */
                if (isset($_POST["id"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["email"])) {
                    // Get the id, username and password parameters from POST request
                    $form_data = array(
                        ':id'        => $_POST["id"],
                        ':username'  => $_POST["username"],
                        ':password'  => $_POST["password"],
                        ':email'     => $_POST["email"]
                    );
                    // Check for existent data in Database
                    $query = "
                            select access
                            from tuser 
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
                                update tuser
                                set username = :username, password = :password, email = :email 
                                where id = :id
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter id, username and password
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            // Create session
                            session_start();
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
                                $data[] = array('result' => 'Não existe a tal sessão disponível!');
                            }
                        } else {
                            $data[] = array('result' => 'Nenhuma operação realizada a base de dados!');
                        }
                    } else {
                        $data[] = array('result' => 'Id do utilizador inválido!');
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["id"]) && !isset($_POST["username"]) && !isset($_POST["password"]) && !isset($_POST["email"])) {
                        $data[] = array('result' => 'Todos os paramêtros em falta para a alteração dos dados do utilizador autenticado!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Paramêtro id em falta!!');
                    } elseif (!isset($_POST["username"])) {
                        $data[] = array('result' => 'Paramêtro nome de utilizador em falta!!');
                    } elseif (!isset($_POST["password"])) {
                        $data[] = array('result' => 'Paramêtro palavra passe em falta!!');
                    } else {
                        $data[] = array('result' => 'Paramêtro correio electrónico em falta!!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Retrieve all users on the database */
        public function fetchAllUser()
        {
            try {
                // Select all users
                $query = "select * from tb_user where state=1";
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
                        $user->getUsername(),
                        $user->getemail(),
                        "********",
                        $user->getAccess(),
                        "<div class='span12' style='text-align:center'><a href='javascript:update(".json_encode($user).")' class='btn btn-info'><b>Udate</b></i></a></div>",
                        "<div class='span12' style='text-align:center'><a href='javascript:remove(".json_encode($user).")' class='btn btn-danger'><b>Delete</b></i></a></div>"
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
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Insert new user */
        public function insertUser()
        {
            try {
                /* Check if for the empty or null username, password and access parameters */
                if (isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["email"]) && isset($_POST["access"])) {
                    // Get the username from POST request to check
                    $check_data = array(
                        ':email' => $_POST["email"]
                    );
                    // Get the username, password and access from POST request to insert
                    $form_data = array(
                        ':username' => $_POST["username"],
                        ':password' => $_POST["password"],
                        ':email' => $_POST["email"],
                        ':access'   => $_POST["access"]
                    );
                    // Check for existent user with the same username in Database
                    $query = "
                            select id_user as id 
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
                        // Create a SQL query to insert an new user with a new username, password and access    insert tuser(username, password, access) values(:username, :password, :access);
                        $query = "
                                insert into tb_user (username, password,email, access,state) VALUES (:username, :password, :email, :access,1);
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter username, password and access
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount()) {
                            $data[] = array('result' => '1');
                        } else {
                            $data[] = array('result' => 'Nenhuma operação realizada a base de dados!');
                        }
                    }
                } else {
                    // Check for missing parameters
                    if (!isset($_POST["username"]) && !isset($_POST["password"]) && !isset($_POST["access"]) && !isset($_POST["email"])) {
                        $data[] = array('result' => 'Todos os paramêtros em falta para adição de um novo utilizador!');
                    } elseif (!isset($_POST["username"])) {
                        $data[] = array('result' => 'Paramêtro nome de utilizador em falta!');
                    } elseif (!isset($_POST["password"])) {
                        $data[] = array('result' => 'Paramêtro palavra passe em falta!');
                    } else {
                        $data[] = array('result' => 'Paramêtro acesso em falta!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Update user */
        public function updateUser()
        {
            try {
                /* Check if for the empty or null id, username, password and access parameters */
                if (isset($_POST["id"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["access"]) && isset($_POST["email"])) {
                    // Get the id and username from POST request to check
                    $check_data = array(
                        ':id'       => $_POST["id"],
                        ':email' => $_POST["email"]
                    );
                    // Get the id, username, password and access from POST request to update
                    $form_data = array(
                        ':id'       => $_POST["id"],
                        ':username' => $_POST["username"],
                        ':password' => $_POST["password"],
                        ':access'   => $_POST["access"],
                        ':email'   => $_POST["email"]
                    );
                    // Check for existent user with the same username but different id in Database
                    $query = "
                            select id_user as id
                            from tb_user 
                            where id_user != :id and email = :email
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id and username
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if ($row) {
                        $data[] = array('result' => 'This record already exists!');
                    } else {
                        // Create a SQL query to update an existent user with a new username, password and access with passed id
                        $query = "
                                update tb_user
                                set username = :username,
                                    password = :password,
                                    access = :access,
                                    email= :email
                                where id_user = :id;
                                ";
                        // Prepare the query
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter id, username, password and access
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
                    if (!isset($_POST["id"]) && !isset($_POST["username"]) && !isset($_POST["password"]) && !isset($_POST["access"]) && !isset($_POST["email"])) {
                        $data[] = array('result' => 'Todos os paramêtros em falta para actualização do utilizador!');
                    } elseif (!isset($_POST["id"])) {
                        $data[] = array('result' => 'Missing id parameter!');
                    } elseif (!isset($_POST["username"])) {
                        $data[] = array('result' => 'Missing User parameter!');
                    } elseif (!isset($_POST["password"])) {
                        $data[] = array('result' => 'Missing passwor parameter!');
                    } else {
                        $data[] = array('result' => 'Missing access parameter!');
                    }
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Remove user */
        public function removeUser()
        {
            try {
                /* Check if for the empty or null id parameters */
                if (isset($_POST["id"])) {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent user with passed id
                    $query = "
                            UPDATE tb_user SET state='0' WHERE  id_user=:id;
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
                        $data[] = array('result' => 'Nenhuma operação realizada a base de dados!');
                    }
                } else {
                    // Check for missing parameters
                    $data[] = array('result' => 'Paramêtro id em falta!!');
                }
                return $data;
            } catch (PDOException $e) {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* User Actions End */
        /**************************/
    }
