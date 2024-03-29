import PropTypes from "prop-types";
import Markdown from "react-markdown";

const RichText = ({ data }) => {
  return (
    <div className="prose lg:prose-lg xl:prose-xl container py-12">
      <Markdown source={data.content} />
    </div>
  );
};

RichText.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
  }),
};

export default RichText;
