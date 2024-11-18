import style from "@/css/component/articleOptionCard.module.css";
import type { OptionItems, Product, ProductOption } from "@/types/types";
import PlusIcon from "@/assets/icons/plusCircle";
import TrashIcon from "@/assets/icons/trash";
import React, { useEffect, useRef, useState } from "react";
import { generateUUID } from "@/lib/genUUID";
import Button from "../Button";

export default function OptionCard({
  options,
  setProduct,
  handleProductUpdate,
}: {
  options: ProductOption[];
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  handleProductUpdate: (
    prop: keyof Product,
    value: string | number | boolean
  ) => void;
}) {
  const addProductOption = () => {
    setProduct((prv) => ({
      ...prv,
      option: [
        ...prv.option,
        {
          id: generateUUID(),
          name: "",
          items: [{ id: generateUUID(), item_name: "", price: 0, stock: 0 }],
        },
      ],
    }));
  };

  const updateOptionItem = (
    optionID: number | string,
    itemID: number | string,
    prop: keyof OptionItems,
    value: string | number
  ) => {
    setProduct((prv) => {
      const updatedOption = options.map((option) => {
        if (option.id !== optionID) return option;
        const updatedOptionItem = option.items.map((item) =>
          item.id === itemID ? { ...item, [prop]: value } : item
        );
        const lastItem = updatedOptionItem[updatedOptionItem.length - 1];
        const shouldAddNewItem = lastItem && lastItem.item_name !== "";
        if (shouldAddNewItem) {
          updatedOptionItem.push({
            id: generateUUID(),
            item_name: "",
            price: 0,
            stock: 0,
          });
        }
        return { ...option, items: updatedOptionItem };
      });
      return { ...prv, option: updatedOption };
    });
  };
  const deleteOptionItem = (
    optionID: number | string,
    itemID: number | string
  ) => {
    const newOption = options.map((option) =>
      option.id === optionID
        ? {
            ...option,
            items: option.items.filter((item) => item.id !== itemID),
          }
        : option
    );
    setProduct((prv) => ({ ...prv, option: newOption }));
  };
  const deleteOption = (optionID: number | string) => {
    const newArray = options.filter((option) => option.id !== optionID);
    setProduct((prv) => ({ ...prv, option: newArray }));
  };

  const updateOptionName = (optionID: number | string, optionName: string) => {
    const newOptions = options.map((option) =>
      option.id === optionID ? { ...option, name: optionName } : option
    );
    setProduct((prv) => ({ ...prv, option: newOptions }));
  };

  useEffect(() => {
    if (options.length === 0) {
      handleProductUpdate("has_option", false);
    } else {
      handleProductUpdate("has_option", true);
    }
  }, [options.length]);
  return (
    <div className={style.option_card}>
      <div className={style.title}>خيارات المنتج</div>
      {!!options?.length && (
        <div className={style.option_warper}>
          {options.map((option) => (
            <OptionItem
              optionName={option.name}
              optionID={option.id}
              setProduct={setProduct}
              deleteOption={deleteOption}
              deleteOptionItem={deleteOptionItem}
              updateOptionName={updateOptionName}
              updateOptionItem={updateOptionItem}
              key={option.id}
              items={option.items}
            />
          ))}

          <button
            onClick={addProductOption}
            className={style.add_otherOpt_btn}
          >
            <PlusIcon size={20} />
            إضافة خيار آخر
          </button>
        </div>
      )}

      {options.length === 0 && (
        <button
          onClick={addProductOption}
          className={style.add_opt_btn}
        >
          <PlusIcon size={20} />
          إضافة خيارات مثل الحجم أو الألوان
        </button>
      )}
    </div>
  );
}

