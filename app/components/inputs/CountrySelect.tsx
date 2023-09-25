"use client";
import useCountries from "@/app/hooks/useCountries";
import { UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import Select from "react-select";
import { SetStateAction, Dispatch } from "react";

export interface CountrySelectValue {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
  value: CountrySelectValue;
  formOnChange?: UseFormSetValue<FieldValues>;
  dispatchOnChange?: Dispatch<SetStateAction<CountrySelectValue>>;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  dispatchOnChange,
  formOnChange,
}) => {
  const { getAll } = useCountries();

  return (
    <>
      <div>
        <Select
          placeholder="Anywhere"
          isClearable
          options={getAll()}
          value={value}
          onChange={(value) => {
            dispatchOnChange
              ? dispatchOnChange(value)
              : formOnChange && formOnChange("location", value);
          }}
          formatOptionLabel={(option: any) => (
            <div
              className="
          flex flex-row items-center gap-3"
            >
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </div>
            </div>
          )}
          classNames={{
            control: () => "p-3 border-2",
            input: () => "text-lg",
            option: () => "text-lg",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6",
            },
          })}
        />
      </div>
    </>
  );
};

export default CountrySelect;
