import Card from "./Card";
import SearchInput from "./SearchInput";

export default function ProductOptionSearch() {
  return (
    <>
      <br />
      <Card type="floating">
        <div className="style.search_bar">
          <SearchInput
            autoFocus={true}
            placeholder="إبحث"
          />
        </div>
        <div className="style.main"></div>
        <div className="style.footer"></div>
      </Card>
    </>
  );
}
