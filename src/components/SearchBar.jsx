// import { useState } from "react";
// import { AutoComplete } from "primereact/autocomplete";

// const SearchBar = ({ search, setSearch, suggestions, completeMethod }) => {
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);

const SearchBar = ({ search, setSearch, completeMethod }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    completeMethod(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // const itemTemplate = (item) => {
  //   return (
  //     <div className="p-clearfix">
  //       <div>{item.name}</div>
  //     </div>
  //   );
  // };

  // const panelFooterTemplate = (options) => {
  //   const { suggestions, completeMethod } = options;
  //   return (
  //     <div className="ui-autocomplete-panel-footer">
  //       <button className="p-button p-component p-button-secondary">
  //         Clear
  //       </button>
  //     </div>
  //   );
  // };

  return (
    <div className="search-bar">
      {/* <AutoComplete
        className="search-bar-input"
        value={search}
        // suggestions={filteredSuggestions}
        completeMethod={completeMethod}
        // panelFooterTemplate={panelFooterTemplate}
        itemTemplate={itemTemplate}
        field="name"
        onChange={handleSearchChange}
        placeholder="Recherche ici"
        onDropdownClick={(e) => completeMethod(e)}
      /> */}

      <form onSubmit={handleSubmit}>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Recherche ici"
          value={search}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
