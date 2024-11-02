"use client";

import { FormEvent, useState } from "react";
import { fetchApiPost } from "@/common/services/fetch-api";
import { useRouter } from "next/navigation";

const LoginPageModes = {
  LOGIN: "login",
  REGISTRATION: "registration",
} as const;

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<
    typeof LoginPageModes.LOGIN | typeof LoginPageModes.REGISTRATION
  >(LoginPageModes.LOGIN);
  const isLogin = mode === LoginPageModes.LOGIN;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);

  const onModeSwitch = () => {
    setMode(isLogin ? LoginPageModes.REGISTRATION : LoginPageModes.LOGIN);
    setError(null);
  };

  const onDisplayPasswordToggle = () => {
    setDisplayPassword((curr) => !curr);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setError(null);
      setIsLoading(true);
      e.preventDefault();

      const endpoint = `/auth/${mode}`;

      const { accessToken } = await fetchApiPost({
        endpoint,
        body: { email, password },
      });

      localStorage.setItem("token", accessToken);

      router.push("operations");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>{isLogin ? "ВХІД" : "РЕЄСТРАЦІЯ"}</h1>
        <form style={formStyle} onSubmit={onSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              email
            </label>
            <input
              type="text"
              id="email"
              name="username"
              style={inputStyle}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={formGroupStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label htmlFor="password" style={labelStyle}>
                Password
              </label>
              <a
                onClick={onDisplayPasswordToggle}
                style={{ fontSize: "12px", cursor: "pointer" }}
              >
                {displayPassword ? "Hide password" : "Show password"}
              </a>
            </div>
            <input
              type={displayPassword ? "text" : "password"}
              id="password"
              name="password"
              style={inputStyle}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: "red" }}>
              {Array.isArray(error) ? (
                <ul style={{ textAlign: "start" }}>
                  {error.map((message, idx) => (
                    <li key={idx}>{message}</li>
                  ))}
                </ul>
              ) : (
                <p>{error}</p>
              )}
            </div>
          )}

          <a
            style={{
              textAlign: "start",
              cursor: "pointer",
              color: "aliceblue",
            }}
            onClick={onModeSwitch}
          >
            {isLogin ? "switch to registration" : "Have a account? Login"}
          </a>
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLogin ? "Війти" : "Зареєструватись"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Стилі для сторінки, форми, полів введення та кнопки
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#1A1A1D",
};

const formContainerStyle = {
  width: "400px",
  padding: "40px",
  backgroundColor: "#2E2E2E",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

const titleStyle = {
  color: "#FFA500",
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const formGroupStyle = {
  marginBottom: "20px",
  textAlign: "left",
};

const labelStyle = {
  color: "#F0F0F0",
  fontSize: "16px",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #333",
  backgroundColor: "#1A1A1D",
  color: "#F0F0F0",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  margin: "14px 0 0 0",
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1A1A1D",
  backgroundColor: "#FFA500",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background 0.3s",
};
