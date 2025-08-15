import React, { useState } from "react";
import { FaUpload, FaImage } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../store/AuthContext";
const UploadReports = () => {
  const [reportFile, setReportFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user, uploadReportContext } = useAuth();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

   
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }

    setReportFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!reportFile) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", reportFile);

    try {
      setIsUploading(true);

      const { data } = await axios.post(
        "http://localhost:1000/api/v1/upload-report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      uploadReportContext(data.patientReport);
      toast.success("Report uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Failed to upload report.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Upload Your Report
      </h2>

      <div className="mb-6">
        <label
          htmlFor="reportUpload"
          className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          <FaUpload />
          {reportFile ? "Update Report" : "Upload Report"}
        </label>
        <input
          type="file"
          id="reportUpload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {reportFile && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          {isUploading ? "Uploading..." : "Save Report"}
        </button>
      )}

      <div className="mt-8">
        {!user.patientReport ? (
          <div className="text-gray-500 text-lg italic text-center">
            📸 Please upload the report to see it here.
          </div>
        ) : (
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-inner">
            <div className="flex flex-col items-center gap-4">
              <FaImage className="text-5xl text-green-500" />
              <img
                src={user.patientReport}
                alt="Uploaded Report"
                className="w-full max-w-xs rounded-md border border-gray-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReports;
