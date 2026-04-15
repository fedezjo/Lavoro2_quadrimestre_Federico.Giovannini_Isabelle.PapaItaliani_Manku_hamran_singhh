<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo non consentito']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$first_name = trim($data['first_name'] ?? '');
$last_name  = trim($data['last_name']  ?? '');
$email      = trim($data['email']      ?? '');
$password   = trim($data['password']   ?? '');


if (!$first_name || !$last_name || !$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Tutti i campi sono obbligatori']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email non valida']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['error' => 'La password deve avere almeno 6 caratteri']);
    exit;
}

$pdo = getDB();

// Controlla se email già esiste
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'Email già registrata']);
    exit;
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare(
    'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)'
);
$stmt->execute([$first_name, $last_name, $email, $password_hash]);
$userId = $pdo->lastInsertId();

echo json_encode([
    'success' => true,
    'userId'  => (int)$userId,
    'user'    => [
        'id'         => (int)$userId,
        'first_name' => $first_name,
        'last_name'  => $last_name,
        'email'      => $email,
    ]
]);
?>
