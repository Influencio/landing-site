// import { CheckOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import classNames from 'classnames'


const Plan = ({ title, link, linkTitle, price, subtitle, benefits, annually, handleSelect, isRecommended }) => {
  return (
    <div className={classNames(
      // Common classes
      "mt-6 md:mx-8 px-6 py-8 rounded-lg w-full bg-white flex flex-col max-w-xs items-center text-center divide-y border-gray-200 border",
      // Normal plan
      {
        "text-gray-800": !isRecommended,
      },
      // Recommended plan
      {
        "bg-primary-50 text-primary-900 border-primary-300": isRecommended,
      }
    )}>
      <div className="flex flex-col">
        <h3 className="text-2xl mb-3">{title}</h3>
        {handleSelect ? (
          <div
            className="bg-blue-400 py-4 px-12 rounded-lg text-white text-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() =>
              handleSelect(annually ? price.annually : price.monthly)
            }
          >
            {linkTitle}
          </div>
        ) : (
          <Link
            href={link || ''}
          >
            <span className="bg-blue-400 py-4 px-12 rounded-lg text-white text-lg cursor-pointer hover:opacity-80 transition-opacity duration-200">
              {linkTitle || ''}
            </span>
          </Link>
        )}
        <p className="my-3 text-lg">{annually ? price.annually : price.monthly}</p>
      </div>
      <div className='w-full'>
        <p className="my-4">{subtitle}</p>
        <div className="my-8">
          {benefits.map((b) => (
            <div key={b} className="text-left w-full my-3 flex items-start">
              <IoIosCheckmarkCircle style={{ minWidth: 22.5 }} className="text-blue-400 text-2xl" />{' '}
              <div className="ml-2">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plan