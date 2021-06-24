import classNames from "classnames";
import Image from "../elements/image";
import Video from "../elements/video";
import CustomLink from "../elements/custom-link";

const FeatureRowsGroup = ({ data, beforeEach }) => {
  return (
    <div className="container flex flex-col gap-12 py-12">
      {data.features.map((feature, index) => (
        <>
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
            key={feature.id}
          >
            {/* Text section */}
            <div className="w-full lg:w-6/12 lg:pr-6 text-lg">
              <h4 className="text-2xl font-bold">{feature.title}</h4>
              <p className="my-3">{feature.description}</p>
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
              {/* Images */}
              {feature.media.mime.startsWith("image") && (
                <Image media={feature.media} className={`w-full h-auto ${feature.separator ? 'p-6' : ''}`} />
              )}
              {/* Videos */}
              {feature.media.mime.startsWith("video") && (
                <Video
                  media={feature.media}
                  className="w-full h-auto"
                  autoPlay
                  controls={false}
                />
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

const Line = () => (
  <div
    className="border-dotted border-l-8 border-gray-200 h-64 hidden lg:block mx-8"
  />
);

export default FeatureRowsGroup;
