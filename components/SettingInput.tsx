import { Input } from "@ensdomains/thorin";
import useEnsText from "./hooks/useText";
import { useState } from "react";

export const SettingInput = ({fieldName, fieldKey, node, newTextStr, handleChange}:{
    fieldName: string,
    fieldKey: string,
    node: string,
    newTextStr: string,
    handleChange: any
}) => {

    const { data, isError } = useEnsText(node, fieldKey as string);
    const placeholderText = typeof data === 'string' ? data : '';
    console.log(fieldKey, data);

  return (
    <Input
      hideLabel
      clearable
      label="Wallet Address"
      id={fieldName}
      name={fieldName}
      value={newTextStr}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
      placeholder={placeholderText}
    />
  );
};