function OptionItem({
  optionID,
  optionName,
  items,
  setProduct,
  deleteOption,
  deleteOptionItem,
  updateOptionItem,
  updateOptionName,
}: {
  items: OptionItems[];
  optionID: string | number;
  optionName: string;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  deleteOption: (index: number | string) => void;
  deleteOptionItem: (
    optionID: number | string,
    itemID: number | string
  ) => void;
  updateOptionName: (index: number | string, optionName: string) => void;
  updateOptionItem: (
    optionID: number | string,
    itemID: number | string,
    prop: keyof OptionItems,
    value: string | number
  ) => void;
}) {
  const [expand, setExpand] = useState(false);
  const optionNameInput = useRef<HTMLInputElement | null>(null);
  const itemInputList = useRef<Map<string, HTMLInputElement> | null>(null);

  const getMap = () => {
    if (!itemInputList.current) {
      itemInputList.current = new Map();
    }
    return itemInputList.current;
  };

  const handleRefInit = (node: HTMLInputElement | null, i: number) => {
    const map = getMap();
    if (node) {
      map.set(`item${i}`, node);
    } else {
      map.delete(`item${i}`);
    }
  };

  const handleKeyDonw = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputIndex: number,
    optionID: string | number,
    itemID: string | number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      itemInputList.current?.get(`item${inputIndex + 1}`)?.focus();
    }
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      inputIndex > 0
    ) {
      e.preventDefault();
      deleteOptionItem(optionID, itemID);
      itemInputList.current?.get(`item${inputIndex - 1}`)?.focus();
    }
  };
  const handleChangeItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemID: string | number
  ) => {
    updateOptionItem(optionID, itemID, "item_name", e.target.value);
  };
  const handleCollapse = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (optionName === "") {
      optionNameInput.current?.focus();
      return;
    }
    if (expand) {
      setProduct((prv) => {
        const newOption = prv.option.map((option) => {
          if (option.id === optionID) {
            return {
              ...option,
              items: [
                ...option.items,
                { id: generateUUID(), price: 0, item_name: "", stock: 0 },
              ],
            };
          }
          return option;
        });
        return { ...prv, option: newOption };
      });
    } else {
      setProduct((prv) => {
        const updatedOption = prv.option.map((option) => {
          if (option.id === optionID) {
            return {
              ...option,
              items: option.items.filter((item) => item.item_name !== ""),
            };
          }
          return option;
        });
        return { ...prv, option: updatedOption };
      });
    }

    setExpand(!expand);
  };

  useEffect(() => {
    if (optionNameInput.current) {
      optionNameInput.current.focus();
    }
  }, []);

  if (expand) {
    return (
      <div
        className={style.option_view}
        onClick={handleCollapse}
      >
        <label>{optionName}</label>
        <div className={style.item_warper}>
          {items.map((item) => (
            <span
              className={style.item_badge}
              key={item.id}
            >
              {item.item_name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form className={style.option}>
      <label>إسم الخيار</label>
      <input
        required
        ref={optionNameInput}
        value={optionName}
        type="text"
        onChange={(e) => updateOptionName(optionID, e.target.value)}
      />
      <label>الخيارات</label>
      <div className={style.input_warper}>
        {items.map((item, i) => {
          return (
            <div
              className={style.item_input}
              key={item.id}
            >
              <input
                onKeyDown={(e) => handleKeyDonw(e, i, optionID, item.id)}
                ref={(node) => handleRefInit(node, i)}
                required
                tabIndex={0}
                value={item.item_name}
                type="text"
                onChange={(e) => handleChangeItem(e, item.id)}
              />
              {items.length > 2 && item.item_name !== "" && (
                <button
                  tabIndex={-1}
                  onClick={() => {
                    deleteOptionItem(optionID, item.id);
                  }}
                >
                  <TrashIcon size={15} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className={style.btn_bar}>
        <Button
          onClick={(e) => handleCollapse(e)}
          type="primary"
        >
          حفض
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            deleteOption(optionID);
          }}
          type="secandary"
          className={style.btn_remove}
        >
          حذف
        </Button>
      </div>
    </form>
  );
}
