"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Utiliser signIn sans redirection automatique
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // La redirection sera gérée par le useEffect ci-dessus
      // quand la session sera mise à jour
    } catch (error) {
      setError("An error occurred during sign in");
      setIsLoading(false);
      console.error("Login error:", error);
    }
  };

  // Sample demo logins
  const demoLogins = [
    { label: "Admin", email: "admin@example.com", password: "password" },
    { label: "Doctor", email: "doctor@example.com", password: "password" },
    { label: "Patient", email: "patient@example.com", password: "password" },
  ];

  const handleDemoLogin = async (demoUser: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError("");

      // Utiliser signIn sans redirection automatique
      const result = await signIn("credentials", {
        redirect: false,
        email: demoUser.email,
        password: demoUser.password,
      });

      if (result?.error) {
        setError(`Invalid demo credentials: ${result.error}`);
        setIsLoading(false);
        return;
      }

      // La redirection sera gérée par le useEffect ci-dessus
      // quand la session sera mise à jour
    } catch (error) {
      setError("An error occurred during demo sign in");
      setIsLoading(false);
      console.error("Demo login error:", error);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credentials">Login</TabsTrigger>
            <TabsTrigger value="demo">Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="credentials">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Account Login</CardTitle>
                  <CardDescription>Enter your email and password to sign in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card>
              <CardHeader>
                <CardTitle>Demo Accounts</CardTitle>
                <CardDescription>Select a demo account to try out the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {demoLogins.map((demo, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDemoLogin(demo)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : `Login as ${demo.label}`}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
