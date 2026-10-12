<?php

declare(strict_types=1);

namespace App\Support;

use RuntimeException;

final class SmtpClient
{
    /** @var resource|null */
    private $socket = null;

    public function __construct(
        private readonly string $host,
        private readonly int $port,
        private readonly string $secure = 'tls',
        private readonly int $timeout = 15
    ) {
    }

    public function send(
        string $username,
        string $password,
        string $fromEmail,
        string $toEmail,
        string $subject,
        string $body,
        string $fromName = 'sudiptawebsolutions'
    ): void {
        $remoteHost = $this->secure === 'ssl' ? 'ssl://' . $this->host : $this->host;
        $remote = sprintf('%s:%d', $remoteHost, $this->port);

        $this->socket = @stream_socket_client($remote, $errno, $errstr, $this->timeout, STREAM_CLIENT_CONNECT);
        if (!is_resource($this->socket)) {
            throw new RuntimeException(sprintf('SMTP connect failed: %s (%d)', $errstr ?: 'Unknown error', $errno));
        }

        stream_set_timeout($this->socket, $this->timeout);

        $this->expect([220]);
        $ehloHost = gethostname() ?: 'localhost';
        $this->command('EHLO ' . $ehloHost, [250]);

        if ($this->secure === 'tls') {
            $this->command('STARTTLS', [220]);
            $cryptoEnabled = stream_socket_enable_crypto(
                $this->socket,
                true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT
            );
            if ($cryptoEnabled !== true) {
                throw new RuntimeException('Failed to enable STARTTLS.');
            }
            $this->command('EHLO ' . $ehloHost, [250]);
        }

        $this->command('AUTH LOGIN', [334]);
        $this->command(base64_encode($username), [334]);
        $this->command(base64_encode($password), [235]);

        $this->command('MAIL FROM:<' . $fromEmail . '>', [250]);
        $this->command('RCPT TO:<' . $toEmail . '>', [250, 251]);
        $this->command('DATA', [354]);

        $headers = [
            'Date: ' . gmdate('r'),
            'From: ' . $this->formatAddress($fromName, $fromEmail),
            'To: ' . $toEmail,
            'Subject: ' . $this->encodeHeader($subject),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];

        $message = implode("\r\n", $headers) . "\r\n\r\n" . $this->normalizeBody($body);
        $message = str_replace("\n.", "\n..", $message);
        $message .= "\r\n.\r\n";

        $this->write($message);
        $this->expect([250]);

        $this->command('QUIT', [221]);
        fclose($this->socket);
        $this->socket = null;
    }

    private function command(string $command, array $expectedCodes): string
    {
        $this->write($command . "\r\n");
        return $this->expect($expectedCodes);
    }

    private function write(string $data): void
    {
        if (!is_resource($this->socket)) {
            throw new RuntimeException('SMTP socket is not open.');
        }

        $written = fwrite($this->socket, $data);
        if ($written === false) {
            throw new RuntimeException('Failed to write to SMTP socket.');
        }
    }

    private function expect(array $expectedCodes): string
    {
        if (!is_resource($this->socket)) {
            throw new RuntimeException('SMTP socket is not open.');
        }

        $response = '';
        while (($line = fgets($this->socket, 515)) !== false) {
            $response .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') {
                break;
            }
        }

        if ($response === '') {
            throw new RuntimeException('No response from SMTP server.');
        }

        $code = (int) substr($response, 0, 3);
        if (!in_array($code, $expectedCodes, true)) {
            throw new RuntimeException('SMTP error: ' . trim($response));
        }

        return $response;
    }

    private function formatAddress(string $name, string $email): string
    {
        $safeName = trim(preg_replace('/[\r\n]+/', ' ', $name) ?? '');
        if ($safeName === '') {
            return $email;
        }

        return sprintf('"%s" <%s>', addcslashes($safeName, '"\\'), $email);
    }

    private function encodeHeader(string $value): string
    {
        if (preg_match('/[^\x20-\x7E]/', $value) === 1) {
            return '=?UTF-8?B?' . base64_encode($value) . '?=';
        }

        return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
    }

    private function normalizeBody(string $body): string
    {
        return str_replace(["\r\n", "\r"], "\n", $body);
    }
}

