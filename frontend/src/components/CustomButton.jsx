function CustomButton({
  children,
  onClick,
  disabled = false,
  dataTestID = "",
}) {
  return (
    <button
      data-testid={dataTestID}
      onClick={onClick}
      className={`w-50 custom-btn ${disabled ? "disabled" : ""}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
