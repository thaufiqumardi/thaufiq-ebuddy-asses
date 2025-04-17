import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "../config/firebaseClient";

export const handleAuthLogin = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Verify the user's email and password using Firebase Admin SDK
    const userCred = await signInWithEmailAndPassword(clientAuth, email, password);
    const token = await userCred.user.getIdToken(); // Get the ID token for the authenticated user

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(401).json({ error: "Invalid email or password" });
  }
}