<?php

declare(strict_types=1);

namespace App\Repositories;

use PDO;

final class LeadRepository
{
    public function __construct(private readonly PDO $pdo)
    {
    }

    public function insertProjectQuery(array $data): int
    {
        $sql = <<<'SQL'
            INSERT INTO project_queries (name, email, service_name, message, source)
            VALUES (:name, :email, :service_name, :message, :source)
        SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':service_name' => $data['service_name'],
            ':message' => $data['message'],
            ':source' => $data['source'],
        ]);

        return (int) $this->pdo->lastInsertId();
    }

    public function insertAppointment(array $data): int
    {
        $sql = <<<'SQL'
            INSERT INTO appointments (full_name, email, company, preferred_date, mode, notes, status)
            VALUES (:full_name, :email, :company, :preferred_date, :mode, :notes, :status)
        SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            ':full_name' => $data['full_name'],
            ':email' => $data['email'],
            ':company' => $data['company'],
            ':preferred_date' => $data['preferred_date'],
            ':mode' => $data['mode'],
            ':notes' => $data['notes'],
            ':status' => $data['status'],
        ]);

        return (int) $this->pdo->lastInsertId();
    }

    public function upsertSubscriber(array $data): int
    {
        $sql = <<<'SQL'
            INSERT INTO subscribers (email, status)
            VALUES (:email, 'active')
            ON DUPLICATE KEY UPDATE
                status = 'active',
                updated_at = CURRENT_TIMESTAMP
        SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            ':email' => $data['email'],
        ]);

        return (int) $this->pdo->lastInsertId();
    }

    public function findAdminByEmail(string $email): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, email, password, created_at, updated_at
             FROM admins
             WHERE email = :email
             LIMIT 1'
        );
        $statement->execute([':email' => $email]);

        $row = $statement->fetch();
        return is_array($row) ? $row : null;
    }

    public function listProjectQueries(int $limit, int $offset): array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, name, email, service_name, message, source, created_at, updated_at
             FROM project_queries
             ORDER BY id DESC
             LIMIT :limit OFFSET :offset'
        );
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, PDO::PARAM_INT);
        $statement->execute();

        return $statement->fetchAll();
    }
}
