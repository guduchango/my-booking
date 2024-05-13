// import React, { useState } from 'react';

// interface Option {
//   id: number;
//   value: string;
// }

// const AutocompleteInput: React.FC<{ options: Option[] }> = ({ options }) => {
//   const [inputValue, setInputValue] = useState<string>('');
//   const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = event.target.value;
//     setInputValue(inputValue);

//     // Filter options based on input value
//     const filteredOptions = options.filter(option =>
//       option.value.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     setFilteredOptions(filteredOptions);
//     setShowSuggestions(true);
//   };

//   const handleOptionClick = (value: string) => {
//     setInputValue(value);
//     setShowSuggestions(false);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onBlur={() => setShowSuggestions(false)} // Hide suggestions on blur
//       />
//       {showSuggestions && (
//         <ul>
//           {filteredOptions.map(option => (
//             <li key={option.id} onClick={() => handleOptionClick(option.value)}>
//               {option.value}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AutocompleteInput;