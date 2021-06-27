import PricingContent from '../elements/pricing-content';

const Pricing = ({ data }) => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl text-center">{data.title}</h1>
      <PricingContent plans={data.plans} />
    </div>
  );
};

export default Pricing;
