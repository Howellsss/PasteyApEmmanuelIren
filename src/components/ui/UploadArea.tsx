import { UploadCloud, X, Check } from 'lucide-react';
import { useState, type DragEvent } from 'react';
import { cn } from '@/lib/cn';

interface UploadAreaProps {
  label?: string;
  accept?: string;
  className?: string;
  onFile?: (file: File) => void;
}

export function UploadArea({
  label = 'Upload a file',
  accept = 'image/*',
  className,
  onFile,
}: UploadAreaProps) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      onFile?.(dropped);
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-sm font-medium text-cream">{label}</label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 p-8 rounded-soft border-2 border-dashed transition-all duration-300 cursor-pointer',
          dragging
            ? 'border-accent bg-accent/5'
            : file
            ? 'border-accent/40 bg-accent/5'
            : 'border-line hover:border-line bg-surface/30'
        )}
      >
        {file ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-pill bg-accent/15">
                <Check className="w-5 h-5 text-ash" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-cream">{file.name}</p>
                <p className="text-meta text-ash">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="flex items-center justify-center w-8 h-8 rounded-pill text-ash hover:text-accent hover:bg-accent/5 transition-colors duration-300"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <UploadCloud
              className={cn(
                'w-8 h-8 transition-colors duration-300',
                dragging ? 'text-accent' : 'text-ash'
              )}
            />
            <div className="text-center">
              <p className="text-sm text-cream">
                <span className="text-accent font-medium">Browse</span> or drag here
              </p>
              <p className="text-meta text-ash mt-1">{accept}</p>
            </div>
          </>
        )}
        <input
          type="file"
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) {
              setFile(selected);
              onFile?.(selected);
            }
          }}
        />
      </div>
    </div>
  );
}
