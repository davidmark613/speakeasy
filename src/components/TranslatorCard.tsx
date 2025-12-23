import { useState } from "react";
import { ArrowRightLeft, Copy, Check, Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector, languages } from "@/components/LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

export function TranslatorCard() {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: t("noTextToTranslate"),
        description: t("pleaseEnterText"),
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    
    // Simulate translation (will be replaced with actual AI translation)
    try {
      const sourceLang = languages.find((l) => l.code === sourceLanguage)?.name;
      const targetLang = languages.find((l) => l.code === targetLanguage)?.name;
      
      // Mock translation for now - shows the structure
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setTranslatedText(
        `[${t("translationFrom")} ${sourceLang} ${t("translationTo")} ${targetLang}]\n\n"${sourceText}"\n\n(${t("connectCloud")})`
      );
      
      toast({
        title: t("translationComplete"),
        description: t("translationSuccess"),
      });
    } catch (error) {
      toast({
        title: t("translationFailed"),
        description: t("translationError"),
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast({
      title: t("copiedToClipboard"),
      description: t("copiedDescription"),
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const sourceLanguageName = languages.find((l) => l.code === sourceLanguage)?.name;
  const targetLanguageName = languages.find((l) => l.code === targetLanguage)?.name;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow mb-4 shadow-glow">
          <Languages className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
          {t("appTitle")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          {t("appDescription")}
        </p>
      </div>

      {/* Language Selectors */}
      <div 
        className="flex flex-col md:flex-row items-center gap-4 mb-6 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex-1 w-full">
          <LanguageSelector
            value={sourceLanguage}
            onChange={setSourceLanguage}
            label={t("from")}
            excludeLanguage={targetLanguage}
          />
        </div>

        <Button
          variant="glass"
          size="icon"
          onClick={handleSwapLanguages}
          className="mt-6 md:mt-6 shrink-0 rounded-full w-12 h-12 hover:rotate-180 transition-transform duration-500"
          title={t("swapLanguages")}
        >
          <ArrowRightLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1 w-full">
          <LanguageSelector
            value={targetLanguage}
            onChange={setTargetLanguage}
            label={t("to")}
            excludeLanguage={sourceLanguage}
          />
        </div>
      </div>

      {/* Translation Areas */}
      <div 
        className="grid md:grid-cols-2 gap-4 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Source Text */}
        <div className="relative">
          <div className="absolute top-3 left-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {sourceLanguageName}
          </div>
          <Textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={t("enterText")}
            className="min-h-[250px] pt-10 px-4 pb-4 bg-card border-border/50 rounded-2xl resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-base"
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {sourceText.length} {t("characters")}
          </div>
        </div>

        {/* Translated Text */}
        <div className="relative">
          <div className="absolute top-3 left-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {targetLanguageName}
          </div>
          <div className="min-h-[250px] pt-10 px-4 pb-12 bg-card border border-border/50 rounded-2xl text-base">
            {isTranslating ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : translatedText ? (
              <p className="whitespace-pre-wrap">{translatedText}</p>
            ) : (
              <p className="text-muted-foreground italic">
                {t("translationWillAppear")}
              </p>
            )}
          </div>
          {translatedText && !isTranslating && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="absolute bottom-3 right-3 gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">{t("copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t("copy")}</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Translate Button */}
      <div 
        className="flex justify-center mt-6 animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Button
          variant="gradient"
          size="xl"
          onClick={handleTranslate}
          disabled={isTranslating || !sourceText.trim()}
          className="min-w-[200px]"
        >
          {isTranslating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("translating")}
            </>
          ) : (
            <>
              <Languages className="w-5 h-5" />
              {t("translate")}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}