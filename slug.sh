if [ "$NODE_ENV" == "production" ]
then 
  rm ./pages/test-slug.js
else
  rm ./pages/[[...slug]].js
  mv ./pages/test-slug.js ./pages/[[...slug]].js
fi