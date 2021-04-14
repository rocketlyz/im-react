import { NODE_TYPE, DOM_NODE_TYPE } from './constant';

type Element = HTMLElement | string;

export interface VNode {
    tag: string | VNode,
    props: object,
    children: Element,
    render(): HTMLElement;
}

const createElement = function(tag: string | VNode, props: object, ...children: Array<Element>) {
    let node;
    if(tag instanceof Function) {
        node = (tag as Function)();
    } else {
        node = document.createElement(tag as string);
    }

    if(!node) return null;

    if(props && node.nodeType !== DOM_NODE_TYPE.TEXT_NODE) {
        setProps(node as HTMLElement, props);
    }

    if(children && children.length) {
        appendChild(node as HTMLElement, children);
    }

    return node;
}

function appendChild(node: HTMLElement, children: Array<Element>) {
    node.innerHTML = "";
    children?.forEach(child => {
        if(typeof child === 'string' || typeof child === 'number') {
            node.appendChild(document.createTextNode(`${child}`));
        } else {
            node.appendChild(child)
        }
    }); // TODO: 批量插入，避免反复reflow
}

function setProps(node: HTMLElement, props: object) {
    if(!props || !(props instanceof Object)) return;
    Object.entries(props).forEach(([key, value]) => setProp(node, key, value));
}

function setProp(node: HTMLElement, key: string, value: any) {
    if(value === undefined) value = true;

    if(key === 'className') {
        return node.setAttribute('class', value);
    }

    // TODO, onBlur等事件
    if(key === 'onClick' && value instanceof Function) {
        return node.addEventListener('click', value);
    }
}

export {
    createElement
}