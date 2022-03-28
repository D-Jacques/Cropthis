<?php

    /**
     * Rien de bien compliqué ici, on récupére notre image et on la met dans le fichier img
     */

    $fileUploaded = $_FILES['file']['tmp_name'];
    $name = $_FILES['file']['name'];
    $uploadFolder = '../img';
    $result = move_uploaded_file($fileUploaded, "$uploadFolder/$name");


?>