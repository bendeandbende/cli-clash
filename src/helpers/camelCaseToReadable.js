module.exports = (textInCamelCase) =>
  textInCamelCase.slice(0, 1).toUpperCase() +
  [...textInCamelCase.slice(1)]
    .map((a) => (a.toUpperCase() === a ? ' ' + a : a))
    .join('');

// keeping the all words' first letters upper cased because - in my opinion - it fits better here. (Fire Storm instead of Fire storm, War Hammer instead of War hammer etc...)
