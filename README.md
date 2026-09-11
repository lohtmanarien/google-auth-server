# Google Auth Server

Servidor simples em Node.js para autenticação com Google OAuth2.

## Como funciona
- Recebe o código de login do Google em `/oauth2redirect`
- Troca pelo token de acesso
- Busca o e-mail do usuário
- Retorna em JSON para o jogo

## Variáveis de ambiente
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
