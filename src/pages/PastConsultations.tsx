import { Calendar } from 'lucide-react';

export default function PastConsultations() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Past Consultations</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 text-center text-gray-500 border-b border-gray-100">
          <Calendar className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <p>You haven't completed any consultations yet.</p>
        </div>
      </div>
    </div>
  );
}
