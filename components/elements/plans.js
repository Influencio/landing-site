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
    link: `/register/company?${querystring.stringify({ title: p.name, price: annually ? p.priceAnnually : p.monthly, annually, action: 'select-plan' })}`,
    subtitle: p.description,
    benefits: p.features.map(f => f.name),
    isRecommended: p.isRecommended
  }})

  return (
    <div className='flex my-8 flex-wrap flex-col md:flex-row justify-center'>
      {planArr.map(p => plansToExclude.includes(p.title) ? null : <Plan key={p.title} {...p} annually={annually} />)}
    </div>
  )
}

export default Plans
