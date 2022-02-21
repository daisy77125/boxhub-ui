import React from "react";

const SearchText = ({ fieldName, displayName, onTextChange }) => {
  return (
    <div className="row mb-3">
      <label className="col-3 col-form-label">{displayName}</label>
      <div className="col-auto">
        <input
          type="text"
          name={fieldName}
          className="form-control"
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};

const SearchSize = ({ onSizeRangeChange }) => {
  const numberInput = (name) => (
    <input
      style={{ width: "90px" }}
      type="number"
      name={name}
      className="form-control"
      onChange={onSizeRangeChange}
    />
  );

  return (
    <div className="row mb-3">
      <label className="col-3 col-form-label">Size (ft)</label>
      <div className="col-auto">{numberInput("minSize")}</div>
      <div className="col-auto">
        <p className="lead">-</p>
      </div>
      <div className="col-auto">{numberInput("maxSize")}</div>
    </div>
  );
};

const SearchSection = ({ onTextChange, onSizeRangeChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <SearchText
            fieldName="status"
            displayName="Status"
            onTextChange={onTextChange}
          />
        </div>
        <div className="col-md-6">
          <SearchText
            fieldName="condition"
            displayName="Condition"
            onTextChange={onTextChange}
          />
        </div>
        <div className="col-md-6">
          <SearchText
            fieldName="type"
            displayName="Type"
            onTextChange={onTextChange}
          />
        </div>
        <div className="col-md-6">
          <SearchSize onSizeRangeChange={onSizeRangeChange} />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
