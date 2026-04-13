export default function Experience() {
  return (
    <section className="border-t border-zinc-200 py-16 px-6 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Experience & Highlights
        </h2>

        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Open Source Contribution
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Contributed to the{" "}
              <a
                href="https://github.com/grpc/grpc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
              >
                gRPC
              </a>{" "}
              open-source project — a high-performance RPC framework used across
              the industry.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Research Publication
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Published a paper at{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                ECCV
              </span>{" "}
              (European Conference on Computer Vision) — one of the top-tier
              venues for computer vision research.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tech Stack
            </h3>
            <div className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <span className="font-medium text-zinc-800 dark:text-zinc-300">
                  Day to day:
                </span>{" "}
                C#, .NET, ASP.NET Core, SQL Server, PostgreSQL, Git, REST APIs
              </div>
              <div>
                <span className="font-medium text-zinc-800 dark:text-zinc-300">
                  Regularly:
                </span>{" "}
                TypeScript, Docker, AWS, Azure, gRPC, CI/CD pipelines
              </div>
              <div>
                <span className="font-medium text-zinc-800 dark:text-zinc-300">
                  Occasionally:
                </span>{" "}
                Python, C++, React, Angular
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
