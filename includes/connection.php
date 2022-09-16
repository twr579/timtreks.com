<?php

$server = 'localhost';
$username = '***';
$password = '***';
$db = '***';

// Create a connection
$conn = mysqli_connect($server, $username, $password, $db);

// Check connection
if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT * FROM posts";
$result = $conn->query($query);

// Get result as a JSON object
if($result->num_rows > 0) {
    $rows = array();
    
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}

// Close the connection
mysqli_close($conn);

?>