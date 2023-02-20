## Implemented edit family feature

## Fixed the issue that was not printing the large families correnctly. Now the entire family tree is printed regardless of tree height and width

## Improved the search

- searchtext & setSearchText were initialised with useFilteredId() instead of useSearchtextId() in SearchText.jsx
- In SearchBar.jsx , there was a typo in the "comtains" conditional that checked for the string 'undefined' instead of thetype undefined
- In search.js , in the recur function there is an else if statement that checks `if (family.children.length > 0)`. But family.children is an object with no "length" property. Plus, right before that, another confition would check if the children property of family is undefined or not
- Contains was declared in two files. And even though the SearchFamily is imported in SearchBar.jsx , it was not being used. I exported the improved version of contains from search.js and deleted the one in searchBar.jsx
- I modified and isolated the recursive id exclusion function to the search.js and deleted the part of the code that I felt were no longer needed

## Added Custom Label 1 and 2 & improved the Export JSON function by adding indentation to the exported JSON file

## Changed the styles to make the application responsive to mobile devices
