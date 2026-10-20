import { notFound } from "next/navigation";

export default async function CatchAllPage() {
  await Promise.resolve();
  notFound();
}
