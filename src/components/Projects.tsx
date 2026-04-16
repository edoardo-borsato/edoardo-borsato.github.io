const projects = [
  {
    name: "edoardo-borsato.github.io",
    description:
      "This website — a personal site with an AI chatbot that answers questions about me. Built with Next.js and the Gemini API.",
    tech: "Next.js, TypeScript, Tailwind CSS, Gemini API",
    url: "https://github.com/edoardo-borsato/edoardo-borsato.github.io",
  },
  {
    name: "Xpense",
    description:
      "Personal finance tracking app built with .NET MAUI Blazor. Cross-platform mobile and desktop application.",
    tech: ".NET MAUI, Blazor, C#",
    url: "https://github.com/edoardo-borsato/xpense",
  },
  {
    name: "expenses-api",
    description:
      "A RESTful API for managing personal expenses (backend for Xpense), built with .NET and CosmosDB SDK.",
    tech: ".NET, C#, Azure, CosmosDB",
    url: "https://github.com/edoardo-borsato/expenses-api"
  },
  {
    name: "bard",
    description: "A CLI tool for DynamoDB backup, restore, and batch delete",
    "tech": "C#, .NET, AWS SDK",
    url: "https://github.com/edoardo-borsato/bard"
  }
];

export default function Projects() {
  return (
    <section className="border-t border-zinc-200 py-16 px-6 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Projects
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
            >
              <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                {project.tech}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
