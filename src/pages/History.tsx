import { Activity } from 'lucide-react';

export default function History() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Medical History</h1>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-[#004d40]" />
        </div>
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">No Past Medical History Found</h2>
        <p className="text-gray-500 max-w-md">
          Your comprehensive medical history will be built automatically as you complete AI case-taking sessions and upload your past records.
        </p>
      </div>
    </div>
  );
}
