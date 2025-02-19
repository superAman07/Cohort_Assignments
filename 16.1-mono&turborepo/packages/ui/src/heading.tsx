export const Heading = ({ prop }: { prop: React.ReactNode }) => {
  return (
    <div>
      <h1>This is the common line from heading</h1>
      {prop}
    </div>
  );
};
