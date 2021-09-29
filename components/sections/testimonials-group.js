import classNames from "classnames";
import { useState } from "react";
import Image from "../elements/image";
import CustomLink from "../elements/custom-link";

const TestimonialsGroup = ({ data }) => {
  // Only show one testimonial at a time
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);
  const selectedTestimonial = data.testimonials[selectedTestimonialIndex];

  return (
    <section className="text-lg pt-12 pb-16 flex mx-auto max-w-screen-xl justify-around">
      <div>
      <h4 className='text-xl text-blue-500'>{data.subTitle}</h4>
      <h2 className="title">{data.title}</h2>
      <p className="text-gray-700 mb-4">{data.description}</p>
      {/* Change selected testimonial (only if there is more than one) */}
      {data.testimonials.length > 1 && (
        <div className="flex flex-row gap-4 mt-10">
          {data.testimonials.map((testimonial, index) => (
            <button
              onClick={() => setSelectedTestimonialIndex(index)}
              className={classNames(
                // Common classes
                "rounded-full h-3 w-3",
                {
                  "bg-gray-300": index !== selectedTestimonialIndex,
                  "bg-blue-600": index === selectedTestimonialIndex,
                }
              )}
              key={testimonial.id}
            ></button>
          ))}
        </div>
      )}
      {
        data.link ?
        <CustomLink link={data.link}>
          <span className="with-arrow text-blue-700 hover:underline">
            {data.link.text}
          </span>
        </CustomLink> : null
      }
      </div>
      {/* Current testimonial card */}
      <div className="max-w-lg w-8/12 sm:w-8/12 bg-white shadow-md sm:shadow-xl rounded-lg flex flex-col items-center text-left">
        <Image
          media={selectedTestimonial.picture}
          className="h-24 w-24"
        />
        <div className="px-4 py-4 sm:px-12 sm:pt-12 sm:pb-4 flex flex-col justify-between relative">
          <div>
            <Image
              media={selectedTestimonial.logo}
              className="h-8 w-auto mb-6 sm:mb-10 mt-2 sm:mt-0"
            />
            <p className="italic mb-6">"{selectedTestimonial.text}"</p>
            <p className="font-bold text-base sm:text-sm">
              {selectedTestimonial.authorName}
            </p>
            <p className="text-base sm:text-sm">
              {selectedTestimonial.authorTitle}
            </p>

            {
              data?.testimonials?.length ?
              <div className='flex absolute space-x-2 right-5 bottom-3'>
                <div onClick={() => setSelectedTestimonialIndex(Math.abs((selectedTestimonialIndex - 1) % data.testimonials.length))} className='bg-blue-500 text-white rounded-full flex justify-center items-center h-7 w-7 cursor-pointer'>{"<"}</div>
                <div onClick={() => setSelectedTestimonialIndex((selectedTestimonialIndex + 1) % data.testimonials.length)} className='bg-black text-white rounded-full flex justify-center items-center h-7 w-7 cursor-pointer'>{">"}</div>
              </div> : null
            }
          </div>
          {
            selectedTestimonial.link ?
          <CustomLink link={{ url: selectedTestimonial.link, text: '', newTab: false, id: 0 }}>
            <span className="uppercase tracking-wide text-blue-700 hover:underline  with-arrow sm:self-end mt-6 sm:mt-0">
              Read story
            </span>
          </CustomLink> : null
          }
        </div>
      </div>
      {/* Logos list */}
      {/* <div className="flex flex-row flex-wrap items-center gap-6 sm:gap-20 justify-center mt-10 px-6 sm:px-0">
        {data.logos.map((logo) => (
          <Image
            media={logo.logo}
            className="h-8 max-w-xs w-auto object-contain"
            key={logo.id}
          />
        ))}
      </div> */}
    </section>
  );
};

export default TestimonialsGroup;
