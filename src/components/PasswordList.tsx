// src/components/PasswordList.tsx

import React from "react";

interface Password {
  id: string;
  value: string;
  chamada: boolean;
}

interface PasswordListProps {
  passwords: Password[];
  onClickPassword: (id: string) => void;
}

const PasswordList: React.FC<PasswordListProps> = ({
  passwords,
  onClickPassword,
}) => {
  return (
    <div className="password-list">
      {passwords.map((password) => (
        <div
          key={password.id}
          className={`password-card ${
            password.chamada ? "password-chamada" : "password-preparacao"
          }`}
          onClick={() => onClickPassword(password.id)}
        >
          <span className="password-text">{password.value}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;
