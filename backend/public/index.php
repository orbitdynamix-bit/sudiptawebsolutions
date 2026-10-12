<?php

declare(strict_types=1);

if (PHP_SAPI === 'cli-server') {
    $requestedPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if (is_string($requestedPath)) {
        $file = __DIR__ . $requestedPath;
        if ($requestedPath !== '/' && (is_file($file) || is_dir($file))) {
            return false;
        }
    }
}

require_once __DIR__ . '/../src/bootstrap.php';

use App\Controllers\LeadController;
use App\Database;
use App\Repositories\LeadRepository;
use App\Support\Env;
use App\Support\Request;
use App\Support\Response;

$allowedOriginsRaw = Env::get('ALLOWED_ORIGINS', Env::get('ALLOWED_ORIGIN', 'http://localhost:5173'));
$origin = Request::header('Origin');
$allowedOrigins = array_values(
    array_filter(
        array_map('trim', explode(',', (string) $allowedOriginsRaw)),
        static fn (string $value): bool => $value !== ''
    )
);
$allowAllOrigins = in_array('*', $allowedOrigins, true);

if ($allowAllOrigins) {
    header('Access-Control-Allow-Origin: *');
} elseif ($origin !== null) {
    foreach ($allowedOrigins as $allowed) {
        if (rtrim($origin, '/') === rtrim($allowed, '/')) {
            header('Access-Control-Allow-Origin: ' . $origin);
            break;
        }
    }
}

header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Key');

if (Request::method() === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$apiBasePath = rtrim(Env::get('API_BASE_PATH', '/api') ?? '/api', '/');
$path = Request::path();
if ($path !== '/') {
    $path = rtrim($path, '/');
}

if ($apiBasePath !== '' && str_starts_with($path, $apiBasePath)) {
    $path = substr($path, strlen($apiBasePath));
    $path = $path === '' ? '/' : $path;
}

$method = Request::method();

if ($method === 'GET' && $path === '/health') {
    Response::json([
        'ok' => true,
        'message' => 'API is healthy',
        'timestamp' => gmdate('c'),
    ]);
}

$controller = new LeadController(new LeadRepository(Database::connection()));

if ($method === 'POST' && $path === '/project-queries') {
    $controller->createProjectQuery();
}

if ($method === 'POST' && $path === '/admin/login') {
    $controller->adminLogin();
}

if ($method === 'GET' && $path === '/project-queries') {
    $controller->listProjectQueries();
}

if ($method === 'POST' && $path === '/appointments') {
    $controller->createAppointment();
}

if ($method === 'POST' && $path === '/subscribers') {
    $controller->createSubscriber();
}

Response::json(
    [
        'ok' => false,
        'message' => 'Route not found',
    ],
    404
);
