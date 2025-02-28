"use client";

import React, { useEffect, useRef, useState } from "react";

import DatePicker from "@/components/DatePicker";
import Card from "@/components/Card";
import ProductOptionSearch from "@/components/ProductOptionSearch";
import InputNumber from "@/components/InputNumber";
import Switch from "@/components/Switch";
import LoadingSpiner from "@/components/LoadingSpiner";
import ColorPicker from "@/components/ColorPicker";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import { LineSkeleteon } from "@/components/Skeleteon";

export default function Page() {
  return (
    <>
      <br />
      <LineSkeleteon lineNum={2} />
    </>
  );
}
