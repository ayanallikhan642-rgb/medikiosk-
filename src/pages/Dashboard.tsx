import { History, Calendar, FileText, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-gray-900 hidden lg:block mb-6">Dashboard</h1>
      
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#004d40]"></div>
        <div className="relative z-10">
          <p className="text-[#004d40] font-medium text-sm mb-1">Welcome back</p>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
            Hello, Rahul <span className="text-2xl">👋</span>
          </h2>
          <p className="text-gray-600 mb-6 text-sm max-w-md">
            Here's an overview of your health, consultations and medical records.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800">
              Patient ID: PT-42945
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800">
              28 Years
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800">
              Male
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800">
              Blood Group: O+
            </span>
          </div>

          <div className="w-16 h-16 rounded-full bg-[#004d40] flex items-center justify-center text-white font-bold text-xl shadow-lg">
            RM
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <History className="w-6 h-6 text-[#004d40]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Consultations</p>
            <p className="text-3xl font-serif font-bold text-gray-900 mb-1">6</p>
            <p className="text-xs text-gray-400">All time</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-6 h-6 text-[#004d40]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Next Appointment</p>
            <p className="text-2xl font-serif font-bold text-gray-900 mb-1">24 May</p>
            <p className="text-xs text-gray-400">10:30 AM</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-6 h-6 text-[#004d40]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Reports</p>
            <p className="text-3xl font-serif font-bold text-gray-900 mb-1">5</p>
            <p className="text-xs text-gray-400">Available</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-6 h-6 text-[#004d40]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Symptoms</p>
            <p className="text-3xl font-serif font-bold text-gray-900 mb-1">5</p>
            <p className="text-xs text-gray-400">Recently reported</p>
          </div>
        </div>
      </div>

      {/* Upcoming Consultation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif font-bold text-gray-900">Upcoming Consultation</h3>
          <button className="text-sm text-[#004d40] font-medium hover:underline">Details</button>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-emerald-50 rounded-xl p-3 flex flex-col items-center justify-center min-w-[70px]">
            <span className="text-sm font-medium text-[#004d40] uppercase">May</span>
            <span className="text-2xl font-bold text-[#004d40]">24</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">General Checkup - AYUSH</p>
            <p className="text-sm text-gray-500 mt-1">Dr. Sharma, Room 102</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
