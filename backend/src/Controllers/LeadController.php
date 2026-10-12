<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Repositories\LeadRepository;
use App\Support\AdminSession;
use App\Support\Env;
use App\Support\Mailer;
use App\Support\Request;
use App\Support\Response;
use App\Support\Validator;
use InvalidArgumentException;

final class LeadController
{
    public function __construct(private readonly LeadRepository $repository)
    {
    }

    public function health(): never
    {
        Response::json([
            'ok' => true,
            'message' => 'API is healthy',
            'timestamp' => gmdate('c'),
        ]);
    }

    public function adminLogin(): never
    {
        try {
            $payload = Request::json();
            $email = Validator::email($payload, 'email');
            $password = Validator::requiredString($payload, 'password', 190);

            $admin = $this->repository->findAdminByEmail($email);
            $valid = is_array($admin) && password_verify($password, (string) ($admin['password'] ?? ''));

            if (!$valid) {
                Response::json(
                    [
                        'ok' => false,
                        'message' => 'Invalid email or password.',
                    ],
                    401
                );
            }

            $session = AdminSession::issue((int) $admin['id'], (string) $admin['email']);

            Response::json([
                'ok' => true,
                'message' => 'Login successful.',
                'token' => $session['token'],
                'expires_in' => $session['expires_in'],
                'admin' => [
                    'id' => (int) $admin['id'],
                    'email' => (string) $admin['email'],
                ],
            ]);
        } catch (InvalidArgumentException $exception) {
            Response::json(
                [
                    'ok' => false,
                    'message' => $exception->getMessage(),
                ],
                422
            );
        }
    }

    public function listProjectQueries(): never
    {
        $this->assertAdminAccess();

        $perPage = Request::queryInt('per_page', 25, 1, 100);
        $page = Request::queryInt('page', 1, 1, 10000);
        $offset = ($page - 1) * $perPage;

        $data = $this->repository->listProjectQueries($perPage, $offset);

        Response::json([
            'ok' => true,
            'page' => $page,
            'per_page' => $perPage,
            'count' => count($data),
            'data' => $data,
        ]);
    }

    public function createProjectQuery(): never
    {
        try {
            $payload = Request::json();
            $name = Validator::requiredString($payload, 'name', 120);
            $email = Validator::email($payload, 'email');
            $serviceName = Validator::requiredString($payload, 'service', 160);
            $message = Validator::requiredString($payload, 'message', 4000);

            $id = $this->repository->insertProjectQuery([
                'name' => $name,
                'email' => $email,
                'service_name' => $serviceName,
                'message' => $message,
                'source' => 'website',
            ]);

            $notificationEmail = Env::get('PROJECT_QUERY_NOTIFICATION_EMAIL');
            $notified = false;
            $emailError = null;
            if ($notificationEmail !== null) {
                $subject = sprintf('New Project Query #%d - %s', $id, $serviceName);
                $body = implode("\n", [
                    'A new project query has been submitted.',
                    '',
                    'ID: ' . $id,
                    'Name: ' . $name,
                    'Email: ' . $email,
                    'Service: ' . $serviceName,
                    'Message:',
                    $message,
                    '',
                    'Submitted At (UTC): ' . gmdate('Y-m-d H:i:s'),
                    'Source: website',
                    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
                ]);
                $notified = Mailer::send($notificationEmail, $subject, $body);
                $emailError = $notified ? null : Mailer::lastError();
            }

            $response = [
                'ok' => true,
                'message' => 'Project query received.',
                'id' => $id,
                'email_notified' => $notified,
            ];
            if (Env::get('APP_ENV', 'local') === 'local' && $emailError !== null) {
                $response['email_error'] = $emailError;
            }

            Response::json(
                $response,
                201
            );
        } catch (InvalidArgumentException $exception) {
            Response::json(
                [
                    'ok' => false,
                    'message' => $exception->getMessage(),
                ],
                422
            );
        }
    }

    public function createAppointment(): never
    {
        try {
            $payload = Request::json();

            $fullName = $payload['full_name'] ?? $payload['fullName'] ?? null;
            $preferredDate = $payload['preferred_date'] ?? $payload['preferredDate'] ?? null;

            if (!is_string($fullName) || trim($fullName) === '') {
                throw new InvalidArgumentException('full_name is required.');
            }

            if (!is_string($preferredDate) || trim($preferredDate) === '') {
                throw new InvalidArgumentException('preferred_date is required.');
            }

            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $preferredDate)) {
                throw new InvalidArgumentException('preferred_date must be in YYYY-MM-DD format.');
            }

            $mode = Validator::enum($payload, 'mode', ['Online', 'Offline']);
            $id = $this->repository->insertAppointment([
                'full_name' => trim($fullName),
                'email' => Validator::optionalString($payload, 'email', 190),
                'company' => Validator::optionalString($payload, 'company', 160),
                'preferred_date' => $preferredDate,
                'mode' => $mode,
                'notes' => Validator::requiredString($payload, 'notes', 4000),
                'status' => 'pending',
            ]);

            Response::json(
                [
                    'ok' => true,
                    'message' => 'Appointment request received.',
                    'id' => $id,
                ],
                201
            );
        } catch (InvalidArgumentException $exception) {
            Response::json(
                [
                    'ok' => false,
                    'message' => $exception->getMessage(),
                ],
                422
            );
        }
    }

    public function createSubscriber(): never
    {
        try {
            $payload = Request::json();
            $id = $this->repository->upsertSubscriber([
                'email' => Validator::email($payload, 'email'),
            ]);

            Response::json(
                [
                    'ok' => true,
                    'message' => 'Subscriber saved.',
                    'id' => $id,
                ],
                201
            );
        } catch (InvalidArgumentException $exception) {
            Response::json(
                [
                    'ok' => false,
                    'message' => $exception->getMessage(),
                ],
                422
            );
        }
    }

    private function assertAdminAccess(): void
    {
        $provided = Request::header('X-Admin-Key');
        $authorization = Request::header('Authorization');
        if ($authorization !== null && preg_match('/^Bearer\s+(.+)$/i', $authorization, $matches) === 1) {
            $provided = trim($matches[1]);
        }

        if ($provided !== null && AdminSession::validate($provided) !== null) {
            return;
        }

        // Backward compatibility for legacy API key auth.
        $legacyKey = Env::get('ADMIN_API_KEY');
        if ($legacyKey !== null && $provided !== null && hash_equals($legacyKey, $provided)) {
            return;
        }

        Response::json(
            [
                'ok' => false,
                'message' => 'Unauthorized',
            ],
            401
        );
    }
}
