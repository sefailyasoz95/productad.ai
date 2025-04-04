
import React from 'react';
import { Button } from "@/components/ui/button";
import { Apple, Mail } from "lucide-react";
import { FcGoogle } from 'react-icons/fc';

interface SignInDialogProps {
  onSignIn: () => void;
}

const SignInDialog = ({ onSignIn }: SignInDialogProps) => {
  return (
    <div className="flex flex-col space-y-4 py-4">
      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 w-full py-6"
        onClick={onSignIn}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 w-full py-6"
        onClick={onSignIn}
      >
        <Apple className="h-5 w-5" />
        <span>Sign in with Apple</span>
      </Button>
      
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 w-full py-6"
        onClick={onSignIn}
      >
        <Mail className="h-5 w-5" />
        <span>Sign in with Email</span>
      </Button>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default SignInDialog;
