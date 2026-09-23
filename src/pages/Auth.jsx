import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [authError, setAuthError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setAuthError("");
    const result =
      mode === "signup"
        ? register(data.name || "Customer", data.email, data.password)
        : login(data.email, data.password);

    if (!result.ok) {
      setAuthError(result.message);
      return;
    }

    reset();
    navigate("/");
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setAuthError("");
    reset();
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>
          {authError && <div className="error-message">{authError}</div>}
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {mode === "signup" && (
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-input"
                  id="name"
                  {...registerField("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="form-error">{errors.name.message}</span>
                )}
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...registerField("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                {...registerField("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              {mode === "signup" ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              className="auth-link"
              onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
            >
              {mode === "signup" ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
