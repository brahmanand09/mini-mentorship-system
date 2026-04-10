export default function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "10px"
    }}>
      {message}
    </div>
  );
}