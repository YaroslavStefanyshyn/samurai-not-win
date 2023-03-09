import React, {memo, useCallback} from "react";
import Select, {SingleValue} from "react-select";
import {useGetModeData} from "../../hooks/useGetModeData";
import {mockData} from "../../constants";

export interface SelectedValue {
  field: number;
  value: string;
  label: string;
}

interface IProps {
  onSelect: (e: SingleValue<SelectedValue>) => void;
  selectedOption: string;
  setOpenSelect: (a: boolean) => void;
}

export default memo(({ ...props }: IProps) => {
  const {modeData, loading} = useGetModeData();

  const handleTypeSelect = useCallback(
    (selectedOption: SingleValue<SelectedValue>) => {
      props.onSelect(selectedOption);
    },
    [props.onSelect]
  );
  return (
    <div className="App_change-mode__selector">
      <Select
        options={modeData ?? mockData}
        onChange={handleTypeSelect}
        value={modeData?.find(option => option.value === props.selectedOption)}
        placeholder={'Pick mode'}
        isLoading={loading}
        onMenuOpen={() => props.setOpenSelect(true)}
        onMenuClose={() => props.setOpenSelect(false)}
      />
    </div>
  );
})

