import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "../../utils/schema";
import { login } from "../../services/auth";

function LoginRhf() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
        defaultValues: { email: "chef@recipes.com", password: "" },
    });

    function onSubmit(data) {
        setLoginError("");

        const user = login(data);
        if (!user) {
            setLoginError("אימייל או סיסמה שגויים");
            return;
        }

        navigate("/recipes");
    }

    return (
        <div>
            <h1>טופס react-hook-form</h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label htmlFor="email">אימייל</label>
                    <input id="email" type="email" {...register("email")} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">סיסמה</label>
                    <input id="password" type="password" {...register("password")} />
                    {errors.password && (
                        <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                </div>

                {loginError && <p style={{ color: "red" }}>{loginError}</p>}

                <button type="submit">התחברות</button>
            </form>
        </div>
    );
}

export default LoginRhf;