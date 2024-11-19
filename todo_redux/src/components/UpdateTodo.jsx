/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../features/todo/todoSlice';
function UpdateTodo({ editingTodo, setEditingTodo }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.text);
    }
  }, [editingTodo]);
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: editingTodo.id, text: input })); 
    setInput(''); 
    setEditingTodo(null);
  };
  return (
    <form onSubmit={handleUpdate} className="space-x-3 mt-12">
        <input
            type="text" 
            className="bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Update Todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit"
            className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
        >
            Update Todo
        </button>
        <button type="button" onClick={() => setEditingTodo(null)}
            className="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg ml-2"
        >
            Cancel
        </button>
    </form>
  );
}
export default UpdateTodo;