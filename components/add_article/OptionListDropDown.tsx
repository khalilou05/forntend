import useFetch from "@/hooks/useFetch";
import Card from "../Card";
import Portal from "../Portal";
import type { OptionItem } from "@/types/types";
import Input from "../Input";

type Prop = {
  optionID: string;
};

export default function OptionListDropDown({ optionID }: Prop) {
  const { data: options } = useFetch<OptionItem[]>(
    `/option?option_id=${optionID}`
  );
  return (
    <Portal>
      <Card type="floating">
        {options?.map((option) => (
          <div key={option.id}>
            <Input type="checkbox" />
            {option.key}
          </div>
        ))}
      </Card>
    </Portal>
  );
}
