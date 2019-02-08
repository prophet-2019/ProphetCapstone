import React from 'react'
import {connectSearchBox} from 'react-instantsearch-dom'

// instantsearch.widgets.searchBox({
//   container: '#searchbox'
// })

const SearchBox = ({currentRefinement, isSearchStalled, refine}) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
    {isSearchStalled ? 'My search is stalled' : ''}
    {console.log('current refinement: ', currentRefinement)}
  </form>
)

const CustomSearchBox = connectSearchBox(SearchBox)
export default CustomSearchBox
