import { SearchInput } from "@/components/inputGroup";
import Card from "./Card";

export default function ProductOptionSearch() {
  return (
    <>
      <br />
      <Card type="dropDown">
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
