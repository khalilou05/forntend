import style from "@/css/component/searchInput.module.css";
import SearchIcon from "@/assets/icons/search";

type Prop = {
  id?: string;
  value?: string;
  placeholder: string;
  onChange?: (...args: any) => void;
};

export default function SearchInput({
  placeholder,
  id,
  value,
  onChange,
}: Prop) {
  return (
    <div className={style.input_search}>
      <SearchIcon size={20} />
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
      />
    </div>
  );
}
