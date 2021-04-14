type Children = string | VNode | Array<VNode> | Function;

interface VNode {
    tag: string | VNode;
    props: object;
    children: Children;
    render(): any;
}

export default VNode;