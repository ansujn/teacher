import { CastForm } from "../CastForm";

export const metadata = { title: "New cast member" };

export default function NewCastPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">New cast member</h1>
      <div className="mt-8">
        <CastForm />
      </div>
    </div>
  );
}
