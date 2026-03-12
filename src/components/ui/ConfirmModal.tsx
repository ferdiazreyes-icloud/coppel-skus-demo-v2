import { CheckCircle, AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'confirm' | 'success'
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'confirm',
}: ConfirmModalProps) {
  const isSuccess = variant === 'success'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      actions={
        isSuccess ? (
          <Button variant="primary" onClick={onClose}>
            Aceptar
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={onClose}>
              {cancelLabel}
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </>
        )
      }
    >
      <div className="flex flex-col items-center text-center gap-4 py-2">
        {isSuccess ? (
          <CheckCircle className="w-14 h-14 text-success" />
        ) : (
          <AlertTriangle className="w-14 h-14 text-coppel-yellow" />
        )}
        <p className="text-sm text-text-secondary">{message}</p>
      </div>
    </Modal>
  )
}
