"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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

const login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usercode: "", // later use this to get values from db
      password: "", // later use this to get values from db
    },
  });

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
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <CardAction className="w-full flex justify-end">
              <Button className="cursor-pointer" type="submit">
                Login
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

function onSubmit(values: z.infer<typeof loginSchema>) {
  // handle to submitting and login here
  console.log(values);
}

export default login;
