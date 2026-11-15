import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";

/*
 * שאלה: האם אפשר לבדוק תקינות בעת הקלדה, בשליחה בלבד, או בכלל לא?
 *
 * תשובה: בטופס לא מבוקר אין state שמעודכן בכל הקשה, ולכן אין לנו גישה
 * לערכים בזמן ההקלדה. הפונקציה שב-action מקבלת את הערכים רק ברגע השליחה,
 * ולכן הבדיקה מתבצעת בשליחה בלבד.
 * (אפשר טכנית להוסיף onChange או ref לכל שדה ולבדוק בזמן הקלדה,
 * אבל אז הטופס כבר לא "לא מבוקר" באמת.)
 */

export default function LoginUncontrolled() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [defaults, setDefaults] = useState({
    email: "chef@recipes.com",
    password: "",
  });

    function handleAction(formData) {
    const values = Object.fromEntries(formData);
    const newErrors = {};

    if (!values.email) {
        newErrors.email = "אימייל הוא שדה חובה";
    }
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        newErrors.email = "כתובת אימייל לא חוקית";
    }
    if (!values.password) {
        newErrors.password = "סיסמא היא שדה חובה";
    } else if (values.password.length < 6) {
        newErrors.password = "סיסמא חייבת להכיל לפחות 6 תווים";
    }

    setDefaults({email: values.email, password: values.password});

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setErrors({});

    navigate("/recipes");
  }
  return (
    <form action={handleAction}>
      <h2>Uncontrolled</h2>

      <div>
        <input
          name="email"
          placeholder="אימייל"
          defaultValue={defaults.email}
          key={"email-" + defaults.email}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="סיסמא"
          defaultValue={defaults.password}
          key={"password-" + defaults.password}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <button type="submit">התחברות</button>
    </form>
  );
}