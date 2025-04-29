import { useRef } from "react";

type Prop = {
  accept?: string[];
  content: (openFileBrowser: () => void) => React.ReactNode;
  uploadCallBack: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileUploadDropZone({
  content,
  uploadCallBack,
  accept,
}: Prop) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileBrowser = () => {
    inputRef.current?.click();
  };
  const acceptedFormat = accept?.join(",");
  return (
    <div>
      {content(openFileBrowser)}

      <input
        accept={acceptedFormat}
        onChange={uploadCallBack}
        ref={inputRef}
        type="file"
        hidden
      />
    </div>
  );
}
