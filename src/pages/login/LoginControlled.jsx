import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";

function LoginControlled() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "chef@recipes.com",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    function validate() {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = "אימייל הוא שדה חובה";
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            newErrors.email = "כתובת האימייל אינה תקינה";
        }

        if (!values.password) {
            newErrors.password = "סיסמה היא שדה חובה";
        } else if (values.password.length < 6) {
            newErrors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validate();
        setErrors(newErrors);
        setLoginError("");

        if (Object.keys(newErrors).length > 0) return;

        const user = login(values);
        if (!user) {
            setLoginError("אימייל או סיסמה שגויים");
            return;
        }

        navigate("/recipes");
    }

    return (
        <div>
            <h1>טופס מבוקר</h1>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="email">אימייל</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password">סיסמא</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>

                {loginError && <p style={{ color: "red" }}>{loginError}</p>}

                <button type="submit">התחברות</button>
            </form>
        </div>
    );
}

export default LoginControlled;