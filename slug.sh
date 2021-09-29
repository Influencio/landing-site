echo $NODE_ENV

if [ "$NODE_ENV" = "production" ]
then 
  echo "Running production version"
  rm ./pages/test-slug.js
else
  echo "Running development version"
  rm ./pages/[[...slug]].js
  mv ./pages/test-slug.js ./pages/[[...slug]].js
fi