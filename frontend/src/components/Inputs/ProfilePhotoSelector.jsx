import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="relative">
          <div className="w-20 h-20 flex items-center justify-center bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-full text-indigo-600">
            <LuUser size={34} />
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-sm transition-colors cursor-pointer"
            onClick={onChooseFile}
            title="Upload profile photo"
            aria-label="Upload profile photo"
          >
            <LuUpload size={14} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-200 shadow-xs"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-sm transition-colors cursor-pointer"
            onClick={handleRemoveImage}
            title="Remove photo"
            aria-label="Remove photo"
          >
            <LuTrash2 size={14} />
          </button>
        </div>
      )}
      <span className="text-[11px] text-slate-400 mt-2 font-medium">
        Profile avatar (optional)
      </span>
    </div>
  );
};

export default ProfilePhotoSelector;
