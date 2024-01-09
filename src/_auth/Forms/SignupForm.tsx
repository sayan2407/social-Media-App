import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validations";

import { useState } from "react";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";

import { useSnackbar } from "notistack";

import { useNavigate } from "react-router-dom";
import { useCreateUseraccountMutation, useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";



const SignupForm = () => {

  const { enqueueSnackbar } = useSnackbar();


  // const [ isLoading, setisLoading ] = useState(false);

  const {mutateAsync: createUser, isLoading: isCreatingUser} = useCreateUseraccountMutation();

  const {mutateAsync:signInAccount, isLoading: isSigningIn } = useSignInAccount();

  const navigate =  useNavigate();

const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); 


          // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newUser = await createUser(values); 

    if ( newUser ) {
      enqueueSnackbar("Logged in successfully", {variant: 'success'});

      console.log('values: ' , values.email);
      
      
      const session = await signInAccount({
        email:  values.email,
        password:  values.password
      }
       
       
      );

      if (!session) {
      enqueueSnackbar("Sign In Failed, Please try again !!", {variant: 'warning'});

      }

      const isLoggedIn = await checkAuthUser();

      if ( isLoggedIn ) {
        form.reset();
        navigate("/");

      } else {
        enqueueSnackbar("SignUp went wrong!!", {variant: 'warning'});
      }
    } else {
      enqueueSnackbar("Something went wrong!!", {variant: 'warning'});
    }
    console.log(newUser)
  }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4 justify-center items-center">
          <div className="text-center ">
            <h2><b>Create your account</b></h2>
            <p><i>register and connect with your friends</i></p>
          </div>
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter Username" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter Username" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
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
                  <Input type="text" className="shad-input" placeholder="Enter Email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
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
                  <Input type="text" className="shad-input" placeholder="Enter Strong password" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isCreatingUser ? (
              <div className="flex gap-2">
                <Loader/>
                <p>Loading ....</p>
              </div>
              
            ):(
              <div> Sign Up</div>
             
            )}
          </Button>
          <p className="text-center mt-3 text-small-regular text-light-2">Already have an accountr? 
          <Link className="text-underline text-purple-500 ml-2" to="/sign-in">Sign In</Link></p>
        </form>
      </Form>
    )
}

export default SignupForm;