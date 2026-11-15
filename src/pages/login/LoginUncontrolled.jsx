import { useActionState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";

function validate({ email, password }) {
    const errors = {};

    if (!email) {
        errors.email = "אימייל הוא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "כתובת האימייל אינה תקינה";
    }

    if (!password) {
        errors.password = "סיסמה היא שדה חובה";
    } else if (password.length < 6) {
        errors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }

    return errors;
}

const initialState = {
    values: { email: "chef@recipes.com", password: "" },
    errors: {},
    loginError: "",
};

function LoginUncontrolled() {
    const navigate = useNavigate();

    const [state, formAction] = useActionState((prevState, formData) => {
        const values = Object.fromEntries(formData);

        const errors = validate(values);
        if (Object.keys(errors).length > 0) {
            return { values, errors, loginError: "" };
        }

        const user = login(values);
        if (!user) {
            return { values, errors: {}, loginError: "אימייל או סיסמה שגויים" };
        }

        navigate("/recipes");
        return { values, errors: {}, loginError: "" };
    }, initialState);

    return (
        <div>
            <h1>טופס לא מבוקר</h1>

            <form action={formAction} noValidate>
                <div>
                    <label htmlFor="email">אימייל</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        defaultValue={state.values.email}
                    />
                    {state.errors.email && (
                        <p style={{ color: "red" }}>{state.errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">סיסמה</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        defaultValue={state.values.password}
                    />
                    {state.errors.password && (
                        <p style={{ color: "red" }}>{state.errors.password}</p>
                    )}
                </div>

                {state.loginError && <p style={{ color: "red" }}>{state.loginError}</p>}

                <button type="submit">התחברות</button>
            </form>
        </div>
    );
}

export default LoginUncontrolled;

//הפונקציה ב-action .רצה רק בשליחה, ולכן הבדיקה בטופס שלנו מתבצעת בשליחה בלבד