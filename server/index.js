import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

import {
  isValidEmail,
  isValidPassword,
  isValidCPF,
  isValidCNPJ,
} from "../shared/validations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/", (req, res) => {
  res.redirect("/registration");
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.post("/registration", (req, res) => {
  console.log("BODY:", req.body);
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
