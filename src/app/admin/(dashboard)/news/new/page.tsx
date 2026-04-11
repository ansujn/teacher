import { NewsForm } from "../NewsForm";

export const metadata = { title: "New post — Admin" };

export default function NewNewsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">New news post</h1>
      <div className="mt-8">
        <NewsForm />
      </div>
    </div>
  );
}
