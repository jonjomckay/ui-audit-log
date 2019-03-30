import React from 'react';
import Select from 'react-select';

const ReactSelect = (props) => (
    <Select { ...props } styles={{
        control: (base, state) => ({
            ...base,
            minHeight: 32,
            borderColor: state.selectProps.menuIsOpen ? '#66afe9' : '#cccccc',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            boxShadow: state.selectProps.menuIsOpen ? 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);' : 'inset 0 1px 1px rgba(0,0,0,.075);',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
        }),
        clearIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
        }),
    }} />
);

export default ReactSelect;
