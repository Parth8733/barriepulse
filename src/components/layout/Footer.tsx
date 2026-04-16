export function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted">
          <span className="text-primary font-semibold">BarriePulse</span> — Built for Barrie, by Barrie.
        </p>
        <p className="text-xs text-muted mt-2">
          Data from Environment Canada, Ontario 511, RVH, CBC, City of Barrie, Metrolinx, and other public sources.
        </p>
        <p className="text-xs text-muted mt-1">
          Not affiliated with the City of Barrie. Open-source community project.
        </p>
      </div>
    </footer>
  );
}
