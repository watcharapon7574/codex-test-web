import { useRef } from "react";
import { heicToJpgCloudConvert, uploadAboutImage } from "@/lib/cloudconvert-api";

type ImageUploadProps = {
  currentImage?: string;
  onImageUpload: (url: string) => void;
  label?: string;
  storagePath: string;
  onBeforeUpload?: (file: File) => Promise<File> | File;
};

export default function ImageUpload({
  currentImage,
  onImageUpload,
  label,
  storagePath,
  onBeforeUpload
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let fileToUpload = file;
    if (onBeforeUpload) {
      fileToUpload = await onBeforeUpload(file);
    }

    // ⬇️ Upload to Supabase
    const url = await uploadAboutImage(fileToUpload, storagePath);
    onImageUpload(url);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type="file"
        accept="image/*,.heic"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {currentImage && (
        <img
          src={currentImage}
          alt="preview"
          style={{ maxWidth: 200, marginTop: 8 }}
        />
      )}
    </div>
  );
}