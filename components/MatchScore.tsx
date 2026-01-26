'use client';

interface MatchScoreProps {
    score: number;
}

export default function MatchScore({ score }: MatchScoreProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        if (score >= 40) return 'text-orange-600';
        return 'text-red-600';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-green-50 border-green-200';
        if (score >= 60) return 'bg-yellow-50 border-yellow-200';
        if (score >= 40) return 'bg-orange-50 border-orange-200';
        return 'bg-red-50 border-red-200';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent Match';
        if (score >= 60) return 'Good Match';
        if (score >= 40) return 'Fair Match';
        return 'Needs Improvement';
    };

    const getProgressColor = (score: number) => {
        if (score >= 80) return 'bg-green-600';
        if (score >= 60) return 'bg-yellow-600';
        if (score >= 40) return 'bg-orange-600';
        return 'bg-red-600';
    };

    return (
        <div className={`rounded-xl border-2 p-10 text-center ${getScoreBg(score)}`}>
            <div className="space-y-4">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Overall Match Score
                </p>
                <div className={`text-8xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                </div>
                <p className={`text-lg font-semibold ${getScoreColor(score)}`}>
                    {getScoreLabel(score)}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-out ${getProgressColor(score)}`}
                        style={{ width: `${score}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
