"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  // Handle the upload completion with file type awareness
  const handleUploadComplete = (res: Array<{ url: string; name?: string }>) => {
    if (!res || res.length === 0) return;

    const file = res[0];
    const url = file.url;
    const fileName = file.name || "";
    const isPdf = fileName.toLowerCase().endsWith('.pdf');

    // For PDFs, add a custom prefix to the URL to identify it later
    // This helps other components know this is a PDF without checking extensions
    if (isPdf) {
      // Store the file as a special format: pdf::url
      onChange(`pdf::${url}`);
    } else {
      // For images, just store the URL directly
      onChange(url);
    }
  };

  // Handle rendering based on the stored value
  if (!value) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error);
          }}
          appearance={{
            button: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300",
            container: "w-full border-2 border-dashed border-indigo-400/30 rounded-lg bg-indigo-500/5 hover:bg-indigo-500/10 transition-all duration-300 py-4 dark:border-indigo-400/30",
            label: "text-indigo-500 hover:text-indigo-400 dark:text-indigo-300 transition-colors",
            allowedContent: "text-zinc-500 dark:text-zinc-400",
          }}
        />
      </div>
    );
  }

  // Check if this is a PDF (by our custom format)
  if (value.startsWith('pdf::')) {
    const pdfUrl = value.replace('pdf::', '');
    const fileName = pdfUrl.split('/').pop() || 'document.pdf';

    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm transition-all hover:bg-white/20">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-300 hover:underline font-medium"
        >
          {fileName}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-md hover:bg-rose-600 transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // If not a PDF, assume it's an image
  return (
    <div className="relative h-20 w-20 group">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white/20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
      </div>
      <button
        onClick={() => onChange("")}
        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-md hover:bg-rose-600 transition-all hover:scale-110"
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};