"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/app/_common/forms/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usercode: "", // later use this to get values from db
      password: "", // later use this to get values from db
    },
  });

  // const [code, setCode] = useState("");
  // const [password, setPassword] = useState("");

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    // e.preventDefault();
    try {
      const res = await signIn("credentials", {
        code: values.usercode,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        // setLoading(false);
        // router.push("/");
        window.location.href = "/main/dashboard";
      } else {
        toast.error("Login Failed", {
          description: "Invalid usercode or password",
        });
        // setLoading(false);
      }
    } catch (error) {
      // setError("An unexpected error occurred");
      // setLoading(false);
      window.location.href = "/";
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Log In to Your Account</CardTitle>
            <CardDescription>
              Please log in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="usercode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usercode</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="3 characters employee code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardAction className="w-full flex justify-end">
                  <Button className="cursor-pointer" type="submit">
                    Login
                  </Button>
                </CardAction>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// function onSubmit(values: z.infer<typeof loginSchema>) {
//   // handle to submitting and login here
//   console.log(values);
// }

export default Login;
