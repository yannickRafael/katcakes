
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Phone, Plus, Trash2, ArrowRight } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { UserBirthday } from "@/lib/firebase";

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
const phoneRegex = /^(\+258|0)?(8[234567][0-9]{7})$/;

const birthdaySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  date: z.string()
    .min(1, "Data de aniversário é obrigatória")
    .regex(dateRegex, "Data deve estar no formato DD/MM/YYYY")
    .refine((date) => {
      if (!dateRegex.test(date)) return false;
      
      const [day, month, year] = date.split('/').map(Number);
      
      const dateObj = new Date(year, month - 1, day);
      return dateObj.getDate() === day && 
             dateObj.getMonth() === month - 1 && 
             dateObj.getFullYear() === year;
    }, "Data inválida"),
});

const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phoneNumber: z.string()
    .min(1, "Número de telefone é obrigatório")
    .regex(phoneRegex, "Número de telefone inválido. Use formato moçambicano (84/85/86/87xxxxxxx)"),
  gender: z.enum(["masculino", "feminino", "outro", "prefiro_nao_informar"], {
    required_error: "Gênero é obrigatório",
  }),
  birthdays: z.array(birthdaySchema).min(1, "Adicione pelo menos um aniversário"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const formData = useRef<SignupFormValues | null>(null);
  const { signup, sendPhoneVerification } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      gender: "prefiro_nao_informar",
      birthdays: [{ name: "", date: "" }],
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setSignupError(null);
    formData.current = data;

    try {
      // Send verification code
      const result = await sendPhoneVerification(data.phoneNumber, "phone-signup-button");
      setConfirmationResult(result);
      setVerificationDialogOpen(true);
    } catch (error: any) {
      setSignupError(error.message || "Erro ao criar conta. Por favor, tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult || !formData.current) return;

    setIsLoading(true);
    try {
      await confirmationResult.confirm(verificationCode);
      
      // After successful verification, create the user account
      // Create proper UserBirthday objects (name and date are non-optional)
      const formattedBirthdays: UserBirthday[] = formData.current.birthdays.map(birthday => ({
        name: birthday.name,
        date: birthday.date
      }));
      
      const userProfileData = {
        displayName: formData.current.name,
        phoneNumber: formData.current.phoneNumber,
        gender: formData.current.gender,
        birthdays: formattedBirthdays,
      };
      
      await signup(formData.current.phoneNumber, userProfileData);
      
      // Close dialog and navigate to home
      setVerificationDialogOpen(false);
      navigate("/");
    } catch (error: any) {
      setSignupError(error.message || "Código de verificação inválido. Por favor, tente novamente.");
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
      { name: "", date: "" }
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
                                <FormControl>
                                  <Input
                                    placeholder="DD/MM/AAAA"
                                    {...field}
                                  />
                                </FormControl>
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

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  id="phone-signup-button"
                >
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

        <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verificação de telefone</DialogTitle>
              <DialogDescription>
                Digite o código de 6 dígitos enviado para seu número de telefone
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode} 
                  onChange={setVerificationCode}
                  pattern="^[0-9]+$"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                disabled={verificationCode.length !== 6 || isLoading}
                onClick={handleVerifyCode}
                className="w-full"
              >
                {isLoading ? "Verificando..." : "Verificar"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SignupPage;
