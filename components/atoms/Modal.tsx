import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

interface ModalProps {
  open: boolean;
  onChange: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onChange, title, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className='max-w-[300px] px-4'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription/>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

