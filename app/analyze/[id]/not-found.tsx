import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analysis Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The analysis you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                    Start New Analysis
                </Link>
            </div>
        </div>
    );
}
