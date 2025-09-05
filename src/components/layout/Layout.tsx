import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <main className="pb-16 pt-2">
        <div className="container px-4 py-4">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}