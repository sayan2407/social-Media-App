
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
import { SignInValidation } from "@/lib/validations";
import { Link } from "react-router-dom";
import { signInAccount } from "@/lib/appwrite/api";
import { useSnackbar } from "notistack";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";


 

const SigninForm = () => {

  const { enqueueSnackbar } = useSnackbar();
const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); 
const navigate = useNavigate();

      // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      username: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    const session = await signInAccount({
      email:  values.email,
      password:  values.password
    });

    if ( !session ) {
      enqueueSnackbar("Sign In Failed, Please try again !!", {variant: 'warning'});

    } else {
      const isLoggedIn = await checkAuthUser();

      if ( isLoggedIn ) {
        form.reset();
        navigate("/");
  
      } else {
        enqueueSnackbar("SignUp went wrong!!", {variant: 'warning'});
      }
    }

    
  }
      
    return (
        <div>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
     
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter Email " {...field} />
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
          {isUserLoading ? (
              <div className="flex gap-2">
                <Loader/>
                <p>Loading ....</p>
              </div>
              
            ):(
              <div> Sign In</div>
             
            )}
          </Button>

          <p className="text-center mt-3 text-small-regular text-light-2">Don't have an accountr? 
          <Link className="text-underline text-purple-500 ml-2" to="/sign-up">Sign Up</Link></p>
        </form>
      </Form>
            
        </div>
    )
}

export default SigninForm;