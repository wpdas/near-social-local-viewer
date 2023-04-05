const defaultCodeMessage = `
return (
  <div>
    <p style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}>
      The Widget file was found. You must run the following command
      to inject your widget:
      <span
        style={{
          background: "#000",
          color: "#fff",
          padding: "2px",
          fontWeight: 400,
        }}
      >
        npx init-viewer path/to/MyWidget.jsx
      </span>
    </p>
  </div>
);
`;

module.exports = {
  defaultCodeMessage,
};
