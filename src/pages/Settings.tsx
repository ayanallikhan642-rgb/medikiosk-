import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Settings</h1>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-medium text-gray-900">Language Preferences</h3>
            <p className="text-sm text-gray-500">Choose your preferred language for the AI Assistant.</p>
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#004d40]">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-medium text-gray-900">Audio Prompts</h3>
            <p className="text-sm text-gray-500">Enable voice narration during case taking.</p>
          </div>
          <input type="checkbox" className="w-5 h-5 accent-[#004d40]" defaultChecked />
        </div>
      </div>
    </div>
  );
}
