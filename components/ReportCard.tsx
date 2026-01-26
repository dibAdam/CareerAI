'use client';

interface ReportCardProps {
    title: string;
    items: string[];
    variant?: 'default' | 'warning' | 'success' | 'info';
}

export default function ReportCard({ title, items, variant = 'default' }: ReportCardProps) {
    const variantStyles = {
        default: 'bg-white border-gray-200',
        warning: 'bg-amber-50 border-amber-200',
        success: 'bg-green-50 border-green-200',
        info: 'bg-blue-50 border-blue-200',
    };

    const iconStyles = {
        default: 'text-gray-600',
        warning: 'text-amber-600',
        success: 'text-green-600',
        info: 'text-blue-600',
    };

    return (
        <div className={`border rounded-xl p-8 ${variantStyles[variant]}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{title}</h3>

            {items.length === 0 ? (
                <p className="text-gray-500 italic text-sm">No items to display</p>
            ) : (
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconStyles[variant]}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 leading-relaxed text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
