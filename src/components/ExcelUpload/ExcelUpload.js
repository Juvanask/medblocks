import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { addPatient } from '../../services/dbService';
import { Upload, FileSpreadsheet, CheckCircle, FileX } from 'lucide-react';

const ExcelUpload = ({ onPatientsAdded }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(null);
  };

  const processFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        for (const patient of jsonData) {
          await addPatient(patient);
        }

        setUploadStatus({ success: true, message: `Successfully imported ${jsonData.length} patient records` });
        onPatientsAdded();
      } catch (error) {
        setUploadStatus({ success: false, message: `Error processing file: ${error.message}` });
      }
      setUploading(false);
    };

    reader.onerror = () => {
      setUploadStatus({ success: false, message: 'Error reading file' });
      setUploading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      await processFile(file);
    } catch (error) {
      setUploadStatus({ success: false, message: `Error: ${error.message}` });
      setUploading(false);
    }
  };

  const renderUploadStatus = () => {
    if (!uploadStatus) return null;

    const { success, message } = uploadStatus;
    const Icon = success ? CheckCircle : FileX;
    const iconClassName = success ? 'text-green-500' : 'text-red-500';
    const bgColor = success ? 'bg-green-50' : 'bg-red-50';
    const textColor = success ? 'text-green-700' : 'text-red-700';
    const borderColor = success ? 'border-green-200' : 'border-red-200';

    return (
      <div className={`mt-3 p-2 rounded-md text-sm flex items-center gap-2 ${bgColor} ${textColor} border ${borderColor}`}>
        <Icon size={14} className={iconClassName} />
        {message}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#D0E3FF]/20 to-[#BAD6EB]/20 p-4 rounded-xl border border-[#BAD6EB]/30">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#081F5C] mb-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-[#334EAC]" />
              <span>Excel File (XLSX, XLS)</span>
            </div>
          </label>

          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".xlsx, .xls"
              className="block w-full text-sm text-[#081F5C]
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-[#334EAC]/10 file:text-[#334EAC]
                hover:file:bg-[#334EAC]/20
                focus:outline-none focus:ring-2 focus:ring-[#334EAC]/30
                transition-all duration-200"
            />
          </div>

          {file && (
            <div className="mt-2 flex items-center gap-2 text-sm text-[#081F5C] bg-white/50 p-2 rounded-md">
              <FileSpreadsheet size={14} className="text-[#7096D1]" />
              <span className="truncate">{file.name}</span>
              <span className="text-[#7096D1]">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
            ${!file || uploading
              ? 'bg-[#7096D1]/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#334EAC] to-[#7096D1] hover:from-[#2A3F8D] hover:to-[#5C7AB0]'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#334EAC] transition-all duration-200`}
        >
          {uploading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Upload size={16} />
              Upload Patients
            </>
          )}
        </button>

        {renderUploadStatus()}
      </form>
    </div>
  );
};

export default ExcelUpload;
