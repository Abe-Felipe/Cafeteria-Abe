#!/bin/sh

echo "Entrypoint: Aguardando o banco de dados..."

until npx knex migrate:latest; do
  echo "O banco de dados não está pronto, tentando novamente em 2s..."
  sleep 2
done

echo "Entrypoint: Migrations executadas com sucesso."

npx knex seed:run

echo "Entrypoint: Seeds executados com sucesso."
echo "Entrypoint: Iniciando o servidor Node.js..."

exec node server.js