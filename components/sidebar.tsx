"use client";

import ManageIcon from "@/assets/aside_icons/articleManage.js";
import TruckIcon from "@/assets/aside_icons/truck.js";
import OrdersIcon from "@/assets/icons/orders.js";
import SettingIcon from "@/assets/aside_icons/setting.js";
import LogoutIcon from "@/assets/aside_icons/logout.js";
import PuzzuleIcon from "@/assets/aside_icons/puzzule";
import style from "@/css/component/sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/api/fetchApi";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetchApi("/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  const navItemMid = [
    {
      name: "إدارة المنـتجـات",
      href: "/admin/products",
      icon: <ManageIcon size="25px" />,
    },
    {
      name: "إدارة التوصيل",
      href: "/admin/shipping",
      icon: <TruckIcon size="25px" />,
    },
    {
      name: "الطلبيات",
      href: "/admin/orders",
      icon: <OrdersIcon size="25px" />,
    },
    {
      name: "إدارة البكسلات",
      href: "/admin/pixel",
      icon: <PuzzuleIcon size="22px" />,
    },
  ];

  return (
    <nav className={style.wraper}>
      <div className={style.top_section}></div>
      <div className={style.midle_section}>
        {navItemMid.map((item) => (
          <div
            key={item.name}
            className={
              pathname.includes(item.href)
                ? style.link_box__active
                : style.link_box
            }
          >
            {item.icon}
            <Link href={item.href}>{item.name}</Link>
          </div>
        ))}
      </div>
      <div className={style.bottom_section}>
        <div
          className={
            pathname == "/admin/setting"
              ? style.link_box__active
              : style.link_box
          }
        >
          <SettingIcon size="25px" />
          <Link href={"/admin/setting"}>إعـــــدادات</Link>
        </div>
        <div
          onClick={handleLogout}
          className={style.link_box}
        >
          <LogoutIcon size="25px" />
          <Link href="">الــخـــروج</Link>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
