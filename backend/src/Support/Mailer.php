<?php

declare(strict_types=1);

namespace App\Support;

final class Mailer
{
    private static ?string $lastError = null;

    public static function send(string $to, string $subject, string $body): bool
    {
        self::$lastError = null;

        $enabled = strtolower(Env::get('MAIL_ENABLED', 'true') ?? 'true');
        if (in_array($enabled, ['0', 'false', 'no', 'off'], true)) {
            self::$lastError = 'Mail sending is disabled by MAIL_ENABLED=false.';
            return false;
        }

        $fromEmail = Env::get('MAIL_FROM_EMAIL', 'souravhalder583@gmail.com');
        $fromName = Env::get('MAIL_FROM_NAME', 'sudiptawebsolutions');
        $smtpHost = Env::get('SMTP_HOST', 'smtp.gmail.com');
        $smtpPort = (int) (Env::get('SMTP_PORT', '587') ?? '587');
        $smtpSecure = strtolower(Env::get('SMTP_SECURE', 'tls') ?? 'tls');
        $smtpUsername = Env::get('SMTP_USERNAME', $fromEmail) ?? '';
        $smtpPassword = Env::get('SMTP_PASSWORD', '') ?? '';
        $smtpTimeout = (int) (Env::get('SMTP_TIMEOUT', '15') ?? '15');

        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
            self::$lastError = 'Recipient email is invalid.';
            return false;
        }
        if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
            self::$lastError = 'MAIL_FROM_EMAIL is invalid.';
            return false;
        }
        if ($smtpPassword === '') {
            self::$lastError = 'SMTP_PASSWORD is empty.';
            return false;
        }
        if (!in_array($smtpSecure, ['tls', 'ssl', 'none'], true)) {
            self::$lastError = 'SMTP_SECURE must be one of: tls, ssl, none.';
            return false;
        }

        try {
            $client = new SmtpClient(
                $smtpHost ?? 'smtp.gmail.com',
                $smtpPort,
                $smtpSecure,
                $smtpTimeout
            );
            $client->send($smtpUsername, $smtpPassword, $fromEmail, $to, $subject, $body, $fromName ?? 'sudiptawebsolutions');
            return true;
        } catch (\Throwable $exception) {
            self::$lastError = $exception->getMessage();
            error_log('[mailer] ' . $exception->getMessage());
            return false;
        }
    }

    public static function lastError(): ?string
    {
        return self::$lastError;
    }
}
