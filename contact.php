<?php

$conn = new mysqli("localhost", "root", "", "contact_db");

if ($conn->connect_error) {
    die("Connection failed");
}

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$sql = "INSERT INTO messages (fname, lname, email, subject, message)
VALUES ('$fname', '$lname', '$email', '$subject', '$message')";

$conn->query($sql);

echo "Message sent successfully!";

$conn->close();

?>