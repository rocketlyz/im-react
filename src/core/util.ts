import { NODE_TYPE, DOM_NODE_TYPE } from './constant';

type Element = Node | string;

interface VNode {
    tag: string | VNode,
    props: object,
    children: Element,
    render(): Node;
}

const h = function({ tag, props, children, render }: VNode) {
    let node;
    if(tag === NODE_TYPE.TEXT) {
        node = document.createTextNode(children as string);
    } else if(render instanceof Function) {
        node = render();
    } else {
        const node = document.createElement(tag as string);
        if (node.nodeType === DOM_NODE_TYPE.ELEMENT_NODE) {
            return node;
        } else {
            console.error(`${tag}不是一个Element(参考: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)`);
        }
    }

    if(node && children) {
        appendChild(node, children);
    }
}

function appendChild(node: Node, children: Element) {
    node.innerHTML = "";
    let _children = children instanceof Array ? children : [children];
    _children.forEach(child => node.appendChild(child)); // TODO: 批量插入，避免反复reflow
}


const convertTemplateToNode = (template: string) => {
    const container = document.createElement("template");
    container.innerHTML = template;
    return container.content.childNodes[0].cloneNode(true);
}

export {
    h,
    convertTemplateToNode,
}