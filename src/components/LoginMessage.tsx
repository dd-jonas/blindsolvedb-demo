import { LoginButton, Message } from '#components';

type LoginMessageProps = {
  children: string;
};

export const LoginMessage = ({ children }: LoginMessageProps) => {
  return (
    <div>
      <Message>{children}</Message>
      <LoginButton />
    </div>
  );
};
