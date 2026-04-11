"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex w-full max-w-md gap-2 justify-self-end"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const res = await subscribeNewsletter(email);
          if (res.ok) {
            toast.success("Subscribed — thanks!");
            setEmail("");
          } else {
            toast.error(res.error ?? "Something went wrong");
          }
        });
      }}
    >
      <Input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-background"
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
