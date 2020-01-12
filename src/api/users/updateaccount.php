<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_NUMBER_INT));

  if (isset($_POST['email'], $_POST['password'])) {
    $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];


    if (!empty($email) && !empty($password)) {
      $query = "SELECT email FROM users WHERE email = :email AND NOT id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      $emailDatabase = $statement->fetch(PDO::FETCH_ASSOC);

      if ($emailDatabase) {
        echo json_encode(array('message' => 'Email already used by another user'));
        http_response_code(409);
        exit;
      }

      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $query = "UPDATE users SET email = :email, password = :password WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':password', $password, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      echo json_encode(array('message' => 'Updated account'));
    } elseif (!empty($email) && empty($password)) {
      $query = "SELECT email FROM users WHERE email = :email AND NOT id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      $emailDatabase = $statement->fetch(PDO::FETCH_ASSOC);

      if ($emailDatabase) {
        echo json_encode(array('message' => 'Email already used by another user'));
        http_response_code(409);
        exit;
      }

      $query = "UPDATE users SET email = :email WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      echo json_encode(array('message' => 'Updated email'));
    } elseif (empty($email) && !empty($password)) {
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $query = "UPDATE users SET password = :password WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':password', $password, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      echo json_encode(array('message' => 'Updated password'));
    }
    http_response_code(200);
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}