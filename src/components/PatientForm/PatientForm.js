import React, { useState } from 'react';
import { User, CalendarDays, Users, MapPin, Save } from 'lucide-react';

// Input Field Component
const InputField = ({ id, name, type = "text", value, onChange, placeholder, required, icon: Icon, label }) => {
  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white/80 border border-[#BAD6EB]/40 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#334EAC]/30 focus:border-[#334EAC] transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-[#081F5C]";

  return (
    <div className="relative">
      <label htmlFor={id} className={labelClasses}>
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#334EAC]" />
          <span>{label}</span>
        </div>
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows="2"
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
        />
      )}
    </div>
  );
};

// Select Field Component
const SelectField = ({ id, name, value, onChange, required, icon: Icon, label, options }) => {
  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white/80 border border-[#BAD6EB]/40 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#334EAC]/30 focus:border-[#334EAC] transition-all duration-200";

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-[#081F5C]">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#334EAC]" />
          <span>{label}</span>
        </div>
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClasses}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Patient Form Component
const PatientForm = ({ onAddPatient }) => {
  const [patient, setPatient] = useState({ name: '', age: '', gender: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddPatient(patient);
    setPatient({ name: '', age: '', gender: '', address: '' });
  };

  const genderOptions = [
    { value: "", label: "Select gender", disabled: true },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#D0E3FF]/30 to-[#BAD6EB]/30 p-4 rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="name"
          name="name"
          value={patient.name}
          onChange={handleChange}
          placeholder="Enter patient's full name"
          required
          icon={User}
          label="Full Name"
        />

        <InputField
          id="age"
          name="age"
          type="number"
          value={patient.age}
          onChange={handleChange}
          placeholder="Enter patient's age"
          required
          icon={CalendarDays}
          label="Age"
        />

        <SelectField
          id="gender"
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          required
          icon={Users}
          label="Gender"
          options={genderOptions}
        />

        <InputField
          id="address"
          name="address"
          type="textarea"
          value={patient.address}
          onChange={handleChange}
          placeholder="Enter patient's address"
          required
          icon={MapPin}
          label="Address"
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#334EAC] to-[#7096D1] hover:from-[#2A3F8D] hover:to-[#5C7AB0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#334EAC] transition-all duration-200"
        >
          <Save size={16} />
          Register Patient
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
