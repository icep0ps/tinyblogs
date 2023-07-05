import { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  action: string;
}

const SigninDialog: FC<Props> = (props) => {
  const { action } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{action}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>Please sign in to perform this action.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">signin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SigninDialog;
