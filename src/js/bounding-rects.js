export function boundingRects(arrOfIds) {
  for (var i = 0, elems = {}, elem; i < arrOfIds.length; i++) {
    elem = document.getElementById(arrOfIds[i]);
    elems[arrOfIds[i]] = elem && elem.getBoundingClientRect();
  }
  return elems;
}
