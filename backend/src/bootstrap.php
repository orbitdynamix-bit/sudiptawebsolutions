<?php

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');

spl_autoload_register(static function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relative = substr($class, strlen($prefix));
    $path = __DIR__ . '/' . str_replace('\\', '/', $relative) . '.php';
    if (file_exists($path)) {
        require_once $path;
    }
});

App\Support\Env::load(__DIR__ . '/../.env');

set_exception_handler(static function (Throwable $exception): void {
    $isLocal = App\Support\Env::get('APP_ENV', 'local') === 'local';
    error_log('[backend] ' . $exception::class . ': ' . $exception->getMessage());

    App\Support\Response::json(
        [
            'ok' => false,
            'message' => 'Internal server error',
            'error' => $isLocal ? $exception->getMessage() : null,
        ],
        500
    );
});
