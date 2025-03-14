import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, KeyRound, User, Eye, EyeOff, Plus, Trash2, CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const birthdaySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  date: z.date({
    required_error: "Data de aniversário é obrigatória",
  }),
});

const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirmar senha é obrigatório"),
  gender: z.enum(["masculino", "feminino", "outro", "prefiro_nao_informar"], {
    required_error: "Gênero é obrigatório",
  }),
  birthdays: z.array(birthdaySchema).min(1, "Adicione pelo menos um aniversário"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;
type BirthdayFormValues = z.infer<typeof birthdaySchema>;

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [birthYear, setBirthYear] = useState(new Date().getFullYear());

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "prefiro_nao_informar",
      birthdays: [{ name: "", date: new Date() }],
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setSignupError(null);

    try {
      console.log("Signup attempt with:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demonstration - show error for testing
      // setSignupError("Este email já está registrado.");
      
      // If successful, you would typically:
      // 1. Register the user
      // 2. Log them in automatically
      // 3. Redirect to dashboard or home page
    } catch (error) {
      setSignupError("Erro ao criar conta. Por favor, tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addBirthday = () => {
    const currentBirthdays = form.getValues().birthdays || [];
    const lastBirthday = currentBirthdays[currentBirthdays.length - 1];
    
    if (!lastBirthday.name || !lastBirthday.date) {
      toast.error("Preencha o nome e a data do aniversariante atual antes de adicionar outro.");
      return;
    }
    
    form.setValue("birthdays", [
      ...currentBirthdays,
      { name: "", date: new Date() }
    ]);
  };

  const removeBirthday = (index: number) => {
    const currentBirthdays = form.getValues().birthdays;
    if (currentBirthdays.length > 1) {
      form.setValue(
        "birthdays",
        currentBirthdays.filter((_, i) => i !== index)
      );
    }
  };

  const changeYear = (amount: number) => {
    setBirthYear(prev => prev + amount);
  };

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const startYear = Math.max(1900, birthYear - 50);
    const endYear = Math.min(currentYear, birthYear + 50);
    return { from: new Date(startYear, 0, 1), to: new Date(endYear, 11, 31) };
  };

  return (
    <div className="min-h-screen bg-katcakes-lightgray flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">
            Crie sua conta
          </h1>
          <p className="text-katcakes-gray">
            Junte-se a nós para encomendar bolos deliciosos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registrar</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {signupError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{signupError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="Seu nome"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="seu@email.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="masculino" id="masculino" />
                            <FormLabel htmlFor="masculino" className="font-normal cursor-pointer">
                              Masculino
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feminino" id="feminino" />
                            <FormLabel htmlFor="feminino" className="font-normal cursor-pointer">
                              Feminino
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outro" id="outro" />
                            <FormLabel htmlFor="outro" className="font-normal cursor-pointer">
                              Outro
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="prefiro_nao_informar" id="prefiro_nao_informar" />
                            <FormLabel htmlFor="prefiro_nao_informar" className="font-normal cursor-pointer">
                              Prefiro não informar
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Aniversários</FormLabel>
                  <div className="space-y-3">
                    {form.watch("birthdays")?.map((_, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Aniversário {index + 1}</h4>
                          {form.watch("birthdays").length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBirthday(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name={`birthdays.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nome da pessoa"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`birthdays.${index}.date`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de aniversário</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full pl-3 text-left font-normal flex justify-between",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "dd/MM/yyyy")
                                        ) : (
                                          <span>Selecionar data</span>
                                        )}
                                        <CalendarIcon className="h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <div className="p-2 flex justify-between items-center border-b">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => changeYear(-10)}
                                      >
                                        <ChevronDown className="h-4 w-4" />
                                        <span className="sr-only">10 anos atrás</span>
                                      </Button>
                                      <div className="flex gap-2 items-center">
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => changeYear(-1)}
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                          <span className="sr-only">Ano anterior</span>
                                        </Button>
                                        <span className="font-medium">{birthYear}</span>
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => changeYear(1)}
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                          <span className="sr-only">Próximo ano</span>
                                        </Button>
                                      </div>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => changeYear(10)}
                                      >
                                        <ChevronUp className="h-4 w-4" />
                                        <span className="sr-only">10 anos depois</span>
                                      </Button>
                                    </div>
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        if (date) {
                                          field.onChange(date);
                                          setBirthYear(date.getFullYear());
                                        }
                                      }}
                                      defaultMonth={
                                        field.value || new Date(birthYear, 0, 1)
                                      }
                                      fromYear={1900}
                                      toYear={new Date().getFullYear()}
                                      captionLayout="dropdown-buttons"
                                      fromDate={getYearRange().from}
                                      toDate={getYearRange().to}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addBirthday}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar outro aniversário
                    </Button>
                  </div>
                  {form.formState.errors.birthdays?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.birthdays.message}
                    </p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            placeholder="********"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Eye className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            placeholder="********"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Eye className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Eu concordo com os{" "}
                          <Link
                            to="/terms"
                            className="text-katcakes-black font-medium hover:underline"
                          >
                            termos e condições
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Criar conta"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center">
              <span className="text-katcakes-gray">Já tem uma conta? </span>
              <Link to="/login" className="text-katcakes-black font-medium hover:underline">
                Entrar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
