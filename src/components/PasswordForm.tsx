// src/components/PasswordForm.tsx

import React, { useState, FormEvent, ChangeEvent } from "react";

interface PasswordFormProps {
  onAddPassword: (password: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onAddPassword }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (/^\d{1,5}$/.test(password)) {
      // Ensures that the password contains at least 1 and at most 5 digits
      onAddPassword(password);
      setPassword("");
    } else {
      alert("Por favor, digite entre 1 e 5 dígitos numéricos.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    // Ensures that only numeric digits are accepted and limits to 5 characters
    if (/^\d{0,5}$/.test(inputText)) {
      setPassword(inputText);
    }
  };

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <input
        className="password-input"
        type="text" // Changed from "number" to "text"
        placeholder="Digite a senha"
        maxLength={5}
        value={password}
        onChange={handleChange}
      />
      <button className="submit-button" type="submit">
        Adicionar
      </button>
    </form>
  );
};

export default PasswordForm;
