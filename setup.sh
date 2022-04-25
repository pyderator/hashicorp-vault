#!/bin/bash

# Sets up policy for vault

# Make sure that you have your Vault address and token setup correctly


# vault policy write admin policies/admin/policy.hcl # Hashicorp vault have admin namespace pre-configured; you can either rename admin to something else; works fine on local vault server

if  [ -z ${VAULT_ADDR} ] && [ -z ${VAULT_TOKEN}]
then
  echo "Please set VAULT_ADDR and VAULT_TOKEN."
  exit 0
fi

vault policy write cb-dev policies/backend/cb-dev.hcl
vault policy write cw-dev policies/worker/cw-dev.hcl

vault auth enable approle
vault secrets enable -version=2 -path=dev kv

vault write auth/approle/role/cb-dev \
  secret_id_ttl=0 \
  token_ttl=20m \
  token_max_ttl=30m \
  policies="cb-dev"

vault write auth/approle/role/cw-dev \
  secret_id_ttl=0 \
  token_ttl=20m \
  token_max_ttl=30m \
  policies="cw-dev"


vault read auth/approle/role/cb-dev/role-id | grep "role_id" | awk '{print $2}' > internal/backend/role_id.txt
vault write -f auth/approle/role/cb-dev/secret-id | grep "secret_id" | awk '{print $2}' | head -1 > internal/backend/secret_id.txt

vault read auth/approle/role/cw-dev/role-id | grep "role_id" | awk '{print $2}' > internal/worker/role_id.txt
vault write -f auth/approle/role/cw-dev/secret-id | grep "secret_id" | awk '{print $2}' | head -1 > internal/worker/secret_id.txt

