import React from "react";

/**
 * A simple reusable input field with label and inline error.
 *
 * Props:
 *   label        - text shown above the input
 *   type         - input type (text, email, password …)
 *   value        - controlled value
 *   onChange     - change handler
 *   error        - error string; if non-empty, shown below the input
 *   placeholder  - placeholder text
 *   rightElement - optional node rendered inside the input wrapper (e.g. eye icon)
 */
function InputField({ label, type = "text", value, onChange, error, placeholder, rightElement }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>

      {/* Wrap in a relative container only when an eye icon is provided */}
      <div className={rightElement ? "input-wrapper" : undefined}>
        <input
          className={`input-field ${error ? "input-field--error" : ""} ${rightElement ? "input-field--with-icon" : ""}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
        />
        {rightElement}
      </div>

      {/* Show error message only when there is one */}
      {error && <p className="input-error">{error}</p>}
    </div>
  );
}

export default InputField;
