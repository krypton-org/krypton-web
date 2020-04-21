export interface Node<T> {
    element: T;
    prev: Node<T> | null;
    next: Node<T> | null;
}

export default class LinkedList<T> {
    public first: Node<T> | null;
    public last: Node<T> | null;

    constructor(element?: T) {
        this.first = null;
        this.last = null;
        if (element) {
            this.add(element);
        }
    }

    add = (element: T) => {
        const result = {};
        const linkedListElement: Node<T> = {
            element: element,
            prev: null,
            next: null
        }
        if (this.first === null || this.last === null) {
            this.first = linkedListElement;
            this.last = linkedListElement;
        } else {
            this.connect(this.last, linkedListElement)
            this.last = linkedListElement
        }
    }

    connect = (prevEl: Node<T>, nextEl: Node<T>) => {
        prevEl.next = nextEl;
        nextEl.prev = prevEl;
    }

    remove = (linkedListElement: Node<T>) => {
        if (linkedListElement.prev && linkedListElement.next) {
            this.connect(linkedListElement.prev, linkedListElement.next);
        } else if (linkedListElement.prev) {
            linkedListElement.prev.next = null;
            this.last = linkedListElement.prev;
            this.first = this.first;
        } else if (linkedListElement.next) {
            linkedListElement.next.prev = null
            this.last = this.last;
            this.first = linkedListElement.next;
        } else {
            this.last = null;
            this.first = null;
        }
    }
}