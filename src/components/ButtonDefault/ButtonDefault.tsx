import { Button } from '@chakra-ui/react';

interface ButtonProps {
  onClickButton: () => void;
  title: string;
}

export const ButtonDefault = ({ onClickButton, title }: ButtonProps) => {
  return (
    <Button
      colorScheme="orange"
      size="md"
      mt={8}
      type='submit'
      onClick={onClickButton}
      _hover={{ opacity: '0.8' }}
    >
      {title}
    </Button>
  );
};
