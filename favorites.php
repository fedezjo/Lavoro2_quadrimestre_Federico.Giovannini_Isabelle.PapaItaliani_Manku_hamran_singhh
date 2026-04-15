<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDB();

// ── GET /favorites.php?user_id=1 ──────────────────────────────────────────────
if ($method === 'GET') {
    $user_id = (int)($_GET['user_id'] ?? 0);
    if (!$user_id) {
        http_response_code(400);
        echo json_encode(['error' => 'user_id mancante']);
        exit;
    }
    $stmt = $pdo->prepare('SELECT fighter_id FROM favorites WHERE user_id = ?');
    $stmt->execute([$user_id]);
    $rows = $stmt->fetchAll();
    echo json_encode(array_column($rows, 'fighter_id'));
    exit;
}

// ── POST /favorites.php  { user_id, fighter_id } ─────────────────────────────
if ($method === 'POST') {
    $data       = json_decode(file_get_contents('php://input'), true);
    $user_id    = (int)($data['user_id']   ?? 0);
    $fighter_id = (int)($data['fighter_id'] ?? 0);

    if (!$user_id || !$fighter_id) {
        http_response_code(400);
        echo json_encode(['error' => 'user_id e fighter_id sono obbligatori']);
        exit;
    }

    // INSERT IGNORE evita duplicati grazie al UNIQUE KEY
    $stmt = $pdo->prepare(
        'INSERT IGNORE INTO favorites (user_id, fighter_id) VALUES (?, ?)'
    );
    $stmt->execute([$user_id, $fighter_id]);

    echo json_encode(['success' => true]);
    exit;
}

// ── DELETE /favorites.php  { user_id, fighter_id } ───────────────────────────
if ($method === 'DELETE') {
    $data       = json_decode(file_get_contents('php://input'), true);
    $user_id    = (int)($data['user_id']   ?? 0);
    $fighter_id = (int)($data['fighter_id'] ?? 0);

    if (!$user_id || !$fighter_id) {
        http_response_code(400);
        echo json_encode(['error' => 'user_id e fighter_id sono obbligatori']);
        exit;
    }

    $stmt = $pdo->prepare(
        'DELETE FROM favorites WHERE user_id = ? AND fighter_id = ?'
    );
    $stmt->execute([$user_id, $fighter_id]);

    echo json_encode(['success' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Metodo non consentito']);
?>
