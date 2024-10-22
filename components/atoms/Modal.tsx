import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  onChange: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onChange, title, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

