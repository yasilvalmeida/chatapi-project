<?php
    // Import the needed classes
    require_once("mysql_pdo.php");
    require_once("classes/news.php");
    // INIC CMS API for News CRUD Class
    class InicCMSNewsAPI
    {
        /* News Actions Begin */
        /* Retrieve all news on the database */
        function fetchAllNews()
        {
            try 
            {
                // Select all news
                $query = "
                        select n.id, n.title, n.abstract, n.content, n.date, nc.name as category, n.photo, if(length(n.doc) > 0, n.doc, null) as doc, n.video_url
                        from tnews n
                        join tnewscategory nc
                        on n.TNewsCategoryid = nc.id;
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
                foreach ($rows as $row) 
                {
                    // Create a News object
                    $news = new News($row);
                    //Create datatable row
                    $tmp_data[] = array
                    (
                        $news->getTitle(),
                        $news->getDate(),
                        $news->getCategory(),
                        "<div class='span12' style='text-align:center'><a href='javascript:read(".$news->getId().")' class='btn btn-warning'><i class='fas fa-eye'></i></a></div>",
                        "<div class='span12' style='text-align:center'><a href='javascript:update(".$news->getId().")' class='btn btn-info'><i class='fas fa-edit'></i></a></div>",
                        "<div class='span12' style='text-align:center'><a href='javascript:remove(".$news->getId().")' class='btn btn-danger'><i class='far fa-trash-alt'></i></a></div>"
                    );  
                }
                // Export into DataTable json format if there's any record in $tmp_data
                if(isset($tmp_data) && count($tmp_data) > 0)
                {
                    $data = array
                    (
                        "data" => $tmp_data
                    );
                }
                else
                {
                    $data = array
                    (
                        "data" => array()
                    );
                }
                return $data;
            }
            catch (PDOException $e) 
            {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Retrieve news by id on the database */
        function fetchNewsById()
        {
            try 
            {
                /* Check if for the empty or null id */
                if(isset($_POST["id"]))
                {
                    // Get the id
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Select all partners
                    $query = "
                            select n.id, n.title, n.abstract, n.content, n.date, nc.name as category, n.photo, if(length(n.doc) > 0, n.doc, null) as doc, n.video_url
                            from tnews n
                            join tnewscategory nc
                            on n.TNewsCategoryid = nc.id
                            where n.id = :id
                            order by n.title asc;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query 
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query without paramters
                    $statement->execute($form_data);
                    // Get affect rows in associative array
                    $rows = $statement->fetchAll();
                    // Foreach row in array
                    foreach ($rows as $row) 
                    {
                        // Create a News object
                        $news = new News($row);
                        //Create datatable row
                        $data = $news;
                    }
                    return $data;
                }
                else
                {
                    // Check for missing parameters
                    $data[] = array('result' => 'Paramêtro id em falta!');
                }
                return $data;
            }
            catch (PDOException $e) 
            {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Insert new news */
        function insertNews()
        {
            try
            {
                /* Check if for the empty or null title, abstract, content, category and photo parameters */
                if(isset($_POST["title"]) && isset($_POST["abstract"]) && isset($_POST["content"]) && isset($_POST["date"]) && isset($_POST["tnewscategory_fk"]) && isset($_FILES['photo']['tmp_name']))
                {
                    // Get the title from POST request to check
                    $check_data = array(
                        ':title' => $_POST["title"]
                    );
                    // Get the title, abstract, content and category from POST request to insert
                    $form_data = array(
                        ':title'            => $_POST["title"], 
                        ':abstract'         => $_POST["abstract"], 
                        ':content'          => $_POST["content"],
                        ':date'             => $_POST["date"],
                        ':tnewscategory_fk' => $_POST["tnewscategory_fk"],
                        ':video_url'        => isset($_POST["video_url"]) ? $_POST["video_url"] : ""
                    );
                    // Receber o ficheiro do FILES porque nao pode ser passado como parametro da consulta SQL
                    $photo = addslashes(file_get_contents($_FILES['photo']['tmp_name']));
                    $doc = isset($_FILES['doc']['tmp_name']) ? addslashes(file_get_contents($_FILES['doc']['tmp_name'])) : null;
                    // Check for existent news with the same title in Database
                    $query = "
                            select id 
                            from tnews 
                            where title = :title
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query 
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter title
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if($row)
                    {
                        $data[] = array('result' => 'Este registo já existe!');
                    }
                    else
                    {
                        // Create a SQL query to insert an new news with a new title, abstract, content, category and photo
                        $query = "
                                insert tnews(title, abstract, content, date, TNewsCategoryid, photo, doc, video_url) 
                                values(:title, :abstract, :content, :date, :tnewscategory_fk, '".$photo."', '".$doc."', :video_url);
                                ";
                        // Prepare the query 
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter title, abstract, content and 
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount())
                        {
                            $data[] = array('result' => '1');
                        } 
                        else
                        {
                            $data[] = array('result' => 'Nenhuma operação realizada a base de dados!');
                        }
                    }
                }
                else
                {
                    // Check for missing parameters
                    if(!isset($_POST["title"]) && !isset($_POST["abstract"]) && !isset($_POST["content"]) && !isset($_POST["date"]) && !isset($_POST["tnewscategory_fk"]) && !isset($_FILES["photo"]["tmp_name"]))
                        $data[] = array('result' => 'Todos os paramêtros em falta para adição de uma nova notícia!');
                    else if(!isset($_POST["title"]))
                        $data[] = array('result' => 'Paramêtro título em falta!');
                    else if(!isset($_POST["abstract"]))
                        $data[] = array('result' => 'Paramêtro resumo em falta!');
                    else if(!isset($_POST["content"]))
                        $data[] = array('result' => 'Paramêtro conteúdo em falta!');
                    else if(!isset($_POST["date"]))
                        $data[] = array('result' => 'Paramêtro data em falta!');
                    else if(!isset($_POST["tnewscategory_fk"]))
                        $data[] = array('result' => 'Paramêtro categoria em falta!');
                    else
                        $data[] = array('result' => 'Paramêtro foto em falta!');
                }
                return $data;
            } 
            catch (PDOException $e) 
            {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Update news */
        function updateNews()
        {
            try
            {
                /* Check if for the empty or null id, title, abstract, content and category parameters */
                if(isset($_POST["id"]) && isset($_POST["title"]) && isset($_POST["abstract"]) && isset($_POST["content"]) && isset($_POST["date"]) && isset($_POST["tnewscategory_fk"]))
                {
                    // Get the id and title from POST request to check
                    $check_data = array(
                        ':id'       => $_POST["id"],
                        ':title' => $_POST["title"]
                    );
                    // Get the id, title, abstract, content and category from POST request to update
                    $form_data = array(
                        ':id'               => $_POST["id"],
                        ':title'            => $_POST["title"], 
                        ':abstract'         => $_POST["abstract"], 
                        ':content'          => $_POST["content"],
                        ':date'             => $_POST["date"], 
                        ':tnewscategory_fk' => $_POST["tnewscategory_fk"]
                    );
                    // Check for existent news with the same title but different id in Database
                    $query = "
                            select id 
                            from tnews 
                            where id != :id and title = :title
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query 
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id and title
                    $statement->execute($check_data);
                    // Get affect rows in associative array
                    $row = $statement->fetch(PDO::FETCH_ASSOC);
                    // Check if any affected row
                    if($row)
                    {
                        $data[] = array('result' => 'Este registo já existe!');
                    }
                    else
                    {
                        // Receber o ficheiro do FILES porque nao pode ser passado como parametro da consulta SQL
                        $photo     = addslashes(file_get_contents($_FILES['photo']['tmp_name']));
                        $doc       = addslashes(file_get_contents($_FILES['doc']['tmp_name']));
                        $video_url = $_POST["video_url"];
                        if(isset($_FILES['photo']['tmp_name']) && isset($_FILES['doc']['tmp_name']) && isset($_POST["video_url"])){
                            // photo doc video_url
                            $query = "
                                update tnews
                                set title = :title,
                                    abstract = :abstract,
                                    content = :content,
                                    date = :date,
                                    TNewsCategoryid = :tnewscategory_fk,
                                    photo = '".$photo."',
                                    doc = '".$doc."',
                                    video_url = '".$video_url."'
                                where id = :id;
                                ";
                        }
                        else if(isset($_FILES['photo']['tmp_name']) && isset($_FILES['doc']['tmp_name']) && !isset($_POST["video_url"])){
                            // photo doc !video_url
                            $query = "
                                    update tnews
                                    set title = :title,
                                        abstract = :abstract,
                                        content = :content,
                                        date = :date,
                                        TNewsCategoryid = :tnewscategory_fk,
                                        photo = '".$photo."',
                                        doc = '".$doc."'
                                    where id = :id;
                                    ";
                        }
                        else if(isset($_FILES['photo']['tmp_name']) && !isset($_FILES['doc']['tmp_name']) && isset($_POST["video_url"])){
                            // photo !doc video_url
                            $query = "
                                    update tnews
                                    set title = :title,
                                        abstract = :abstract,
                                        content = :content,
                                        date = :date,
                                        TNewsCategoryid = :tnewscategory_fk,
                                        photo = '".$photo."',
                                        video_url = '".$video_url."'
                                    where id = :id;
                                    ";
                        }
                        else if(!isset($_FILES['photo']['tmp_name']) && isset($_FILES['doc']['tmp_name']) && isset($_POST["video_url"])){
                             // !photo doc video_url
                            $query = "
                                    update tnews
                                    set title = :title,
                                        abstract = :abstract,
                                        content = :content,
                                        date = :date,
                                        TNewsCategoryid = :tnewscategory_fk,
                                        doc = '".$doc."',
                                        video_url = '".$video_url."'
                                    where id = :id;
                                    ";
                        }
                        else if(isset($_FILES['photo']['tmp_name']) && !isset($_FILES['doc']['tmp_name']) && !isset($_POST["video_url"])){
                            // photo !doc !video_url
                           $query = "
                                   update tnews
                                   set title = :title,
                                       abstract = :abstract,
                                       content = :content,
                                       date = :date,
                                       TNewsCategoryid = :tnewscategory_fk,
                                       photo = '".$photo."'
                                   where id = :id;
                                   ";
                       }
                       else if(!isset($_FILES['photo']['tmp_name']) && isset($_FILES['doc']['tmp_name']) && !isset($_POST["video_url"])){
                            // !photo doc !video_url
                            $query = "
                                    update tnews
                                    set title = :title,
                                        abstract = :abstract,
                                        content = :content,
                                        date = :date,
                                        TNewsCategoryid = :tnewscategory_fk,
                                        doc = '".$doc."'
                                    where id = :id;
                                    ";
                        }
                        else if(!isset($_FILES['photo']['tmp_name']) && !isset($_FILES['doc']['tmp_name']) && isset($_POST["video_url"])){
                            // !photo !doc video_url
                            $query = "
                                    update tnews
                                    set title = :title,
                                        abstract = :abstract,
                                        content = :content,
                                        date = :date,
                                        TNewsCategoryid = :tnewscategory_fk,
                                        video_url = '".$video_url."'
                                    where id = :id;
                                    ";
                        }
                        else {
                            // Criar a consulta SQL sem photo e nem doc
                            $query = "
                                    update tnews
                                    set title = :title,
                                        abstract = :abstract,
                                        content = :content,
                                        date = :date,
                                        TNewsCategoryid = :tnewscategory_fk
                                    where id = :id;
                                    ";
                        }
                        // Prepare the query 
                        $statement = $mysqlPDO->getConnection()->prepare($query);
                        // Execute the query with passed parameter id, title, abstract, content and 
                        $statement->execute($form_data);
                        // Check if any affected row
                        if ($statement->rowCount())
                        {
                            $data[] = array('result' => '1');
                        } 
                        else
                        {
                            $data[] = array('result' => 'Nenhuma operação realizada a base de dados!');
                        }
                    }
                }
                else
                {
                    // Check for missing parameters
                    if(!isset($_POST["id"]) && !isset($_POST["abstract"]) && !isset($_POST["content"]) && !isset($_POST["date"]) && !isset($_POST["tnewscategory_fk"]))
                        $data[] = array('result' => 'Todos os paramêtros em falta para alteração da notícia!');
                    else if(!isset($_POST["id"]))
                        $data[] = array('result' => 'Paramêtro id em falta!');
                    else if(!isset($_POST["title"]))
                        $data[] = array('result' => 'Paramêtro título em falta!');
                    else if(!isset($_POST["abstract"]))
                        $data[] = array('result' => 'Paramêtro resumo em falta!');
                    else if(!isset($_POST["content"]))
                        $data[] = array('result' => 'Paramêtro conteúdo em falta!');
                    else if(!isset($_POST["date"]))
                        $data[] = array('result' => 'Paramêtro data em falta!');
                    else
                        $data[] = array('result' => 'Paramêtro categoria em falta!');
                }
                return $data;
            } 
            catch (PDOException $e) 
            {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* Remove news */
        function removeNews()
        {
            try
            {
                /* Check if for the empty or null id parameters */
                if(isset($_POST["id"]))
                {
                    // Get the id from POST request to remove
                    $form_data = array(
                        ':id' => $_POST["id"]
                    );
                    // Create a SQL query to remove an existent news with passed id
                    $query = "
                            delete from tnews
                            where id = :id;
                            ";
                    // Create object to connect to MySQL using PDO
                    $mysqlPDO = new MySQLPDO();
                    // Prepare the query 
                    $statement = $mysqlPDO->getConnection()->prepare($query);
                    // Execute the query with passed parameter id
                    $statement->execute($form_data);
                    // Check if any affected row
                    if ($statement->rowCount())
                    {
                        $data[] = array('result' => '1');
                    } 
                    else
                    {
                        $data[] = array('result' => 'Nenhuma operação realizada a base de dados!');
                    }
                }
                else
                {
                    // Check for missing parameters
                    $data[] = array('result' => 'Paramêtro id em falta!!');
                }
                return $data;
            } 
            catch (PDOException $e) 
            {
                die("Mensagem de erro: " . $e->getMessage());
            }
        }
        /* News Actions End */
        /**************************/
    }
?>
