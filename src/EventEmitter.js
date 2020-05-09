export class EventEmitter {
    constructor() {
        this._listeners = new Map();
    }

    addEventListener(type, listener) {
        if (!this._listeners.has(type)) {
            this._listeners.set(type, new Set());
        }
        const listernerSet = this._listeners.get(type);
        listernerSet.add(listener);
    }

    emit(type) {
        const listernerSet = this._listeners.get(type);
        if (!listernerSet) {
            return;
        }
        listernerSet.forEach(listener => {
            listener.call(this);
        });
    }

    removeEventListener(type, listener) {
        const listernerSet = this._listeners.get(type);
        if (!listernerSet) {
            return;
        }
        listernerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listernerSet.delete(listener);
            }
        });
    }

    removeEventListeners(type) {
        const listernerSet = this._listeners.get(type);
        if (!listernerSet) {
            return;
        }
        listernerSet.forEach(ownListener => {
            this.removeEventListener(type, ownListener);
        });
    }
}