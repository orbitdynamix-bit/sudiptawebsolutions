<?php

declare(strict_types=1);

namespace App\Support;

final class AdminSession
{
    public static function issue(int $adminId, string $email): array
    {
        $ttl = (int) (Env::get('ADMIN_SESSION_TTL', '43200') ?? '43200');
        if ($ttl < 300) {
            $ttl = 300;
        }

        $payload = [
            'sub' => $adminId,
            'email' => $email,
            'exp' => time() + $ttl,
        ];

        $encoded = self::base64UrlEncode((string) json_encode($payload, JSON_UNESCAPED_SLASHES));
        $signature = hash_hmac('sha256', $encoded, self::secret());
        $token = $encoded . '.' . $signature;

        return [
            'token' => $token,
            'expires_in' => $ttl,
        ];
    }

    public static function validate(string $token): ?array
    {
        $parts = explode('.', $token, 2);
        if (count($parts) !== 2) {
            return null;
        }

        [$encoded, $signature] = $parts;
        $expected = hash_hmac('sha256', $encoded, self::secret());
        if (!hash_equals($expected, $signature)) {
            return null;
        }

        $decoded = self::base64UrlDecode($encoded);
        if ($decoded === null) {
            return null;
        }

        $payload = json_decode($decoded, true);
        if (!is_array($payload)) {
            return null;
        }

        $exp = $payload['exp'] ?? null;
        if (!is_int($exp) || $exp < time()) {
            return null;
        }

        return $payload;
    }

    private static function secret(): string
    {
        return Env::get('ADMIN_SESSION_SECRET', Env::get('ADMIN_API_KEY', 'change-this-secret') ?? 'change-this-secret')
            ?? 'change-this-secret';
    }

    private static function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $value): ?string
    {
        $padding = strlen($value) % 4;
        if ($padding > 0) {
            $value .= str_repeat('=', 4 - $padding);
        }

        $decoded = base64_decode(strtr($value, '-_', '+/'), true);
        return $decoded === false ? null : $decoded;
    }
}

