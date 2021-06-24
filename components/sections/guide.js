import Select from '../atomic/select';
import FeatureRowsGroup from './feature-rows-group';

const Guide = ({ data }) => {
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
        <h3>{data.title}</h3>
        <Select data={data.select.data} />

        <FeatureRowsGroup data={data.content[0]} />
      </div>
    </div>
  );
};

export default Guide