import React, { useState, useEffect } from "react";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";
import "./index.css";
import Logo from './assets/cj49.png'
import soundFile from "./assets/effect.mp3";

interface Password {
  id: string;
  value: string;
  chamada: boolean;
}

const App: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [lastPostedPassword, setLastPostedPassword] = useState<string | null>(null);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = (password: string) => {
    const newPassword: Password = {
      id: Date.now().toString(),
      value: password,
      chamada: false,
    };
    setPasswords([newPassword, ...passwords]);
    setCurrentPassword(password);
    setLastPostedPassword(password);
  };
  
  

  const handleClickPassword = (id: string) => {
    const updatedPasswords = passwords.map((password) => {
      if (password.id === id) {
        password.chamada = !password.chamada;
      }
      return password;
    });
    setPasswords(updatedPasswords);

    const clickedPassword = updatedPasswords.find(
      (password) => password.id === id
    );
    if (clickedPassword) {
      setCurrentPassword(clickedPassword.value);

      const audio = new Audio(soundFile);
      audio.play();
    }
  };

  const preparacaoPasswords = passwords
    .filter((password) => !password.chamada)
    .slice(0, 6);

  const halfIndex = Math.ceil(preparacaoPasswords.length / 2);
  const firstColumnPasswords = preparacaoPasswords.slice(0, halfIndex);
  const secondColumnPasswords = preparacaoPasswords.slice(halfIndex);

  return (
    <>
      <div className="container">
        <div className="left-side">
          <div className="password-container">
            {currentPassword ? (
              <div className="password">{currentPassword}</div>
            ) : (
              <div className="password"></div>
            )}
          </div>
          <PasswordForm onAddPassword={addPassword} />

          {lastPostedPassword && (
            <div className="last-posted-password">
              Última senha postada: {lastPostedPassword}
            </div>
          )}
        </div>
        <div className="right-side">
            <img src={Logo} alt="" />
            <h1>SENHAS PRONTAS: </h1>
          <div className="preparacao-passwords">
            <div className="password-columns">
              <div className="password-column">
                <PasswordList
                  passwords={firstColumnPasswords}
                  onClickPassword={handleClickPassword}
                />
              </div>
              <div className="password-column">
                <PasswordList
                  passwords={secondColumnPasswords}
                  onClickPassword={handleClickPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
