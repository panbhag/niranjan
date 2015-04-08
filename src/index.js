var Wrapper = require('./wrapper.js');
var WrapperArray = require('./wrapper-array.js');


function Niranjan(data,root,path)
{

    if(data instanceof Array)
    {
        
        return new WrapperArray(data,root,path);

    }
    else
    {
        return new Wrapper(data,root,path);
    }

}

WrapperArray.wrapperCreator = Niranjan;
Wrapper.wrapperCreator = Niranjan;



module.exports = Niranjan;


//when i update the value of a node, all the values in the parent nodes should be changed
//testcases
//path can be array
//add array methods: move,concat

//array methods:the previous elements should not change on insertion and deletion
//update events


    //element added to end
        //add value
            //modify array object and add element at last, orther elements remain sme
        //add value at begining
            //modify array object,add array element at start
            //other elements should remain same but their path should change? if we keep them same will they be rerendered?
                    //need to check how react handles arrays during update
    //main question is when array element position changes does it receive the same props or different                
            //it receives different

//test
//modification of array:write, should modify the parents. 
    //shifting or popping the element doesnt change the ancestors and doesnt modify the value of ancestors
            