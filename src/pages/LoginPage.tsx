
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

const phoneRegex = /^(\+258|0)?(8[234567][0-9]{7})$/;

const loginSchema = z.object({
  phoneNumber: z.string()
    .min(1, "Número de telefone é obrigatório")
    .regex(phoneRegex, "Número de telefone inválido. Use formato moçambicano (84/85/86/87xxxxxxx)"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await login(data.phoneNumber);
      // Redirect user to home page after successful login
      navigate("/");
    } catch (error: any) {
      setLoginError(error.message || "Falha na autenticação. Por favor, tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-katcakes-lightgray flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">
            Bem-vindo novamente
          </h1>
          <p className="text-katcakes-gray">
            Entre na sua conta para continuar
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Entre com seu número de telefone para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de telefone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="84xxxxxxx"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              <span className="text-katcakes-gray">Não tem uma conta? </span>
              <Link to="/signup" className="text-katcakes-black font-medium hover:underline">
                Registrar-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
