import ReactSelect from "react-select";
import PropTypes from "prop-types";

// 
const customStyles = {
  container: (base) => ({
    ...base,
    width: "100%",
    minWidth: 0,
  }),

  placeholder: (base) => ({
  ...base,
  color: "var(--color-grey-400)",
}),

  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    fontSize: "1.4rem",
    outline: state.isFocused ? "2px solid var(--color-brand-200)" : "none",
    borderRadius: "var(--border-radius-sm)",
    opacity: state.isDisabled ? 0.6 : 1,
    backgroundColor: state.isDisabled
    ? "var(--color-grey-100)"
    : "var(--color-grey-0)",
    borderColor: state.isFocused
      ? "var(--color-brand-600)"
      : "var(--color-grey-300)",
    boxShadow: state.isFocused
      ? "0 0 0 1px var(--color-brand-600)"
      : "var(--shadow-sm)",
    "&:hover": {
      borderColor: "var(--color-brand-600)",
    },
  }),

  menu: (base) => ({
    ...base,
    zIndex: 9999,
    backgroundColor: "var(--color-grey-0)", // 🔥 KLJUČNO
    color: "var(--color-grey-900)",          // 🔥 KLJUČNO
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "var(--color-grey-100)"
      : "var(--color-grey-0)",
    color: "var(--color-grey-900)",
    cursor: "pointer",
  }),
};

function SearchSelect({
  options,
  value,
  onChange,
  placeholder,
  isDisabled,
  isClearable = true,
  returnOption = false, // 👈 NOVO
}) {
  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value)
  );

  return (
    <ReactSelect
      options={options}
      value={selectedOption || null}
    //   onChange={(opt) => onChange(opt?.value ?? "")}
      onChange={(opt) => {
        if (returnOption) {
        onChange(opt ?? null);
        } else {
        onChange(opt?.value ?? "");
        }
    }}
      isSearchable
      isClearable={isClearable}
      isDisabled={isDisabled}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
}

SearchSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default SearchSelect;

// import ReactSelect from "react-select";
// import PropTypes from "prop-types";

// const customStyles = {
//   /** isto ponašanje kao <select> **/
//   container: (base) => ({
//     ...base,
//     width: "100%",
//     // flex: "1 1 0%",
//     minWidth: 0, // 🔥 KLJUČNO za flex
//   }),

//   control: (base, state) => ({
//     ...base,
//     width: "100%",
//     minHeight: "42px",
//     fontSize: "1.4rem",
//     fontWeight: 500,
//     borderRadius: "var(--border-radius-sm)",
//     border: `1px solid ${
//       state.isFocused
//         ? "var(--color-brand-600)"
//         : "var(--color-grey-300)"
//     }`,
//     boxShadow: "var(--shadow-sm)",
//     backgroundColor: "var(--color-grey-0)",
//     "&:hover": {
//       borderColor: "var(--color-brand-600)",
//     },
//   }),

//   valueContainer: (base) => ({
//     ...base,
//     padding: "0.8rem 1.2rem",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//   }),

//   singleValue: (base) => ({
//     ...base,
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   }),

//   placeholder: (base) => ({
//     ...base,
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   }),

// //   indicatorsContainer: (base) => ({
// //     ...base,
// //     height: "42px",
// //   }),

//   menu: (base) => ({
//     ...base,
//     fontSize: "1.4rem",
//     zIndex: 9999,
//   }),
// };

// function SearchSelect({
//   options,
//   value,
//   onChange,
//   placeholder = "Izaberi...",
//   isDisabled,
//   isClearable = true,
// }) {
//   const selectedOption = options.find(
//     (opt) => String(opt.value) === String(value) ) ?? null;

//   return (
//     /** 🔥 WRAPPER rešava flex problem */
//     <div style={{ width: "100%", minWidth: 0 }}>
//     <ReactSelect
//       options={options}
//       value={selectedOption || null}
//       onChange={(opt) => onChange(opt?.value ?? "")}
//       isSearchable
//       isClearable={isClearable}
//       isDisabled={isDisabled}
//       placeholder={placeholder}
//       styles={customStyles}
//       menuPortalTarget={document.body}
//       menuPosition="fixed"
//     />
//      </div>
//   );
// }

// SearchSelect.propTypes = {
//   options: PropTypes.array.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   isDisabled: PropTypes.bool,
//   isClearable: PropTypes.bool,
// };

// export default SearchSelect;

