var CommonMethods = require('./common-methods');
//var Wrapper.wrapperCreator = require('./index.js');


function Wrapper(data,root,path)
{
    this.__value = data;
    this.root = root || this;
    this.path = path || "root";
    
    //check if array

    
    if(!checkObject(data))//if data is not an object, that means it is a funciton or array.
    // it cannot be array, as WrapperArray would have been used for same
    {
        return;
    }    
    
    
    
    var root_for_children = this.root || this;
    for(var key in data)
    {
        if(data.hasOwnProperty(key)){
             var path = this.path + "." + key;

             this[key] = Wrapper.wrapperCreator(data[key],root_for_children,path);

        }
    
    }

    function checkObject(x){ return !(x instanceof Function) && (x instanceof Object) }

}

//mix CommonMethods
for (var attrname in CommonMethods) { Wrapper.prototype[attrname] = CommonMethods[attrname]; }

        



//creates a new node from the current one which has only the necessary parts in the path updated
Wrapper.prototype.generateNewObject = function(paths,value)
{
    var self = this;
    
    if(paths.length == 0)
    {
        
        return Wrapper.wrapperCreator(value,this.root,this.__path);         
    }
    
    //create a new object with empty data
    var newObject = new Wrapper({},self.root,self.path);

    newObject.__value = self.__value;
    
    for(var key in self)
    {
        
        if(self.hasOwnProperty(key) && key.slice(0,2) !== "__" )
        {
           
            if(key == paths[0])
            {
                
                var nextKeys = paths.slice(1,paths.length);
                newObject[key] = this[key].generateNewObject(nextKeys,value);
                newObject.__value = this.__value;
                newObject.updateRawValue(paths,value);
            
            }
            else{
            
                newObject[key] = this[key];

            }
        }
    
    
    }
    
    return newObject;
}



module.exports = Wrapper





// var x = new Wrapper({a:1,b:2,c:{d:4} });
// console.log(x);
// var oa = x.a;
// x.c.d.set(400);
// alert(oa == x.a);

//limitations
//root will not change/
//root should be a object?
//arrays have yet to be handled
//delete values

