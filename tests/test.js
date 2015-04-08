var chai = require('chai');
var should = chai.should();
var Niranjan = require('../src/index.js');
console.log('***************** loaded Niranjan js');
var assert = require("assert")

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      [1,2,3].indexOf(5).should.equal(-1);
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
});

describe("Niranjan Array",function(){
	describe("create a new object and access value via getValue",function(){

		var rawData = {
			items:[{name:"first"},{name:"second"},{name:"third"},{name:"fourth"},{name:"fifth"}]
		}

		var data = Niranjan(rawData);

		data.items.getIndex(0).getValue().name.should.equal("first");
		data.items.getIndex(1).getValue().name.should.equal("second");
		data.items.getValue().length.should.equal(5);
	});


	describe("create deep array object and access value via getValue",function(){

		var rawData = {entry:{
						list:[
								{a:[101,102,103],b:[201,202]},
								{a:[301,302],b:[401]}

							]
						}
					   };
		// describe("setIndex");
		// describe("getIndex");
		// describe("push");
		// describe("pop");
		// describe("shift");
		// describe("unshift");
		// describe("insertAt");
		// describe("deleteAt")

})
})


describe('Niranjan',function(){


	describe("create new object",function(){


		it("should be able to create new object and access value through getValue",function(){


			var data = Niranjan({a:1,b:2})

			data.a.getValue().should.equal(1);
			data.b.getValue().should.equal(2);


		})

		it("should be able to create new deep object and access value through getValue",function(){
			var data = Niranjan({a:{b:{c:1}}})
			data.a.b.c.getValue().should.equal(1);

			var extracted_b = data.a.b.getValue();
			extracted_b.c.should.equal(1);

			var extracted_a = data.a.getValue();
			extracted_a.b.c.should.equal(1);
		})

	})

	describe("set",function(){

		it("should be able to change the value of a key",function(){

			var data  = Niranjan({a:1,b:2});

			data.b.set(3);

			data.b.getValue().should.equal(3);

			data.getValue().b.should.equal(3);
		})


		it("should not change siblings of the child which is modified",function(){

			var data = Niranjan({a:1,b:2});
			var old_a = data.a;
			var old_b = data.b;
			data.a.set(4);
			old_a.should.not.equal(data.a);
			old_b.should.equal(data.b);
		})

		it("should change all ancestors and their raw values/getValues of the node which has changed",function(){
			var data = Niranjan(

					{a:{c:{g:1,h:2},d:{i:3,j:4}},b:{e:{k:5},f:6}}
				)
			var old_a = data.a;
			var old_b = data.b;
			var old_c = data.a.c;
			var old_d = data.a.d;
			var old_e = data.b.e;
			var old_f = data.b.f;
			var old_g = data.a.c.g;
			var old_h = data.a.c.h;
			var old_i = data.a.d.i;
			var old_j = data.a.d.j;
			var old_k = data.b.e.k;
			var old_root = data.root;

			data.a.c.g.set(10);
			//raw values should change
			data.a.getValue().c.g.should.equal(10);

			data.a.c.getValue().g.should.equal(10);
			data.a.c.g.getValue().should.equal(10);

			//old_root.should.not.equal(data.root);
			old_a.should.not.equal(data.a);
			old_c.should.not.equal(data.a.c);
			old_g.should.not.equal(data.a.c.g);
			//raw values of all the ancestors should be updated



			old_b.should.equal(data.b);
			old_d.should.equal(data.a.d);
			old_e.should.equal(data.b.e);
			old_f.should.equal(data.b.f);
			old_h.should.equal(data.a.c.h);
			old_i.should.equal(data.a.d.i);
			old_j.should.equal(data.a.d.j);
			old_k.should.equal(data.b.e.k);

		})


	})







})