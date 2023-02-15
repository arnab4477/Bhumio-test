import './App.css';
import { FamilyDetailsContainer, SidePanel } from './components';
import { SelectionContext, TreeStateContext,FilteredIDs } from './contexts';
import { SearchText } from './contexts/SearchText';




function App() {

  return (
    <div id='App' >
      <TreeStateContext>
        <SelectionContext>
          <FilteredIDs>
            <SearchText>
              <SidePanel/>
              <FamilyDetailsContainer/>
            </SearchText>
          </FilteredIDs>
        </SelectionContext>
      </TreeStateContext>
    </div>
  );
}

export default App;