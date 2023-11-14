export const PersonForm = ({ addName, newName, newPhone, nameChange, phoneChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={nameChange} />
        phone: <input
          value={newPhone}
          onChange={phoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  );
};
