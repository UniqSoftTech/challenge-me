import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ReusableModalProps {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: ReactNode;
  footer?: ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  size = "md",
  isOpen,
  onClose,
  title,
  body,
  footer,
}) => {
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-2">{title}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              {footer || (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReusableModal;
