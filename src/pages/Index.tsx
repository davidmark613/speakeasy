import { TranslatorCard } from "@/components/TranslatorCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppLanguageSwitcher } from "@/components/AppLanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const { dir } = useI18n();
  
  return (
    <main className="min-h-screen py-8 px-4 md:py-16" dir={dir}>
      {/* Controls in top-right corner */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <AppLanguageSwitcher />
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto">
        <TranslatorCard />
      </div>
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </main>
  );
};

export default Index;
