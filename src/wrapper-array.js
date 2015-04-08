var CommonMethods = require('./common-methods');

function WrapperArray(data,root,path)
{
        this.__value = data;
        this.root = root || this;
        this.path = path || "root";
        this.__wrappedArray = [];
        this.isArray = true;
        this.regenerateFromIndex(0);


}

//mix common methods
for (var attrname in CommonMethods) { WrapperArray.prototype[attrname] = CommonMethods[attrname]; }


//regenerates all the objects of the array starting from the given index;
WrapperArray.prototype.regenerateFromIndex = function(index)
{
        for(var i = index; i < this.__value.length; i ++)
        {
            var path = this.path + "." + i ;
            this.__wrappedArray[i] = WrapperArray.wrapperCreator(this.__value[i],this.root,path);
        
        }

        //remove extra elements
        var i = this.__value.length; // one element ahead of length
        while(this.__wrappedArray[i])
        {
            this.__wrappedArray.splice(i,1);
        }

}





//other: count, 
//map will work for wrapped array, no join
//var arrayMehtodsRead = ["map","each"];


// for(var i=0;i<arrayMehtodsRead.length;i++)
// {
//     var method = arrayMehtodsRead[i];
//     WrapperArray.prototype[method] = function(){
//         return this.__value.apply(this,arguments);
//     }

// }


//var arrayMethodsWrite = ["push","pop","shift","unshift","concat"];
//delete,insert


WrapperArray.prototype.push = function(element){

    this.__value.push(element);
    var path = this.path + "." + (this.value.length -1)
    var wrappedElement = WrapperArray.wrapperCreator(element,this.root,path);
    this.__wrappedArray.push(wrappedElement);
    this.root.updatePath(this.path,this.__value);


    //this.regenerateFromIndex(this.value.length-1);
    return this.__value.length;

};

WrapperArray.prototype.unshift = function(element){

  this.__value.unshift(element);
  var path = this.path + "." + (this.value.length -1)
  var wrappedElement = WrapperArray.wrapperCreator(element,this.root,path);
  this.__wrappedArray.unshift(wrappedElement);
  this.root.updatePath(this.path,this.__value);
  //this.regenerateFromIndex(0);
  return this.__value.length;

}

WrapperArray.prototype.getIndex = function(index)
{
    return this.__wrappedArray[index];
}

WrapperArray.prototype.setIndex = function(index,element)
{
    this.__value[index] = element;
    var path = this.path + "." + index;
    this.__wrappedArray[index] =WrapperArray.wrapperCreator(element,this.root,path);
    this.root.updatePath(this.path,this.__value);
    return this.__wrappedArray[index]

}

WrapperArray.prototype.shift = function(){
    this.__value.shift();
    var wrappedElement = this.__wrappedArray.shift();
    this.root.updatePath(this.path,this.__value);
    //this.regenerateFromIndex(0);
    //this.root.updatePath(this.path,value);

    return wrappedElement;  
}

WrapperArray.prototype.pop = function(){
    this.__value.pop();
    var wrappedElement = this.__wrappedArray.pop();
    this.root.updatePath(this.path,this.__value);
    //this.regenerateFromIndex(0);
    return wrappedElement;
}

//http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
WrapperArray.prototype.move = function(old_index, new_index){

    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    this.root.updatePath(this.path,this.__value);

    return this; // for testing purposes
};





WrapperArray.prototype.insertAt  =function(element,index)
{
    this.__value.splice(index, 0, element);
    var path = this.path + "." + index;
    var wrappedElement = WrapperArray.wrapperCreator(element,this.root,path);
    this.__wrappedArray.splice(index,0,wrappedElement);
    this.root.updatePath(this.path,this.__value);

    return this.__value.length;
}

WrapperArray.prototype.deleteAt = function(index)
{
    this.__value.splice(index,1);
    this.__wrappedArray.splice(index,1);
    this.root.updatePath(this.path,this.__value);

    return this.__value.length;
}




WrapperArray.prototype.count = function(fromIndex,toIndex)
{
    return this.__value.length;
}

WrapperArray.prototype.map = function(mapper)
{
    var result = [];
    for(vari=0;i<this.__wrappedArray.length;i++)
    {
        result[i] = mapper(this.__wrappedArray[i]);
    }
    return result;    
    
}

WrapperArray.prototype.each = function(iterator)
{
    for(vari=0;i<this.__wrappedArray.length;i++)
    {
        iterator(this.__wrappedArray[i])
    }    

}

WrapperArray.prototype.generateNewObject = function(paths,value)
{
    var self = this;
    
    if(paths.length == 0)
    {
        
        return WrapperArray.wrapperCreator(value,this.root,this.__path);         
    }
    
    //create a new object with empty data
    var newObject = new WrapperArray([],self.root,self.path);

    newObject.__value = self.__value;

    for(var i = 0; i < self.__value;i++)
    {

            if(i == paths[0])
            {
                
                var nextKeys = paths.slice(1,paths.length);
                newObject[i] = this[i].generateNewObject(nextKeys,value);
                newObject.__value[i] = value;
            
            }
            else
            {
            
                newObject[i] = this[i];

            }


    }
    
    return newObject;
}

module.exports = WrapperArray;