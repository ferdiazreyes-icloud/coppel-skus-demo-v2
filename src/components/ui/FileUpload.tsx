import { useState, useRef, type DragEvent } from 'react'
import { Upload, FileText, X } from 'lucide-react'

interface FileUploadProps {
  label?: string
  accept?: string
  onFileSelect?: (file: File) => void
  className?: string
}

export default function FileUpload({
  label,
  accept,
  onFileSelect,
  className = '',
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) {
      setFile(dropped)
      onFileSelect?.(dropped)
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      onFileSelect?.(selected)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-primary">{label}</label>
      )}

      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-md p-8 flex flex-col items-center gap-3 transition-colors
          ${isDragging ? 'border-coppel-blue bg-coppel-blue-light' : 'border-border-input bg-bg-card'}
        `}
      >
        <Upload className="w-12 h-12 text-text-muted" />
        <p className="text-sm text-text-secondary text-center">
          Arrastra y suelta el archivo aquí
        </p>
        <span className="text-xs text-text-muted">o</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-5 h-10 text-sm font-semibold text-coppel-blue border-2 border-coppel-blue rounded-pill hover:bg-coppel-blue-light transition-colors"
        >
          Selecciona tus archivos
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleSelect}
          className="sr-only"
        />
      </div>

      {/* File preview */}
      {file && (
        <div className="flex items-center gap-3 px-3 py-2 bg-bg-light rounded-sm border border-border">
          <FileText className="w-5 h-5 text-coppel-blue shrink-0" />
          <span className="text-sm text-text-primary truncate flex-1">{file.name}</span>
          <span className="text-xs text-text-muted shrink-0">
            ({(file.size / 1024).toFixed(0)} KB)
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-text-muted hover:text-error transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
