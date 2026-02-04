import { useLanguage } from '../contexts/LanguageContext';
import { FileText, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface Claim {
    id: string;
    status: 'pending' | 'approved' | 'rejected' | 'paid';
    amount: number;
    dateSubmitted: string;
    reason: string;
    description: string;
    estimatedPayout?: number;
}

// Mock claim data - in a real app, this would come from an API
const mockClaims: Claim[] = [
    {
        id: 'CLM-2024-001',
        status: 'approved',
        amount: 125000,
        dateSubmitted: '2024-01-15',
        reason: 'Flood Damage',
        description: 'Severe flooding caused 80% crop damage',
        estimatedPayout: 87500
    },
    {
        id: 'CLM-2024-002',
        status: 'pending',
        amount: 50000,
        dateSubmitted: '2024-01-28',
        reason: 'Drought',
        description: 'Prolonged drought affecting crop yield',
        estimatedPayout: 35000
    }
];

export default function ClaimStatus() {
    const { t } = useLanguage();
    const claims = mockClaims; // In real app, fetch from API

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'approved':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'paid':
                return <DollarSign className="w-5 h-5 text-blue-600" />;
            default:
                return <FileText className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'paid':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (claims.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t('claim.noClaims')}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    {t('claim.noClaimsDesc')}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FileText className="w-7 h-7 text-primary-600" />
                    {t('claim.title')}
                </h2>

                <div className="space-y-4">
                    {claims.map((claim) => (
                        <div
                            key={claim.id}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(claim.status)}
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">
                                            {t('claim.claimId')}: {claim.id}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {t('claim.dateSubmitted')}: {new Date(claim.dateSubmitted).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                                        claim.status
                                    )}`}
                                >
                                    {t(`claim.status.${claim.status}`)}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">{t('claim.reason')}</p>
                                    <p className="font-semibold text-gray-900">{claim.reason}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">{t('claim.amount')}</p>
                                    <p className="font-semibold text-gray-900">₹{claim.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-600 mb-1">{t('claim.description')}</p>
                                <p className="text-gray-900">{claim.description}</p>
                            </div>

                            {claim.estimatedPayout && (
                                <div className="bg-gradient-to-r from-primary-50 to-green-50 border-2 border-primary-200 rounded-lg p-4">
                                    <p className="text-sm text-primary-700 mb-1">
                                        {t('claim.estimatedPayout')}
                                    </p>
                                    <p className="text-2xl font-bold text-primary-900">
                                        ₹{claim.estimatedPayout.toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
