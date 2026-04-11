"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState | null = null;

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-8 text-center shadow-sm">
        <h2 className="font-heading text-2xl font-semibold">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="space-y-5 rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required className="mt-1" />
          {state?.ok === false && state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-destructive">{state.fieldErrors.name[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="mt-1" />
          {state?.ok === false && state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-destructive">{state.fieldErrors.email[0]}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={6} required className="mt-1" />
        {state?.ok === false && state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-destructive">{state.fieldErrors.message[0]}</p>
        )}
      </div>
      {state?.ok === false && !state.fieldErrors && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
