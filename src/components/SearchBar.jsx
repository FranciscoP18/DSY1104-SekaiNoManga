export default function SearchBar({ value, onChange, placeholder = "Buscar mangas..." }) {
  return (
    <div className="mb-3">
      <input
        className="form-control"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
