import { Modal, Button } from 'antd';

interface ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export function ConfirmDeleteModal({ visible, onConfirm, onCancel, message }: ConfirmDeleteModalProps) {
  return (
    <Modal
      title="Remover Skill"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Confirmar
        </Button>,
      ]}
    >
      {message}
    </Modal>
  );
}
