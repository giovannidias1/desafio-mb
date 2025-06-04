# Desafio MB

Este projeto é dividido em três partes:

- **client**: Aplicação frontend em Vue 3 com Vite
- **server**: API backend simples usando Node.js + Express
- **shared**: Módulo com validações reutilizadas entre front e back

---

## ✅ Requisitos

- **Node.js**: v20.10.0
- **Vue**: ^3.5.13
- **Vite**: ^6.3.5

---

## 📁 Estrutura

```
project-root/
├── client/     # Frontend Vue 3
├── server/     # Backend Node.js + Express
└── shared/     # Validações reutilizáveis (ex: CPF, CNPJ, senha)
```

---

## 🚀 Como rodar

### 1. Instalar dependências

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Rodar o servidor (backend)

```bash
cd server
node index.js
```

> Servidor disponível em: `http://localhost:3000`

---

### 3. Rodar o cliente (frontend)

```bash
cd ../client
npm run dev
```

> Aplicação disponível em: `http://localhost:5173`

---

## 🔄 Shared

A pasta `shared` contém funções utilitárias de validação como:

- `isValidCPF(cpf)`
- `isValidCNPJ(cnpj)`
- `isValidPassword(password)`
- `allowOnlyNumbers(string)`

Essas funções são importadas tanto no `client` quanto no `server`, garantindo consistência de validação nos dois ambientes.

---

## 📌 Observações

- Este projeto usa **Vite 6** com **Vue 3.5**
- As validações são aplicadas em tempo real no frontend e validadas novamente no backend

---

## 🧪 Teste rápido

Envie um POST para `http://localhost:3000/registration` com os dados do formulário no formato JSON. Exemplo:

```json
{
  "email": "teste@teste.com",
  "password": "Senha@123",
  "type": "PF",
  "cpf": "123.456.789-00"
}
```

---

## 📬 Contato

Contribuições e sugestões são bem-vindas!
