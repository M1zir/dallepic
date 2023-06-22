/**
 * FormField is a reusable component that renders a form field with a label, input, and optional "surprise me" button.
 * @param {string} labelName - The label for the form field.
 * @param {string} type - The type of input (e.g. text, email, password).
 * @param {string} name - The name of the input field.
 * @param {string} value - The value of the input field.
 * @param {function} onChange - The function to handle changes to the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {function} handleChange - The function to handle changes to the input field.
 * @param {boolean} isSurpriseMe - A boolean indicating whether to show the "surprise me" button.
 * @param {function} handleSurpriseMe - The function to handle clicks on the "surprise me" button.
 * @returns {JSX.Element} - A form field with a label, input, and optional "surprise me" button.
 */
import React from 'react';

const FormField = ({labelName, type, name, value, onChange, placeholder, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#247075] py-1 px-2 text-white rounded-[5px]"> 
            surpise me
            </button>
        )}
      </div>
      <input 
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className="bg-[#cdd6da] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#15058f] focus:border-[#15058f] outline-none block w-full p-3"
      />
    </div>
  )
}

export default FormField;

