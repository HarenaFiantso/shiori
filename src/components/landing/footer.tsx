export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/50 border-t px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <span className="text-primary text-sm font-bold">栞</span>
          </div>
          <span className="font-medium">Shiori</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {currentYear} Shiori. Created by{' '}
          <a href="https://github.com/HarenaFiantso" target="_blank" rel="noopener noreferrer">
            Harena Fiantso
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
