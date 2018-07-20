import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  error,
  info,
  label,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="text__field">
      {label && <h6 className="text__field__label">{label}</h6>}
      <input
        type={type}
        className={classnames("text__field__input", {
          "text__field__input--invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <div className="text__field__info">{info}</div>}
      {error && <div className="text__field__error">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
