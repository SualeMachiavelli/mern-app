import React from "react";

const Pagination = ({
  onNext,
  onPrevious,
  onDisableNext,
  onDisablePrevious,
}) => {
  return (
    <div className="pagination">
      {onDisablePrevious && (
        <button
          onClick={onPrevious}
          disabled={!onDisablePrevious}
          className="btn pagination__btn"
        >
          Previous
        </button>
      )}
      {onDisableNext && (
        <button
          disabled={!onDisableNext}
          onClick={onNext}
          className="btn pagination__btn"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
