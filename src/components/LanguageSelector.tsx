import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "he", name: "Hebrew", nativeName: "עברית" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "sv", name: "Swedish", nativeName: "Svenska" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  excludeLanguage?: string;
}

export function LanguageSelector({
  value,
  onChange,
  label,
  excludeLanguage,
}: LanguageSelectorProps) {
  const { t } = useI18n();
  
  const filteredLanguages = excludeLanguage
    ? languages.filter((lang) => lang.code !== excludeLanguage)
    : languages;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 bg-card border-border/50 hover:border-primary/30 transition-colors rounded-xl">
          <SelectValue placeholder={t("selectLanguage")} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border/50 rounded-xl">
          {filteredLanguages.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="cursor-pointer hover:bg-accent rounded-lg"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium">{language.name}</span>
                <span className="text-muted-foreground text-sm">
                  {language.nativeName}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
