import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
    [key: string]: {
        en: string;
        hi: string;
        mr: string;
    };
}

const translations: Translations = {
    // Header
    'header.title': {
        en: 'PMFBY',
        hi: 'पीएमएफबीवाई',
        mr: 'पीएमएफबीवाय'
    },
    'header.subtitle': {
        en: 'Pradhan Mantri Fasal Bima Yojana',
        hi: 'प्रधानमंत्री फसल बीमा योजना',
        mr: 'प्रधानमंत्री फसल विमा योजना'
    },
    'header.logout': {
        en: 'Logout',
        hi: 'लॉग आउट',
        mr: 'बाहेर पडा'
    },
    
    // Tabs
    'tab.overview': {
        en: 'Overview',
        hi: 'सारांश',
        mr: 'विहंगावलोकन'
    },
    'tab.weather': {
        en: 'Weather & Forecast',
        hi: 'मौसम और पूर्वानुमान',
        mr: 'हवामान आणि अंदाज'
    },
    'tab.disaster': {
        en: 'Disaster Simulation',
        hi: 'आपदा सिमुलेशन',
        mr: 'आपत्ती सिम्युलेशन'
    },
    'tab.claimStatus': {
        en: 'Claim Status',
        hi: 'दावा स्थिति',
        mr: 'दावा स्थिती'
    },
    
    // Stats Cards
    'stats.farmSize': {
        en: 'Farm Size',
        hi: 'खेत का आकार',
        mr: 'शेत आकार'
    },
    'stats.acres': {
        en: 'acres',
        hi: 'एकड़',
        mr: 'एकर'
    },
    'stats.cropType': {
        en: 'Crop Type',
        hi: 'फसल का प्रकार',
        mr: 'पीक प्रकार'
    },
    'stats.annualIncome': {
        en: 'Annual Income',
        hi: 'वार्षिक आय',
        mr: 'वार्षिक उत्पन्न'
    },
    'stats.lakhs': {
        en: 'lakhs',
        hi: 'लाख',
        mr: 'लाख'
    },
    'stats.setupStatus': {
        en: 'Setup Status',
        hi: 'सेटअप स्थिति',
        mr: 'सेटअप स्थिती'
    },
    'stats.complete': {
        en: 'Complete',
        hi: 'पूर्ण',
        mr: 'पूर्ण'
    },
    'stats.pending': {
        en: 'Pending',
        hi: 'लंबित',
        mr: 'प्रलंबित'
    },
    
    // Personal Information
    'personal.title': {
        en: 'Personal Information',
        hi: 'व्यक्तिगत जानकारी',
        mr: 'वैयक्तिक माहिती'
    },
    'personal.fullName': {
        en: 'Full Name',
        hi: 'पूरा नाम',
        mr: 'पूर्ण नाव'
    },
    'personal.fatherName': {
        en: "Father's Name",
        hi: 'पिता का नाम',
        mr: 'वडिलांचे नाव'
    },
    'personal.age': {
        en: 'Age',
        hi: 'उम्र',
        mr: 'वय'
    },
    'personal.mobile': {
        en: 'Mobile',
        hi: 'मोबाइल',
        mr: 'मोबाईल'
    },
    
    // Location Details
    'location.title': {
        en: 'Location Details',
        hi: 'स्थान विवरण',
        mr: 'स्थान तपशील'
    },
    'location.state': {
        en: 'State',
        hi: 'राज्य',
        mr: 'राज्य'
    },
    'location.district': {
        en: 'District',
        hi: 'जिला',
        mr: 'जिल्हा'
    },
    'location.village': {
        en: 'Village',
        hi: 'गांव',
        mr: 'गाव'
    },
    'location.coordinates': {
        en: 'Coordinates',
        hi: 'निर्देशांक',
        mr: 'निर्देशांक'
    },
    
    // Crop Details
    'crop.title': {
        en: 'Current Crop Details',
        hi: 'वर्तमान फसल विवरण',
        mr: 'सध्याचे पीक तपशील'
    },
    'crop.type': {
        en: 'Crop Type',
        hi: 'फसल का प्रकार',
        mr: 'पीक प्रकार'
    },
    'crop.variety': {
        en: 'Variety',
        hi: 'किस्म',
        mr: 'जात'
    },
    'crop.sowingDate': {
        en: 'Sowing Date',
        hi: 'बुवाई की तारीख',
        mr: 'पेरणी तारीख'
    },
    'crop.harvestDate': {
        en: 'Harvest Date',
        hi: 'कटाई की तारीख',
        mr: 'कापणी तारीख'
    },
    
    // Claim Status
    'claim.title': {
        en: 'Insurance Claim Status',
        hi: 'बीमा दावा स्थिति',
        mr: 'विमा दावा स्थिती'
    },
    'claim.claimId': {
        en: 'Claim ID',
        hi: 'दावा आईडी',
        mr: 'दावा आयडी'
    },
    'claim.status': {
        en: 'Status',
        hi: 'स्थिति',
        mr: 'स्थिती'
    },
    'claim.amount': {
        en: 'Claim Amount',
        hi: 'दावा राशि',
        mr: 'दावा रक्कम'
    },
    'claim.dateSubmitted': {
        en: 'Date Submitted',
        hi: 'प्रस्तुत करने की तारीख',
        mr: 'सबमिट केलेली तारीख'
    },
    'claim.estimatedPayout': {
        en: 'Estimated Payout',
        hi: 'अनुमानित भुगतान',
        mr: 'अंदाजे भरपाई'
    },
    'claim.noClaims': {
        en: 'No active claims',
        hi: 'कोई सक्रिय दावा नहीं',
        mr: 'कोणताही सक्रिय दावा नाही'
    },
    'claim.noClaimsDesc': {
        en: 'You have not submitted any insurance claims yet. If you experience crop damage, please contact your local agricultural office.',
        hi: 'आपने अभी तक कोई बीमा दावा प्रस्तुत नहीं किया है। यदि आपकी फसल को नुकसान होता है, तो कृपया अपने स्थानीय कृषि कार्यालय से संपर्क करें।',
        mr: 'तुम्ही अद्याप कोणताही विमा दावा सादर केला नाही. जर तुमच्या पिकाचे नुकसान झाले असेल तर कृपया तुमच्या स्थानिक कृषी कार्यालयाशी संपर्क साधा.'
    },
    'claim.status.pending': {
        en: 'Under Review',
        hi: 'समीक्षाधीन',
        mr: 'पुनरावलोकनाधीन'
    },
    'claim.status.approved': {
        en: 'Approved',
        hi: 'स्वीकृत',
        mr: 'मंजूर'
    },
    'claim.status.rejected': {
        en: 'Rejected',
        hi: 'अस्वीकृत',
        mr: 'नाकारले'
    },
    'claim.status.paid': {
        en: 'Paid',
        hi: 'भुगतान किया गया',
        mr: 'भरलेले'
    },
    'claim.reason': {
        en: 'Reason',
        hi: 'कारण',
        mr: 'कारण'
    },
    'claim.description': {
        en: 'Description',
        hi: 'विवरण',
        mr: 'वर्णन'
    },
    
    // Language Selector
    'language.select': {
        en: 'Select Language',
        hi: 'भाषा चुनें',
        mr: 'भाषा निवडा'
    },
    'language.english': {
        en: 'English',
        hi: 'अंग्रेज़ी',
        mr: 'इंग्रजी'
    },
    'language.hindi': {
        en: 'हिंदी',
        hi: 'हिंदी',
        mr: 'हिंदी'
    },
    'language.marathi': {
        en: 'मराठी',
        hi: 'मराठी',
        mr: 'मराठी'
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
