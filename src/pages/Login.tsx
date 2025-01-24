import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { AuthLayout } from "../components/layout/auth-Layout";
import { Toaster, toast } from "sonner";
import { login } from "../services/auth.service";

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    contact: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const {user} = useAuth()

  // useEffect(() => {
  //     // logout on render
  //     signOut();
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // alert(JSON.stringify(formData));
    try {
      const resp = await login(formData.contact, formData.password);
      if (!resp.success) {
        setErrorMessage(resp.message);
        toast.error(resp.message);
        return;
      }
      setUser(resp.data);
      toast.success("Login successful");
      const redirectTo = "/dashboard";
      navigate(redirectTo);
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message);
      setErrorMessage(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md mx-auto">
        <Toaster />
        <h1 className="text-2xl font-semibold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and password to continue
        </p>

        {errorMessage && (
          <div
            className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center"
            aria-live="polite"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              value={formData.contact}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, contact: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, rememberMe: !!checked }))
              }
            />
            <label
              htmlFor="remember"
              className="text-sm leading-none cursor-pointer"
            >
              Remember Me
            </label>
          </div>

          <Button
            type="submit"
            className={`w-full ${
              isLoading ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-600 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
