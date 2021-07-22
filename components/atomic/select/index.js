import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect, CgCheck } from "react-icons/cg";

const Select = ({ data, onChange, label, id, width }) => {
  const [selected, setSelected] = useState(data.length ? data[0] : null);

  const handleSelect = res => {
    setSelected(res);
    onChange && onChange(res);
  };

  return (
    <div className={`w-${width || '72'}`}>
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
          <Listbox.Button className="border relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected?.name || ""}</span>
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
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map(d => {
                const { name, key } = d;
                return (
                <Listbox.Option
                  key={key}
                  className={({ active }) => `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"} select-none relative py-2 pl-10 pr-4 hover:bg-blue-100 cursor-pointer`}
                  value={d}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
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
                  )}
                </Listbox.Option>
              )})}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
