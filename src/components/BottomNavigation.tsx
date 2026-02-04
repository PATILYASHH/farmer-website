import { Home, FileText, Cloud, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
    const { t } = useLanguage();

    const navItems = [
        { id: 'overview', icon: Home, label: t('tab.overview') },
        { id: 'claimStatus', icon: FileText, label: t('tab.claimStatus') },
        { id: 'weather', icon: Cloud, label: t('tab.weather') },
        { id: 'disaster', icon: AlertTriangle, label: t('tab.disaster') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                                isActive
                                    ? 'text-primary-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                            <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
