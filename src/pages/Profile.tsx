import { User } from 'lucide-react';

export default function Profile() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">My Profile</h1>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-[#004d40]">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Patient Profile</h2>
          <p className="text-gray-500 mb-4">ID: PT-XXXXX</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Name:</strong> Not configured</p>
            <p><strong>Age:</strong> -</p>
            <p><strong>Gender:</strong> -</p>
            <p><strong>Blood Group:</strong> -</p>
          </div>
          <button className="mt-4 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
