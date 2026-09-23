import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // تعديل: استيراد useNavigate

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  const { signUp, user, login, logout } = useContext(AuthContext);

  // إذا كان المستخدم مسجلاً دخوله بالفعل، يتم توجيهه إلى الرئيسية فوراً
  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // التعامل مع إرسال البيانات
  function onSubmit(data) {
    setAuthError("");

    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (!result.success) {
      setAuthError(result.message);
    } else {
      reset();
      navigate("/"); // الانتقال إلى الرئيسية عند نجاح العملية
    }
  }

  // التبديل بين التسجيل والدخول مع مسح الأخطاء والحقول
  function switchMode(newMode) {
    setMode(newMode);
    setAuthError("");
    reset();
    // تم حذف navigate("/") هنا حتى لا يتم التوجيه عند مجرد التبديل
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user ? (
            <div className="logged-in-box">
              <h2>Welcome back!</h2>
              <p>
                User Logged in: <strong>{user.email}</strong>
              </p>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <h1 className="page-title">
                {mode === "signup" ? "Sign Up" : "Log In"}
              </h1>

              {authError && <div className="auth-error-alert">{authError}</div>}

              <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be at most 12 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="form-error">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button className="btn btn-primary btn-large" type="submit">
                  {mode === "signup" ? "Sign Up" : "Log In"}
                </button>
              </form>

              <div className="auth-switch">
                {mode === "signup" ? (
                  <p>
                    Already have an account?{" "}
                    <span
                      className="auth-link"
                      onClick={() => switchMode("login")}
                    >
                      Log In
                    </span>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{" "}
                    <span
                      className="auth-link"
                      onClick={() => switchMode("signup")}
                    >
                      Sign Up
                    </span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
