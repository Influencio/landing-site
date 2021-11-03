import Plan from './plan';
import querystring from 'query-string';


const Plans = ({ annually, handleSelect, plansToExclude=[], plans }) => {

  const planArr = plans.map(p => {
    return {
    title: p.name,
    linkTitle: p.subtitle,
    handleSelect: handleSelect && (price => handleSelect(p.name, price, annually)),
    price: {
      monthly: p.price,
      annually: p.priceAnnually,
    },
    link: p.link || `/register/company?${querystring.stringify({ title: p.name, price: annually ? p.priceAnnually : p.price, annually, action: 'select-plan', skipPayment: p.skipPayment })}`,
    subtitle: p.description,
    benefits: p.features.map(f => ({name: f.name, inPlan: f.inPlan})),
    isRecommended: p.isRecommended
  }})

  return (
    <div className='flex my-8 flex-wrap flex-col md:flex-row items-center md:items-stretch justify-center'>
      {planArr.map(p => plansToExclude.includes(p.title) ? null : <Plan key={p.title} {...p} annually={annually} />)}
    </div>
  )
}

export default Plans
