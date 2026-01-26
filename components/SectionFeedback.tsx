'use client';

interface SectionFeedbackProps {
    sections: {
        section: string;
        feedback: string;
        priority?: 'high' | 'medium' | 'low';
    }[];
}

export default function SectionFeedback({ sections }: SectionFeedbackProps) {
    const getPriorityBadge = (priority?: 'high' | 'medium' | 'low') => {
        if (!priority) return null;

        const styles = {
            high: 'bg-red-100 text-red-800 border-red-200',
            medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            low: 'bg-blue-100 text-blue-800 border-blue-200',
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
        );
    };

    const getSectionTitle = (section: string) => {
        return section.charAt(0).toUpperCase() + section.slice(1);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Section-by-Section Feedback</h2>

            <div className="grid gap-6">
                {sections.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-8"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {getSectionTitle(item.section)}
                            </h3>
                            {getPriorityBadge(item.priority)}
                        </div>

                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                            {item.feedback}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
