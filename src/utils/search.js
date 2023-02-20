export const contains = (text, searchTerm) => {
  if (searchTerm === undefined) return true;
  return (
    text.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
    searchTerm === ''
  );
};

export const excludeId = (family, filtered, searchText) => {
  if (family === undefined) return;

  const id = family.id;

  var containChild = true;

  if (contains(family.Name, searchText)) {
    containChild = false;
  }

  if (family?.children) {
    for (const [key, val] of Object.entries(family.children)) {
      containChild && excludeId(val, filtered, searchText);
    }
  }
  if (containChild) {
    filtered.add(id);
  }

  return;
};
