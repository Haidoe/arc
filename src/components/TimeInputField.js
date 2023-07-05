// //create time input field component for the form with onChange event handler
const TimeInputField = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="time"
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

export default TimeInputField;

//create time input field component dropdowm for the form with onChange event handler

// const TimeInputField = ({ name, label, value, onChange }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="form-control"
//       >
//         <option value="" />
//         <option value="1">1:00</option>
//         <option value="2">2:00</option>
//         <option value="3">3:00</option>
//         <option value="4">4:00</option>
//         <option value="5">5:00</option>
//         <option value="6">6:00</option>
//         <option value="7">7:00</option>
//         <option value="8">8:00</option>
//         <option value="9">9:00</option>
//         <option value="10">10:00</option>
//         <option value="11">11:00</option>
//         <option value="12">12:00</option>
//       </select>
//     </div>
//   );
// }

// export default TimeInputField;
