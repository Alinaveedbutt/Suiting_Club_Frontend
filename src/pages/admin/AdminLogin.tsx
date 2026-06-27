import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid password");
                setLoading(false);
                return;
            }

            navigate("/admin/dashboard");
        } catch {
            setError("Connection error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin Login | Suiting Club</title>
            </Helmet>

            <main className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-sm"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-6 h-6 text-gold" />
                        </div>
                        <h1 className="font-display text-3xl text-foreground mb-2">
                            Admin Panel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Suiting Club — Order Management
                        </p>
                        <div className="w-12 h-px bg-gold mx-auto mt-4" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <Input
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-charcoal border-border focus:border-gold text-center h-12"
                                autoFocus
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="gold"
                            size="lg"
                            className="w-full"
                            disabled={loading || !password}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </motion.div>
            </main>
        </>
    );
};

export default AdminLogin;
