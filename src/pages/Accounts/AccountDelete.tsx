import { Box, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { AccountType } from "./AccountsList";

interface AccountDeleteProps {
  account: AccountType;
  children?: React.ReactNode;
  closeModal: () => void;
  showModal: boolean;
}

export function AccountDelete({ account, children, closeModal, showModal }: AccountDeleteProps) {
  async function handleRemoveAccount() {
    try {
      await axios.delete(`http://localhost:3000/conta/${account._id}`);
      closeModal()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={showModal}
        isCentered
        onClose={() => closeModal()}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text>Excluir conta</Text>
          </ModalHeader>
          <Divider />


          <ModalCloseButton />

          <ModalBody m={'2rem'}>
            <Text fontWeight={'medium'}>
              Tem certeza que deseja excluir está conta?
            </Text>
            <Box m={'.5rem'}>
              <Text>Descrição: {account.descricao}</Text>
              <Text>Valor: {account.valor}</Text>
            </Box>
          </ModalBody>
          {children && children}

          <Divider />
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => closeModal()}>
              NÃO
            </Button>

            <Button variant='ghost' onClick={handleRemoveAccount}>
              SIM
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}