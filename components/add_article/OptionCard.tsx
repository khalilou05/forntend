import style from "@/css/component/articleOptionCard.module.css";
import type { OptionItem, ProductOption } from "@/types/types";
import PlusIcon from "@/assets/icons/plusCircle";
import TrashIcon from "@/assets/icons/trash";
import React, { useEffect, useRef, useState } from "react";

import Button from "../Button";
import Card from "../Card";
import Input from "../Input";

import OptionListDropDown from "./OptionListDropDown";
import DropDown from "../DropDown";

type Prop = {
  options: ProductOption[];
  setProductOption: React.Dispatch<React.SetStateAction<ProductOption[]>>;
};

export default function OptionCard({ options, setProductOption }: Prop) {
  const addCustomProductOption = () => {
    setProductOption((prv) => [
      ...prv,
      {
        id: crypto.randomUUID(),
        is_custom: true,
        name: "",
        items: [{ id: crypto.randomUUID(), key: "", value: "" }],
      },
    ]);
  };

  return (
    <Card
      style={{ gap: 10 }}
      title="خيارات المنتج"
    >
      {!!options?.length && (
        <div className={style.option_warper}>
          {options.map((option) => (
            <CustomOption
              key={option.id}
              option={option}
              setProductOption={setProductOption}
            />
          ))}

          <button className={style.add_otherOpt_btn}>
            <PlusIcon size={20} />
            إضافة خيار آخر
          </button>
        </div>
      )}

      {!options.length && (
        <DropDown
          customWidth={200}
          customHeith={100}
          align="right"
          component={(__, ref, _, togleDropDown) => (
            <button
              ref={ref}
              onClick={togleDropDown}
              className={style.add_opt_btn}
            >
              <PlusIcon size={20} />
              إضافة خيارات مثل الحجم أو الألوان
            </button>
          )}
          renderChildren={() => <p onClick={addCustomProductOption}>khalil</p>}
        />
      )}
    </Card>
  );
}

