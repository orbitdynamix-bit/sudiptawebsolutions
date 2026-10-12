<?php

declare(strict_types=1);

namespace App\Support;

final class Validator
{
    public static function requiredString(array $payload, string $field, int $maxLength = 255): string
    {
        $value = $payload[$field] ?? null;
        if (!is_string($value)) {
            throw new \InvalidArgumentException("{$field} is required.");
        }

        $value = trim($value);
        if ($value === '') {
            throw new \InvalidArgumentException("{$field} is required.");
        }

        if (mb_strlen($value) > $maxLength) {
            throw new \InvalidArgumentException("{$field} is too long.");
        }

        return $value;
    }

    public static function optionalString(array $payload, string $field, int $maxLength = 255): ?string
    {
        if (!array_key_exists($field, $payload) || $payload[$field] === null) {
            return null;
        }

        if (!is_string($payload[$field])) {
            throw new \InvalidArgumentException("{$field} must be a string.");
        }

        $value = trim($payload[$field]);
        if ($value === '') {
            return null;
        }

        if (mb_strlen($value) > $maxLength) {
            throw new \InvalidArgumentException("{$field} is too long.");
        }

        return $value;
    }

    public static function email(array $payload, string $field): string
    {
        $value = self::requiredString($payload, $field, 190);
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("{$field} must be a valid email.");
        }

        return $value;
    }

    public static function enum(array $payload, string $field, array $allowed): string
    {
        $value = self::requiredString($payload, $field, 40);
        if (!in_array($value, $allowed, true)) {
            throw new \InvalidArgumentException("{$field} is invalid.");
        }

        return $value;
    }
}

