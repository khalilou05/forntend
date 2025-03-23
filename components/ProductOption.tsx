import PlusIcon from "@/assets/icons/plusCircle";
import TrashIcon from "@/assets/icons/trash";
import style from "@/css/component/optionCard.module.css";
import type { OptionItem, ProductOption } from "@/types/types";
import React, { useContext, useEffect, useRef, useState } from "react";

import Button from "./Button";
import Card from "./Card";
import Input from "./Input";

import { Context } from "@/context/AddProductContext";
import CheckBox from "./CheckBox";
import DropDown from "./DropDown";
import OptionListDropDown, {
  OptionListItemDrp,
} from "./add_article/OptionListDropDown";

export default function ProductOption() {
  const { productOption: options, setProductOption } = useContext(Context);
  const inOption = (optionId: string, newItem: OptionItem) => {
    const isIn = options.find((opt) => {
      if (opt.id === optionId) {
        const isInItem = opt.items.find((itm) => itm.id === newItem.id);
        return isInItem ? true : false;
      }
      return false;
    });
    return isIn ? true : false;
  };

  const togleAddOptionItem = (optionId: string, newItem: OptionItem) => {
    const isInOption = inOption(optionId, newItem);
    if (isInOption) {
      setProductOption((prv) =>
        prv.map((opt) =>
          opt.id === optionId
            ? {
                ...opt,
                items: opt.items.filter((itm) => itm.id !== newItem.id),
              }
            : opt
        )
      );
    } else {
      setProductOption((prv) =>
        prv.map((opt) =>
          opt.id === optionId
            ? {
                ...opt,
                items: [...opt.items, newItem],
              }
            : opt
        )
      );
    }
  };

  return (
    <Card
      style={{ gap: 10 }}
      title="خيارات المنتج"
    >
      {!!options?.length && (
        <div className={style.option_warper}>
          {options.map((option) => (
            <Option
              togleAddOptionItem={togleAddOptionItem}
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
          sameWidth
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
          renderChildren={(closeDropDown) => (
            <OptionListDropDown setProductOption={setProductOption} />
          )}
        />
      )}
    </Card>
  );
}

function Option({
  option,
  setProductOption,
  togleAddOptionItem,
}: {
  option: ProductOption;
  setProductOption: React.Dispatch<React.SetStateAction<ProductOption[]>>;
  togleAddOptionItem: (optionId: string, newItem: OptionItem) => void;
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
        const lastItem = updatedOptionItem.at(-1);
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

  const updateOptionName = (optionID: string, optionName: string) => {
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
        readOnly={!option.is_custom}
        onChange={(e) => updateOptionName(option.id, e.target.value)}
        onKeyDown={handleKeyDonwFirstInp}
      />
      <label>الخيارات</label>
      <div className={style.input_warper}>
        {option.is_custom === false ? (
          <>
            {option.items.map((itm) => (
              <div key={itm.id}>{itm.key}</div>
            ))}
            <DropDown
              sameWidth
              align="right"
              component={(_, ref, openDropDown) => (
                <Input
                  ref={ref}
                  onClick={openDropDown}
                />
              )}
              renderChildren={(closeDropDown) => (
                <OptionListItemDrp
                  togleAddOptionItem={togleAddOptionItem}
                  option_id={option.id}
                />
              )}
            />
          </>
        ) : (
          option.items.map((item, i) => {
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

                {option.items.length > 2 && item.key.trim() && (
                  <TrashIcon
                    onClick={() => {
                      deleteOptionItem(option.id, item.id);
                    }}
                  />
                )}
              </div>
            );
          })
        )}
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

export function VariantCard(options: ProductOption[]) {
  const [selectedVariant, setSelectedVariant] = useState();
  const generateVariant = () => {
    const [firstOpt, rest] = options;
    const firstVariant = firstOpt.items.map((item) => ({
      name: item.key,
      media_id: "",
      stock: 0,
      price: 0,
      items: [],
    }));
  };
  return (
    <>
      <div className="header">
        <CheckBox />
        <li>Variant</li>
        <li>Price</li>
        <li>aviailibe</li>
      </div>
    </>
  );
}
