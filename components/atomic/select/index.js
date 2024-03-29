import { Fragment, useState, useEffect, forwardRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect, CgCheck } from "react-icons/cg";

const Select = forwardRef((props, ref) => {
  const { data, onChange, label, id, width, defaultValue, defaultValueIndex, selectMultiple, maxSelectable, error } = props
  const [selected, setSelected] = useState(null);

  const isSelected = (value) => selectMultiple ? !!selected?.find((el) => el.key === value.key) : selected.key === value.key

  const handleSelect = res => {
    if (selectMultiple) {
      if (!isSelected(res)) {
        if (maxSelectable && selected?.length >= maxSelectable) return
        const selectedUpdated = [
          ...selected,
          data.find((el) => el === res)
        ];
        setSelected(selectedUpdated);
        onChange && onChange(selectedUpdated);
      } else {
        handleDeselect(res);
      }
    } else {
      setSelected(res);
      onChange && onChange(res);
    }
  };

  function handleDeselect(value) {
    const selectedUpdated = selected.filter((el) => el.key !== value.key);
    setSelected(selectedUpdated.length ? selectedUpdated : []);
    onChange && onChange(selectedUpdated);
  }

  useEffect(() => {
    if (selectMultiple) {
      setSelected(defaultValue ? defaultValue : [])
    } else {
      handleSelect(defaultValue ? defaultValue : data[defaultValueIndex || 0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={`w-${width || '72'}`}>
      {label ? (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      ) : null}

      <Listbox
        value={selected}
        onChange={handleSelect}
      >
        <div className="relative mt-1">
          <Listbox.Button className={`border relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ${error ? "border-red-500" : ""}`}>
            <span className="block truncate">{selectMultiple ? (selected?.length ? 'Selected: ' + selected.length : 'Select') : (selected?.name || "")}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <CgSelect
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map(d => {
                const { name, key } = d;
                return (
                <Listbox.Option
                  key={key}
                  className={({ active }) => `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"} select-none relative py-2 pl-10 pr-4 hover:bg-blue-100 cursor-pointer`}
                  value={d}
                >
                  {({ active }) => {
                    const selected = isSelected(d);
                    return (
                    <>
                      <span
                        className={`${selected ? "font-bold" : "font-normal"} block truncate`}
                      >
                        {name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-amber-600" : "text-amber-600"} absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CgCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}}
                </Listbox.Option>
              )})}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {error ? (
        <p className="text-red-500 text-xs italic">
          {error.message ||
            (error.type === "required" ? `${label} is required` : null)}
        </p>
      ) : null}

      <div className='flex space-x-2 mt-4'>
        {selected && Array.isArray(selected) ? selected.map((el, i) => <div key={el.key || i} className='bg-black px-4 py-2 rounded-full w-max text-white'>{el.name}</div>) : null}
      </div>
    </div>
  );
});

export default Select;
