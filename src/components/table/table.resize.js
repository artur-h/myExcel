import {$} from '@core/dom';

// missing forEach on NodeList for IE11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    });

    document.onmousemove = e => {
      e.preventDefault();

      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
        document.body.style.cursor = 'ew-resize';
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
        document.body.style.cursor = 'ns-resize';
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.body.style.cursor = 'auto';

      if (type === 'col') {
        $parent.css({width: value + 'px'});
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    };
  });
}
