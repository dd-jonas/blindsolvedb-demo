type MessageProps = {
  children: string;
};

export const Message = ({ children }: MessageProps) => {
  return (
    <p className="message">
      <em>{children}</em>
    </p>
  );
};
