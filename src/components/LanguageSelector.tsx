import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSelector() {
    const { language, setLanguage, t } = useLanguage();

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'en', label: 'English', flag: '🇮🇳' },
        { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
        { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    ];

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Languages className="w-5 h-5" />
                <span className="font-medium">
                    {languages.find((l) => l.code === language)?.flag}
                </span>
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                    {t('language.select')}
                </div>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition ${
                            language === lang.code ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700'
                        }`}
                    >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {language === lang.code && (
                            <span className="ml-auto text-primary-600">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
