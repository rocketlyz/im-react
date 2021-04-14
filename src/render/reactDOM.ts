const render = function(node: Element, el: Element) {
    el.innerHTML = "";
    el.appendChild(node);
}

export {
    render
}