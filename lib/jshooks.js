"use strict";

class Hooks{

    constructor(timeout = 3000){
        this.listeners = [];
        this.triggers = [];
        this.promiseTimeOut = timeout;
    }
    
    triggerCallBack(listeners, currentIndex, data, callBack){
        if(listeners.length <=0) return callBack(data);
        listeners[currentIndex].callBack(data, (newData = null) => {
            currentIndex += 1;
            if(typeof listeners[currentIndex] != 'undefined')
                this.triggerCallBack(listeners, currentIndex, newData, callBack);
            else
                callBack(newData);
        });
    }


    _getListener(hook){
        return this.listeners.filter(listener => listener.hook == hook).sort((c, n) => c.pr > n.pr ? -1 : ((n.pr > c.pr) ? 1 : 0));
    }


    trigger(hook, data = null){
        return new Promise((resolve, reject) => {
            let currentTime = 0;
            
            let interval = setInterval(() => {
                if (currentTime >= this.promiseTimeOut) {
                    clearInterval(interval);
                    reject(Error("next method is mendotary and one or more listeners are not triggering it."));
                }else{
                    currentTime += 100;
                }
            }, 100);

            this.triggerCallBack(this._getListener(hook), 0, data, function (updatedData) {
                clearInterval(interval);
                resolve(updatedData);
            });
        });
    }

    listen(hook, pr = 1, callBack){
        if(hook == null || typeof hook != 'string') 
            throw new Error("Invalid Hook name provided");
        
        if(typeof pr == 'function'){
            callBack = pr;
            pr = 1;
        }
        const newHook = {
            pr,
            hook,
            callBack
        };

        this.listeners.push(newHook);
    }
}

window.Hooks = Hooks;