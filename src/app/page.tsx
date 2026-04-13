import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Experience />
        <Projects />
      </main>
      <footer className="border-t border-zinc-200 py-8 px-6 dark:border-zinc-800">
        <p className="mx-auto max-w-3xl text-sm text-zinc-500 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Edoardo Borsato. Built with Next.js
          and Gemini.
        </p>
      </footer>
      <ChatWidget />
    </>
  );
}
