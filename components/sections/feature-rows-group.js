import classNames from "classnames";
import Image from "../elements/image";
import Video from "../elements/video";
import CustomLink from "../elements/custom-link";
import { AiOutlineCheckCircle } from 'react-icons/ai'

const FeatureRowsGroup = ({ data, beforeEach }) => {
  return (
    <div className="container flex flex-col gap-36 py-12">
      {data.features.map((feature, index) => (
        <div key={feature.id}>
          {/* Tile */}
          {beforeEach ? beforeEach(feature, index) : null}
          {/* Content */}
          <div
            className={classNames(
              // Common classes
              "flex flex-col justify-start md:justify-between md:items-center gap-10",
              {
                "lg:flex-row": index % 2 === 0,
                "lg:flex-row-reverse": index % 2 === 1,
              }
            )}
          >
            {/* Text section */}
            <div className="w-full lg:w-6/12 lg:pr-6 text-lg">
              <h5 className='text-lg text-blue-500 uppercase font-bold'>{feature.subTitle}</h5>
              <h4 className="text-3xl font-bold">{feature.title}</h4>
              <p className="my-3">{feature.description}</p>

              {/* Features feautes */}
              {
                feature?.checks?.length ? feature.checks.map(check => (
                  <div className='flex space-x-3 items-center leading-5 h-16'>
                    <div className='h-8 w-8'>
                      <AiOutlineCheckCircle className='text-blue-500 h-8 w-8' />
                    </div>
                    <div className='text-gray-600'>{check}</div>
                  </div>
                )) : null
              }

              {feature.link ? (
                <CustomLink link={feature.link}>
                  <div className="text-blue-600 with-arrow hover:underline">
                    {feature.link.text}
                  </div>
                </CustomLink>
              ) : null}
            </div>

            {/* Separator */}
            {feature.separator ? <Line /> : null}

            {/* Media section */}
            <div className={`w-full sm:9/12 ${feature.separator ? 'lg:w-6/12' : 'lg:w-4/12'} max-h-full`}>
              <Media feature={feature} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Line = () => (
  <div
    className="border-dotted border-l-8 border-gray-200 h-64 hidden lg:block mx-8"
  />
);

const Media = ({ feature }) => {
  if (feature.customMedia) {
    return feature.customMedia
  }

  if (feature.media.mime.startsWith("image")) {
    return (
    <Image media={feature.media} className={`w-full h-auto ${feature.separator ? 'p-6' : ''}`} />
  )}

  if (feature.media.mime.startsWith("video")) {
    return (
    <Video
      media={feature.media}
      className="w-full h-auto"
      autoPlay
      controls={false}
    />
  )}
}

export default FeatureRowsGroup;
