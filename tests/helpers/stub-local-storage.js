export default function stubLocalStorage() {
  localStorage.getItem = function() {
    return '123abc';
  };
}
