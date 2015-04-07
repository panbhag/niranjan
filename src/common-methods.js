var CommonMethods = {};

CommonMethods.getValue = function()
{
 return this.__value;
}

CommonMethods.set = function(value)
{
    //var path = this.path + "." + key;
    this.root.updatePath(this.path,value);
    this.root.triggerUpdateCallabcks();
}

CommonMethods.triggerUpdateCallabcks = function()
{
    if(!this.updateCallabcks){return}

    for(var i=0; i < this.updateCallabcks.length;i++)
    {
        this.updateCallabcks[i]();
    }
}

//input: the path of the array to be updated, value
//output: the __value of the current object is updated
CommonMethods.updateRawValue = function(pathArray,value)
{
    var currentObj = this.__value;
    for(var i =0;i< pathArray.length -1 ; i++)
    {

        var key = pathArray[i];
        if(currentObj.isArray)
        {
            key = parseInt(pathArray[i]);
        }
        currentObj = currentObj[key];
    }
    var lastIndex = pathArray.length - 1;
    var lastKey = pathArray[lastIndex];

    if(currentObj.isArray){
        lastKey = parseInt(lastKey)
    }
    currentObj[lastKey] = value;
    return true;

}

CommonMethods.updatePath = function(path,value)
{
    var paths = path.split(".");

    if(this.isRoot())
    {
        paths.splice(0,1); //remove first element which is root;
        //path = paths.join(".");
    }


    this.updateRawValue(paths,value);
    var currentKey = paths[0];
    var nextKeys = paths.slice(1,paths.length);//from 2nd element to last
    
    
    var currentElement;
    if(this.isArray)
    {
        currentKey = parseInt(currentKey);
    }

    // if(paths.length == 1)// current element is the value it self
    // {
    //     var path = this.path + "." + paths[0];
    //     this[currentKey] = this.constructor.wrapperCreator(value,this.root, path);

    // } 
    // else{   
    currentElement = this[currentKey];
    this[currentKey] =  currentElement.generateNewObject(nextKeys,value);
    //}
}

CommonMethods.isRoot = function()
{
   return this.root == this;
}

CommonMethods.generateDetachCallback = function(callabackId)
{
    
    return function(){
        var index = this.updateCallbackArray.indexOf(callabackId);
        if (index > -1) {
            this.updateCallbackArray.splice(index, 1);
        }
        else
        {
            return false;
        }
        delete this.updateCallabackMap[callabackId]

        return true

    }
}


CommonMethods.onUpdate = function(callaback)
{
    this.updateCallbackId = this.updateCallbackId || 0;

    this.updateCallabackId = this.updateCallabackId + 1;

    this.updateCallbackArray = this.updateCallbackArray || [];
    this.updateCallabackMap = this.updateCallbackmap || {};

    this.updateCallabackArray.push(updateCallabackId);
    this.updateCallabackMap[this.updateCallabackId] = callaback;

    return this.generateDetachCallback(this.updateCallabackId)

}

module.exports = CommonMethods;