function CustomOption({
  option,
  setProductOption,
}: {
  option: ProductOption;
  setProductOption: React.Dispatch<React.SetStateAction<ProductOption[]>>;
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
      inputIndex === option.items.length - 1
    ) {
      e.preventDefault();
      itemInputList.current?.get(`item${inputIndex - 1}`)?.focus();
    }
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      inputIndex > 0 &&
      inputIndex !== option.items.length - 1
    ) {
      e.preventDefault();
      deleteOptionItem(optionID, itemID);
      itemInputList.current?.get(`item${inputIndex - 1}`)?.focus();
    }
  };

  const handleKeyDonwFirstInp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const map = getMap();
      map.get("item0")?.focus();
    }
  };

  const handleCollapse = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (option.name === "") {
      optionNameInput.current?.focus();
      return;
    }
    if (expand) {
      setProductOption((prv) => {
        const newOption = prv.map((prvItem) => {
          if (option.id === prvItem.id) {
            return {
              ...prvItem,
              items: [
                ...prvItem.items,
                { id: crypto.randomUUID(), key: "", value: "" },
              ],
            };
          }
          return prvItem;
        });
        return newOption;
      });
    } else {
      setProductOption((prv) => {
        const updatedOption = prv.map((prvOption) => {
          if (option.id === prvOption.id) {
            return {
              ...option,
              items: option.items.filter((item) => item.key !== ""),
            };
          }
          return prvOption;
        });
        return updatedOption;
      });
    }

    setExpand(!expand);
  };
  // const checkDoubleItem = () => {
  //   if (option.items.length === 1) return;

  //   for (let i = 0; i < option.items.length; i++) {
  //     if (i + 1 >= option.items.length) return;
  //     if (option.items[i].item_name === option.items[i + 1].item_name) {
  //       setProductOption((prv) => {
  //         const newItem = prv.map((opt) => {
  //           return {
  //             ...opt,
  //             items: opt.items.map((itm) =>
  //               itm.id === option.items[i + 1].id
  //                 ? { ...itm, invalid: true }
  //                 : itm
  //             ),
  //           };
  //         });

  //         return newItem;
  //       });
  //     } else {
  //       setProductOption((prv) => {
  //         const newItem = prv.map((opt) => {
  //           return {
  //             ...opt,
  //             items: opt.items.map((itm) => ({ ...itm, invalid: false })),
  //           };
  //         });

  //         return newItem;
  //       });
  //     }
  //   }
  // };
  const updateOptionItem = (
    optionID: number | string,
    itemID: number | string,
    prop: keyof OptionItem,
    value: string
  ) => {
    setProductOption((prv) => {
      const updatedOption = prv.map((option) => {
        if (option.id !== optionID) return option;
        const updatedOptionItem = option.items.map((item) =>
          item.id === itemID ? { ...item, [prop]: value } : item
        );
        const lastItem = updatedOptionItem[updatedOptionItem.length - 1];
        const shouldAddNewItem = lastItem && lastItem.key.trim() !== "";
        if (shouldAddNewItem) {
          updatedOptionItem.push({
            id: crypto.randomUUID(),
            key: "",
            value: "",
          });
        }
        return { ...option, items: updatedOptionItem };
      });
      return updatedOption;
    });
  };
  const deleteOptionItem = (
    optionID: number | string,
    itemID: number | string
  ) => {
    setProductOption((prv) =>
      prv.map((opt) => ({
        ...opt,
        items: opt.items.filter((itm) => itm.id !== itemID),
      }))
    );
  };
  const deleteOption = (optionID: number | string) => {
    setProductOption((prv) => prv.filter((opt) => opt.id !== optionID));
  };

  const updateOptionName = (optionID: number | string, optionName: string) => {
    setProductOption((prv) =>
      prv.map((opt) =>
        opt.id === optionID ? { ...opt, name: optionName } : opt
      )
    );
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
        <label>{option.name}</label>
        <div className={style.item_warper}>
          {option.items.map((item) => (
            <span
              className={style.item_badge}
              key={item.id}
            >
              {item.key}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form className={style.option}>
      <label>إسم الخيار</label>
      <Input
        ref={optionNameInput}
        value={option.name}
        onChange={(e) => updateOptionName(option.id, e.target.value)}
        onKeyDown={handleKeyDonwFirstInp}
      />
      <label>الخيارات</label>
      <div className={style.input_warper}>
        {option.items.map((item, i) => {
          return (
            <div
              className={style.item_input}
              key={item.id}
            >
              <Input
                onKeyDown={(e) => handleKeyDonw(e, i, option.id, item.id)}
                onChange={(e) =>
                  updateOptionItem(option.id, item.id, "key", e.target.value)
                }
                ref={(node) => handleRefInit(node, i)}
                tabIndex={0}
              />

              {option.items.length > 2 && item.value.trim() !== "" && (
                <TrashIcon
                  tabIndex={-1}
                  onClick={() => {
                    deleteOptionItem(option.id, item.id);
                  }}
                  size={15}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={style.btn_bar}>
        <Button
          onClick={(e) => handleCollapse(e)}
          buttonType="primary"
        >
          حفض
        </Button>
        <Button
          style={{ color: "#8e0b21" }}
          onClick={(e) => {
            e.preventDefault();
            deleteOption(option.id);
          }}
          buttonType="secandary"
        >
          حذف
        </Button>
      </div>
    </form>
  );
}

function Option({ option }: { option: ProductOption }) {
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const showDropdown = () => {
    setDropDownVisible(true);
  };
  const hideDropDown = () => {
    setDropDownVisible(false);
  };
  return (
    <form className={style.option}>
      <label>إسم الخيار</label>
      <Input
        value={option.name}
        readOnly
      />
      <label>الخيارات</label>
      <div className={style.input_warper}>
        <div className="{style.label}"></div>
        <Input
          onFocus={showDropdown}
          onBlur={hideDropDown}
        />
      </div>
      {dropDownVisible && <OptionListDropDown optionID={option.id} />}
      <div className={style.btn_bar}>
        <Button buttonType="primary">حفض</Button>
        <Button
          style={{ color: "#8e0b21" }}
          onClick={(e) => {}}
          buttonType="secandary"
        >
          حذف
        </Button>
      </div>
    </form>
  );
}
