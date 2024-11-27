import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <span className="text-3xl">Hello World!</span>
      <Button variant='custom' className="bg-white hover:bg-slate-400 text-black mt-5">Click me</Button>
    </div>
  );
}
