import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Reports() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [documents, setDocuments] = useState([
    { name: 'Consultation Report', sub: 'Dr. Priya Sharma', type: 'PDF', bg: 'bg-red-50 text-red-600', cat: 'Consultation', date: '01 May 2025' },
    { name: 'Blood Test Report', sub: 'Medikiosk Lab', type: 'LAB', bg: 'bg-purple-50 text-purple-600', cat: 'Lab Report', date: '28 Apr 2025' },
    { name: 'Prescription — Triphala', sub: 'Dr. Vivek Joshi', type: 'RX', bg: 'bg-yellow-50 text-yellow-600', cat: 'Prescription', date: '08 Apr 2025' },
    { name: 'Ultrasound Abdomen', sub: 'Medikiosk Diagnostics', type: 'IMG', bg: 'bg-blue-50 text-blue-600', cat: 'Imaging Report', date: '21 Mar 2025' },
    { name: 'Lipid Profile Report', sub: 'Medikiosk Lab', type: 'LAB', bg: 'bg-purple-50 text-purple-600', cat: 'Lab Report', date: '05 Jan 2025' }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newDoc = {
        name: file.name,
        sub: 'Uploaded via Portal',
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'IMG' : 'DOC',
        bg: 'bg-emerald-50 text-[#004d40]',
        cat: 'General Document',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="hidden lg:flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Reports & Documents</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-2">Upload New Document</h2>
        <p className="text-sm text-gray-600 mb-6">
          Upload medical reports, prescriptions or any health related documents.
        </p>

        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-4" />
          <p className="text-sm font-medium text-gray-900 mb-1">Drag and drop your file here</p>
          <p className="text-xs text-gray-500 my-2">or</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <button 
            onClick={handleBrowseClick}
            className="px-6 py-2 bg-[#004d40] text-white rounded-xl text-sm font-medium hover:bg-[#065f50] transition-colors"
          >
            Browse Files
          </button>
          <p className="text-xs text-gray-400 mt-4">Supports PDF, JPG, PNG (Max 10MB)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Document Summary</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Total Documents</span>
            <span className="font-bold text-gray-900">{documents.length}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Lab Reports</span>
            <span className="font-bold text-gray-900">{documents.filter(d => d.type === 'LAB').length}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Prescriptions</span>
            <span className="font-bold text-gray-900">{documents.filter(d => d.type === 'RX').length}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Imaging Reports</span>
            <span className="font-bold text-gray-900">{documents.filter(d => d.type === 'IMG').length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">All Documents</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Document</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((doc, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs", doc.bg)}>
                        {doc.type}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                      {doc.cat}
                    </span>
                  </td>
                  <td className="py-4 text-right text-gray-600">
                    <div className="flex flex-col items-end">
                      <span>{doc.date.split(' ')[0]}</span>
                      <span className="text-xs">{doc.date.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
