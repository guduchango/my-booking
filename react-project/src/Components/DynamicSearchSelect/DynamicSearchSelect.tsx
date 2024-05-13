// import React, {  useEffect, useState } from 'react';

// interface ChildProps {
//   items: KeyValue[];
// }

// const DynamicSearchSelect = ({
//   items,
// }: ChildProps) => {

//   const [reservation, setReservation] = useState<ReservationInterface>(location.state.reservation);
  
//   //const firstProp: string = props[0].value
//   const [searchTerm, setSearchTerm] = useState<string>();
//   const [filteredOptions, setFilteredOptions] = useState<KeyValue[]>(items);

//     useEffect(() => {
//       setFilteredOptions(items)
//     },[items]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = e.target.value;
//     setSearchTerm(searchTerm);

//     const filteredOptions = items.filter(item =>
//       item.value.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredOptions(filteredOptions);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <select onChange={(e) => { console.log("e",e)}} 
//       value={id}>
        
//         {filteredOptions.map((option) => 
        
//         (
//           <option  key={option.id} value={option.id}>{option.value}</option>
//         )
        
//         )}
//       </select>
//     </div>
//   );
// }

// export default DynamicSearchSelect;