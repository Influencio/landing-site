import { useEffect, useState } from 'react';
import Select from '../atomic/select';
import FeatureRowsGroup from './feature-rows-group';

const Guide = ({ data }) => {

  const [selected, setSelected] = useState(0);
  const [selectData, setSelectData] = useState(data.select.data.map((d, i) => ({ ...d, index: i })));

  useEffect(() => {
    setSelectData(data.select.data.map((d, i) => ({ ...d, index: i })))
  }, [data.select.data.length])

  const handleSelect = res => {
    setSelected(res.index);
  }

  return (
    <div
      className='font-sans bg-gray-200 w-full mb-20'
      style={{ marginTop: 100 }}
    >
      <div
        className="container border-solid border-2 border-gray-300 rounded-xl md:p-24 px-8 py-20 flex flex-col items-center bg-white"
        style={{
          marginTop: -100,
          marginBottom: 50
        }}
      >
        <h3 className='text-3xl font-bold my-2'>{data.title}</h3>
        <Select data={selectData} onChange={handleSelect} />

        <FeatureRowsGroup data={data.content[selected]} beforeEach={StepCount} />
      </div>
    </div>
  );
};

const StepCount = (_, index) => (
  <div className="text-lg text-center">
    <h5>STEP</h5>
    <h2 className="text-4xl font-bold">{'0' + (index + 1)}</h2>
  </div>
);

export default Guide