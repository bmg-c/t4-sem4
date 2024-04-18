const FilterComponent = () => {
  const [selectedDisciplines, setSelectedDisciplines] = useState(['Математика', 'Программирование', 'Иностранный язык']);
  const disciplines = ['Математика', 'Программирование', 'Иностранный язык'];

  const handleDisciplineSelect = (discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter((item) => item !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  const handleSelectAllDisciplines = () => {
    if (selectedDisciplines.length === disciplines.length) {
      setSelectedDisciplines([]);
    } else {
      setSelectedDisciplines(disciplines);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', position: 'absolute', top: '50px', left: '10px', width: '250px' }}>
      <h2 style={{ textAlign: 'left', marginLeft: '10px', fontWeight: 'normal' }}>Дисциплина</h2>
      <hr style={{ width: '50%', margin: '10px auto' }} />
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
        {disciplines.map((discipline) => (
          <div key={discipline} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => handleDisciplineSelect(discipline)}
              style={{
                cursor: 'pointer',
                padding: '5px 10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {discipline}
            </button>
            <input
              type="checkbox"
              checked={selectedDisciplines.includes(discipline)}
              onChange={() => handleDisciplineSelect(discipline)}
              style={{ marginLeft: '10px' }}
            />
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={selectedDisciplines.length === disciplines.length}
            onChange={handleSelectAllDisciplines}
            style={{ marginRight: '10px' }}
          />
          <button
            onClick={handleSelectAllDisciplines}
            style={{
              cursor: 'pointer',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
              width: '100%',
              backgroundColor: selectedDisciplines.length === disciplines.length ? '#4CAF50' : 'white',
              color: selectedDisciplines.length === disciplines.length ? 'white' : '#333',
            }}
          >
            {selectedDisciplines.length === disciplines.length ? 'Выбрать все дисциплины' : 'Показать все дисциплины'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;

// const FilterComponent = () => {
//   const [selectedDisciplines, setSelectedDisciplines] = useState(['Математика', 'Программирование', 'Иностранный язык']);
//   const disciplines = ['Математика', 'Программирование', 'Иностранный язык'];

//   const handleDisciplineSelect = (discipline) => {
//     if (selectedDisciplines.includes(discipline)) {
//       setSelectedDisciplines(selectedDisciplines.filter((item) => item !== discipline));
//     } else {
//       setSelectedDisciplines([...selectedDisciplines, discipline]);
//     }
//   };

//   const handleSelectAllDisciplines = () => {
//     if (selectedDisciplines.length === disciplines.length) {
//       setSelectedDisciplines([]);
//     } else {
//       setSelectedDisciplines(disciplines);
//     }
//   };

//   return (
//     <div style={{ border: '1px solid #ccc', padding: '10px', position: 'absolute', top: '50px', left: '10px', width: '250px' }}>
//       <h2 style={{ textAlign: 'center', fontWeight: 'normal' }}>Дисциплина</h2>
//       <hr style={{ width: '100%', margin: '10px auto' }} />
//       <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
//         {disciplines.map((discipline) => (
//           <div key={discipline} style={{ display: 'flex', alignItems: 'center' }}>
//             <button
//               onClick={() => handleDisciplineSelect(discipline)}
//               style={{
//                 cursor: 'pointer',
//                 padding: '5px 10px',
//                 border: '1px solid #ccc',
//                 borderRadius: '5px',
//                 fontSize: '16px',
//                 width: '100%',
//                 textAlign: 'left',
//               }}
//             >
//               {discipline}
//             </button>
//             <input
//               type="checkbox"
//               checked={selectedDisciplines.includes(discipline)}
//               onChange={() => handleDisciplineSelect(discipline)}
//               style={{ marginLeft: '10px' }}
//             />
//           </div>
//         ))}
//         <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//           <input
//             type="checkbox"
//             checked={selectedDisciplines.length === disciplines.length}
//             onChange={handleSelectAllDisciplines}
//             style={{ marginRight: '10px' }}
//           />
//           <button
//             onClick={handleSelectAllDisciplines}
//             style={{
//               cursor: 'pointer',
//               padding: '5px 10px',
//               border: '1px solid #ccc',
//               borderRadius: '5px',
//               fontSize: '16px',
//               width: '100%',
//               backgroundColor: selectedDisciplines.length === disciplines.length ? '#4CAF50' : 'white',
//               color: selectedDisciplines.length === disciplines.length ? 'white' : '#333',
//             }}
//           >
//             {selectedDisciplines.length === disciplines.length ? 'Выбрать все дисциплины' : 'Показать все дисциплины'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default FilterComponent;

// Самый лучший поиск// const FilterComponent = ({ customContainerStyle }) => {
//   const [selectedDisciplines, setSelectedDisciplines] = useState(['Математика', 'Программирование', 'Иностранный язык']);
//   const disciplines = ['Математика', 'Программирование', 'Иностранный язык'];

//   const handleDisciplineSelect = (discipline) => {
//     if (selectedDisciplines.includes(discipline)) {
//       setSelectedDisciplines(selectedDisciplines.filter((item) => item !== discipline));
//     } else {
//       setSelectedDisciplines([...selectedDisciplines, discipline]);
//     }
//   };

//   const handleSelectAllDisciplines = () => {
//     if (selectedDisciplines.length === disciplines.length) {
//       setSelectedDisciplines([]);
//     } else {
//       setSelectedDisciplines(disciplines);
//     }
//   };

//   return (
//     <div style={customContainerStyle}>
//       <h2 style={{ textAlign: 'center', fontWeight: 'normal' }}>Дисциплина</h2>
//       <hr style={{ width: '100%', margin: '10px auto' }} />
//       <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
//         {disciplines.map((discipline) => (
//           <div key={discipline} style={{ display: 'flex', alignItems: 'center' }}>
//             <button
//               onClick={() => handleDisciplineSelect(discipline)}
//               style={{
//                 cursor: 'pointer',
//                 padding: '5px 10px',
//                 border: '1px solid #ccc',
//                 borderRadius: '5px',
//                 fontSize: '16px',
//                 width: '100%',
//                 textAlign: 'left',
//               }}
//             >
//               {discipline}
//             </button>
//             <input
//               type="checkbox"
//               checked={selectedDisciplines.includes(discipline)}
//               onChange={() => handleDisciplineSelect(discipline)}
//               style={{ marginLeft: '10px' }}
//             />
//           </div>
//         ))}
//         <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//           <input
//             type="checkbox"
//             checked={selectedDisciplines.length === disciplines.length}
//             onChange={handleSelectAllDisciplines}
//             style={{ marginRight: '10px' }}
//           />
//           <button
//             onClick={handleSelectAllDisciplines}
//             style={{
//               cursor: 'pointer',
//               padding: '5px 10px',
//               border: '1px solid #ccc',
//               borderRadius: '5px',
//               fontSize: '16px',
//               width: '100%',
//               backgroundColor: selectedDisciplines.length === disciplines.length ? '#4CAF50' : 'white',
//               color: selectedDisciplines.length === disciplines.length ? 'white' : '#333',
//             }}
//           >
//             {selectedDisciplines.length === disciplines.length ? 'Выбрать все дисциплины' : 'Показать все дисциплины'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;

// Поиск с проблемой в названии
// const FilterComponent = ({ customContainerStyle }) => {
//   const [selectedDisciplines, setSelectedDisciplines] = useState(['Математика', 'Программирование', 'Иностранный язык']);
//   const [selectedDiscipline, setSelectedDiscipline] = useState('Выбрать дисциплину');
//   const disciplines = ['Математика', 'Программирование', 'Иностранный язык'];

//   const handleDisciplineSelect = (discipline) => {
//     if (selectedDisciplines.includes(discipline)) {
//       setSelectedDisciplines(selectedDisciplines.filter((item) => item !== discipline));
//     } else {
//       setSelectedDisciplines([...selectedDisciplines, discipline]);
//     }
//     setSelectedDiscipline(discipline);
//   };

//   return (
//     <div style={customContainerStyle}>
//       <h2 style={{ textAlign: 'center', fontWeight: 'normal' }}>{selectedDiscipline}</h2>
//       <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
//         <select
//           style={{
//             padding: '5px 10px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             fontSize: '16px',
//             width: '100%',
//             textAlign: 'left',
//           }}
//           className="discipline-select"
//           value={selectedDiscipline}
//           onChange={(e) => handleDisciplineSelect(e.target.value)}
//         >
//           <option value="Выбрать дисциплину">Выбрать дисциплину</option>
//           {disciplines.map((discipline) => (
//             <option key={discipline} value={discipline}>
//               {discipline}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;
