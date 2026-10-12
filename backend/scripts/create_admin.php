<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

if ($argc < 3) {
    fwrite(STDERR, "Usage: php backend/scripts/create_admin.php <email> <password>\n");
    exit(1);
}

$email = trim((string) $argv[1]);
$password = (string) $argv[2];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Invalid email format.\n");
    exit(1);
}

if (strlen($password) < 8) {
    fwrite(STDERR, "Password must be at least 8 characters.\n");
    exit(1);
}

$pdo = App\Database::connection();
$hash = password_hash($password, PASSWORD_DEFAULT);

$statement = $pdo->prepare(
    'INSERT INTO admins (email, password)
     VALUES (:email, :password)
     ON DUPLICATE KEY UPDATE password = VALUES(password), updated_at = CURRENT_TIMESTAMP'
);
$statement->execute([
    ':email' => $email,
    ':password' => $hash,
]);

echo "ADMIN_USER_UPSERTED\n";

