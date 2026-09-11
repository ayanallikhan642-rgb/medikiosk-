import { useState } from 'react';
import { FileText, Download, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CaseSummary() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Symptoms', 'Ayurvedic Assessment'];

  const handleDownload = () => {
    // Quick hack for demo: trigger browser print dialog to save as PDF
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MediKiosk Case Summary',
          text: 'Case ID: CS-2025-05124',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported on this browser. URL copied to clipboard instead.');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="hidden lg:flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">My Case Summary</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl hidden sm:block">
              <FileText className="w-6 h-6 text-[#004d40]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                Case ID: CS-2025-05124
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-[#004d40]">
                  Completed
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Generated on 24 May 2025, 10:30 AM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#004d40] text-white rounded-xl text-sm font-medium hover:bg-[#065f50] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
                activeTab === tab 
                  ? "border-[#004d40] text-[#004d40]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Chief Complaint</p>
                <p className="font-bold text-gray-900">Acidity & discomfort</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="font-bold text-gray-900">2 weeks</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Severity</p>
                <p className="font-bold text-gray-900">Moderate</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="font-bold text-gray-900">AYUSH Consultation</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Presenting Symptoms</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside ml-2">
                <li>Burning sensation in chest after meals</li>
                <li>Bloating and heaviness</li>
                <li>Sour belching</li>
                <li>Loss of appetite</li>
                <li>Mild constipation</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Symptoms' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Associated Symptoms</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside ml-2">
                <li>Fatigue</li>
                <li>Irritability</li>
                <li>Disturbed sleep</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Nidana (Probable Causes)</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside ml-2">
                <li>Irregular meal timings</li>
                <li>Spicy and oily food</li>
                <li>Late night sleeping</li>
                <li>High stress levels</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Ayurvedic Assessment' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Patient Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-bold text-gray-900">Rahul Mehta</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Age / Gender</span>
                  <span className="font-bold text-gray-900">28 Years / Male</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Patient ID</span>
                  <span className="font-bold text-gray-900">PT-42945</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Blood Group</span>
                  <span className="font-bold text-gray-900">O+</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Agni & Koshtha</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Agni</span>
                  <span className="font-bold text-gray-900">Manda (Low)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Koshtha</span>
                  <span className="font-bold text-gray-900">Madhyama</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bowel Frequency</span>
                  <span className="font-bold text-gray-900">Once a day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stool Consistency</span>
                  <span className="font-bold text-gray-900">Hard</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#004d40]">🌿</span> Dashavidha Pariksha
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prakriti</span>
                  <span className="font-bold text-gray-900">Vata-Pitta</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Vikriti</span>
                  <span className="font-bold text-gray-900">Vata-Pitta</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sara</span>
                  <span className="font-bold text-gray-900">Madhyama</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Samhanana</span>
                  <span className="font-bold text-gray-900">Madhyama</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sattva</span>
                  <span className="font-bold text-gray-900">Rajas Pradhan</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
