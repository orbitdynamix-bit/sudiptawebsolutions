<?php

declare(strict_types=1);

namespace App\Support;

final class Request
{
    public static function method(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    }

    public static function path(): string
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $path = parse_url($uri, PHP_URL_PATH);
        if (!is_string($path) || $path === '') {
            return '/';
        }

        return $path;
    }

    public static function header(string $name): ?string
    {
        $normalized = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
        $value = $_SERVER[$normalized] ?? null;
        if (!is_string($value) || $value === '') {
            return null;
        }

        return $value;
    }

    public static function query(string $key, ?string $default = null): ?string
    {
        $value = $_GET[$key] ?? null;
        if (!is_string($value) || trim($value) === '') {
            return $default;
        }

        return trim($value);
    }

    public static function queryInt(string $key, int $default, int $min, int $max): int
    {
        $value = self::query($key);
        if ($value === null || !preg_match('/^-?\d+$/', $value)) {
            return $default;
        }

        $parsed = (int) $value;
        if ($parsed < $min) {
            return $min;
        }
        if ($parsed > $max) {
            return $max;
        }

        return $parsed;
    }

    public static function json(): array
    {
        $raw = file_get_contents('php://input');
        if ($raw === false || trim($raw) === '') {
            return [];
        }

        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            throw new \InvalidArgumentException('Request body must be valid JSON.');
        }

        return $decoded;
    }
}
