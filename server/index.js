const express = require("express");
const path = require("path");
const {
  isValidEmail,
  isValidPassword,
  isValidCPF,
  isValidCNPJ,
} = require("./shared/validations");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/", (req, res) => {
  res.redirect("/registration");
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.post("/registration", (req, res) => {
  const {
    email,
    password,
    type,
    name,
    cpf,
    birthdate,
    razaoSocial,
    cnpj,
    openingDate,
    phone,
  } = req.body;

  if (!email || !password || !type || !phone) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido." });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "Senha fraca." });
  }

  if (type === "PF") {
    if (!name || !cpf || !birthdate) {
      return res
        .status(400)
        .json({ error: "Campos de pessoa física incompletos." });
    }
    if (!isValidCPF(cpf)) {
      return res.status(400).json({ error: "CPF inválido." });
    }
  } else if (type === "PJ") {
    if (!razaoSocial || !cnpj || !openingDate) {
      return res
        .status(400)
        .json({ error: "Campos de pessoa jurídica incompletos." });
    }
    if (!isValidCNPJ(cnpj)) {
      return res.status(400).json({ error: "CNPJ inválido." });
    }
  } else {
    return res.status(400).json({ error: "Tipo de cadastro inválido." });
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
