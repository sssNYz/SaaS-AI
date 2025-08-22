"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { 
    data: session, 
} = authClient.useSession() 

  const handleSignUp = async () => {
    const response = await authClient.signUp.email({
      name,
      email,
      password,
    },{
      onError: (error) => {
        window.alert("Sign up failed");
      },
      onSuccess: (data) => {
        window.alert("Sign up successful");
      },
    });
  };
  const handleLogin = async () => {
    const response = await authClient.signIn.email({
      email,
      password,
    },{
      onError: (error) => {
        window.alert("Sign up failed");
      },
      onSuccess: (data) => {
        window.alert("Sign up successful");
      },
    });
  };

  if(session){
    return <div className="flex flex-col items-center gap-4 p-4 w justify-center h-screen">
      <h1>Welcome {session.user?.name}</h1>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div> 
  }

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col items-center w justify-center h-screen">
        <h1>Sign Up</h1>
        <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
        
      </div>
      <div className="flex flex-col items-center gap-4 p-4 w justify-center h-screen">
        <h1>Login</h1>
        <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        
      </div>
    </div>
  );
}