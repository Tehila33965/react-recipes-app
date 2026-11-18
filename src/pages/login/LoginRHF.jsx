import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { login } from "../../services/auth";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'אימייל הוא שדה חובה',
      'string.email': 'כתובת האימייל אינה תקינה',
      'any.required': 'אימייל הוא שדה חובה',
}),
  password: Joi.string()
  .min(6)
  .required()
  .messages({
    'string.empty': 'סיסמא היא שדה חובה',
    'string.min': 'סיסמא חייבת להכיל לפחות 6 תווים',
    'any.required': 'סיסמא היא שדה חובה',
  }),
});

export default function LoginRHF() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "chef@recipes.com", password: "" },
  });

  function onSubmit(data) {
    const user = login(data);
    if (!user) {
      setGeneralError("אימייל או סיסמא שגויים");
      return;
    }
    setGeneralError("");
    navigate("/recipes");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>React Hook Form</h2>

      <div>
        <input placeholder="אימייל" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <input type="password" placeholder="סיסמא" {...register("password")} />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      {generalError && <p style={{ color: "red" }}>{generalError}</p>}

      <button type="submit">התחברות</button>
    </form>
  );
}