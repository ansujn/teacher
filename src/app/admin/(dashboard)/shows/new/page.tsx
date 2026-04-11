import { ShowForm } from "../ShowForm";

export const metadata = { title: "New show — Admin" };

export default function NewShowPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">New show</h1>
      <p className="mt-1 text-muted-foreground">Add a production to your catalogue.</p>
      <div className="mt-8">
        <ShowForm />
      </div>
    </div>
  );
}
